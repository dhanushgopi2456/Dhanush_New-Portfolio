// Glass Glare v3 (Ambient Glare) — shape-aware glass scan. The light front is
// born on the leading edge (pill cap / rounded corner), relaxes to a straight
// line mid-run (edge-wear depth, residual curve) and lands on the trailing edge.
// Edge ribbons + crest on the rim, refraction near the rim, glass depth
// (fresnel + thickness shading), chromatic dispersion on the front, constant
// ambient wash. Cool/Crest/Front colors, pause between sweeps, both directions,
// freeze at any progress. Analytic SDF (no texture taps) -> crisp at any DPR.
// Author: haim repael azoulay
// Copyright (c) 2026 haim repael azoulay. All rights reserved.

"use client"

import { useEffect, useRef } from "react"

type RGBA = { r: number; g: number; b: number; a: number }

export type AmbientGlareShaderProps = {
  className?: string
  playback?: boolean
  progress?: number
  duration?: number
  loop?: boolean
  /** Seconds of rest between sweeps when looping. */
  pause?: number
  /** Sweep direction: "rtl" = born on the right edge, lands on the left (default). */
  direction?: "rtl" | "ltr"
  /** @deprecated use direction="ltr" */
  reverse?: boolean
  /** Width of the moving glow band, in CSS px. */
  glowWidth?: number
  intensity?: number
  softness?: number
  /**
   * Corner radius of the host shape, in CSS px. Use the same value as the
   * container's border-radius. `Infinity` (or anything ≥ half the height)
   * gives a pill. This is what makes the glare start concave and wrap the ends.
   */
  radius?: number
  /** 0–1. Bends the glow field around the rim like light through curved glass. */
  refraction?: number
  /** 0–1. Chromatic split (R/B) of the glare front near the rim. */
  dispersion?: number
  /** 0–1. Glass depth: fresnel rim light + thickness shading. */
  depth?: number
  /**
   * 0–1. Residual curvature the front keeps in the middle of the run.
   * 0 = exact edge-offset behaviour (straight in the middle), 1 = stays as
   * curved as the corners all the way across.
   */
  bow?: number
  /** 1-3, multiples of the corner radius. How deep into the shape the corners keep bending the front (edge-wear depth). */
  edgeWear?: number
  /** Edge ribbon width in CSS px. */
  ribbonWidth?: number
  /** 0-2. Edge ribbon strength. */
  ribbonStrength?: number
  /** 0-0.3. Constant faint wash on the whole surface. */
  ambient?: number
  /** Cool color (the body of the sweep). Alias: blue. */
  coolColor?: RGBA
  /** Crest color (top rim ribbon + front mid-run). Alias: pink. */
  crestColor?: RGBA
  /** Front color (the landing flare). Alias: orange. */
  frontColor?: RGBA
  /** Freeze the sweep at 0–1 (same as playback={false} progress={x}). */
  freezeAt?: number
  /** @deprecated use coolColor */
  blue?: RGBA
  /** @deprecated use crestColor */
  pink?: RGBA
  /** @deprecated use frontColor */
  orange?: RGBA
  background?: RGBA
}

const VERT = `
attribute vec2 a_pos;
attribute vec2 a_uv;
varying vec2 v_uv;
void main() {
  v_uv = a_uv;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
uniform vec4 u_motion;     // progress, glowWidth(px), intensity, softness
uniform vec4 u_glass;      // radius(px), refraction, dispersion, depth
uniform vec2 u_res;        // canvas size in CSS px
uniform float u_bow;       // residual curvature kept mid-run (0 = exact edge offset)
uniform vec4 u_edge;       // edgeWear, ribbonWidth(px), ribbonStrength, ambient
uniform vec4 u_blue;
uniform vec4 u_pink;
uniform vec4 u_orange;
uniform vec4 u_background;
varying vec2 v_uv;

float gaussian(float x, float width) {
  return exp(-0.5 * x * x / max(width * width, 0.001));
}

// Signed distance to a rounded rectangle centred at the origin.
// b = half size, r = corner radius. Negative inside.
float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + vec2(r);
  return length(max(q, vec2(0.0))) + min(max(q.x, q.y), 0.0) - r;
}

// Depth of p measured from the nearer vertical side, following that side's
// silhouette inside the bend zone Rb, then straight. Returned as the distance
// from the RIGHT edge (0..W) so one coordinate covers the whole sweep.
float depthCoord(vec2 p, vec2 hs, float r, float Rb, float bow) {
  float cy = hs.y - r;
  float ty = max(abs(p.y) - cy, 0.0);
  float edgeX = hs.x - r + sqrt(max(r * r - ty * ty, 0.0));   // side boundary x at this height
  float s = clamp((edgeX - (hs.x - Rb)) / Rb, 0.03, 1.0);     // how much of the bend this row keeps
  float ax = abs(p.x);
  float inner = hs.x - Rb - ax;                                // > 0 once past the bend zone
  float dNear = inner < 0.0 ? (edgeX - ax) / s : Rb + inner;
  // residual curve mid-run: the rows near the top/bottom lag behind the centre
  float b = bow * r * (1.0 - s) * smoothstep(0.0, Rb, inner);
  return p.x >= 0.0 ? dNear - b : hs.x * 2.0 - (dNear + b);
}

void main() {
  vec2 halfSize = u_res * 0.5;
  // v_uv.y runs bottom→top, so p.y > 0 is the upper half.
  vec2 p = (v_uv - vec2(0.5)) * u_res;

  float radius = clamp(u_glass.x, 0.0, min(halfSize.x, halfSize.y));
  float refraction = u_glass.y;
  float dispersion = u_glass.z;
  float depth = u_glass.w;

  // --- shape: distance field, inside mask, outward normal
  float d = sdRoundBox(p, halfSize, radius);
  float inside = 1.0 - smoothstep(-0.75, 0.75, d);
  float edgeDist = max(-d, 0.0);                       // px from the rim, inward
  vec2 e = vec2(0.75, 0.0);
  vec2 n = vec2(
    sdRoundBox(p + e.xy, halfSize, radius) - sdRoundBox(p - e.xy, halfSize, radius),
    sdRoundBox(p + e.yx, halfSize, radius) - sdRoundBox(p - e.yx, halfSize, radius)
  );
  n = normalize(n + vec2(0.00001));

  // --- sweep: constant velocity, ignition in, fade out
  float prog = u_motion.x;
  float ignition = min(prog / 0.06, 1.0) * (1.0 - smoothstep(0.86, 1.0, prog));
  float glowWidth = max(u_motion.y, 8.0);
  float soft = u_motion.w;
  // --- the front "wears" the shape. Every pixel gets a depth coordinate F:
  //     0 on the leading (right) edge, W on the trailing (left) edge. Inside
  //     the bend zone (Rb px from each side) the iso-lines of F are the edge
  //     curve itself scaled toward the shape's body and anchored on the rim,
  //     so the front hugs the rim all the way to the top and bottom - no step,
  //     no dark gap - then straightens out as it moves in. Near the rim the
  //     iso-lines bunch up, which thins the band exactly where real glass does.
  // travel finishes at 88 % so the front is already sitting on the left wall while it fades
  float travel = clamp(prog / 0.88, 0.0, 1.0);
  float W = halfSize.x * 2.0;
  float frontDepth = travel * W;
  float rr = max(radius, 0.001);
  float Rb = clamp(rr * max(u_edge.x, 1.0), 1.0, halfSize.x);   // bend depth (edge-wear)
  float F = depthCoord(p, halfSize, radius, Rb, u_bow);

  // --- refraction: bend the glow coordinate around the rim along the normal
  float rim = exp(-edgeDist / (5.0 + soft * 5.0));    // 1 at the rim → 0 inside
  // lens displacement in px, capped so small shapes (circles, chips) don't fold over
  float lens = refraction * rim * min(10.0 + radius * 0.35, 0.18 * min(halfSize.x, halfSize.y));
  // the front keeps its shape; refraction only nudges it (0.35), the wash bends fully
  float Fr = depthCoord(p - n * lens * 0.35, halfSize, radius, Rb, u_bow);
  float gx = frontDepth - Fr;                         // > 0 behind the front (already lit)

  // asymmetric band: a defined leading side, a softer wake behind
  float band = gaussian(gx, gx < 0.0 ? glowWidth * 0.45 : glowWidth);
  float wake = smoothstep(-glowWidth, glowWidth, frontDepth - depthCoord(p - n * lens, halfSize, radius, Rb, u_bow));
  float wash = (band * 0.5 + wake * 0.60) * ignition;

  // --- ribbons that follow the silhouette (this is the concave start)
  float rw = max(u_edge.y, 0.5);
  float ribbon = gaussian(edgeDist - rw * 0.5, rw * 0.55 + soft * 2.2) * band * ignition * u_edge.z;
  float topness = smoothstep(-0.15, 0.85, n.y);        // only the upper rim
  float crest = gaussian(edgeDist - rw * 0.65, rw * 1.1 + soft * 2.0) * band * topness * u_edge.z;

  float warm = gaussian(prog - 0.89, 0.10);
  vec3 cool = u_blue.rgb * u_blue.a;
  vec3 rose = u_pink.rgb * u_pink.a;
  vec3 amber = u_orange.rgb * u_orange.a;

  vec3 glow = cool * (u_edge.w + wash * 0.63);
  glow += cool * gaussian(p.y, halfSize.y * 0.6) * wake * ignition * 0.15;
  glow += cool * ribbon * 1.15;
  glow += rose * crest * ignition * 1.10;

  // --- the front: thin bright head, warming to amber at the end
  float frontW = 7.0 + soft * 5.0;
  float front = gaussian(gx, frontW) * ignition;
  glow += mix(rose, amber, warm) * front * (0.25 + 0.75 * warm);

  // --- dispersion: R and B pulled apart along the normal, strongest at the rim
  float split = dispersion * (3.0 + 5.0 * rim);
  float frontR = gaussian(gx - split, frontW * 0.8) * ignition;
  float frontB = gaussian(gx + split, frontW * 0.8) * ignition;
  glow.r += frontR * dispersion * 0.45;
  glow.b += frontB * dispersion * 0.55;
  glow.g += gaussian(gx, frontW * 0.5) * ignition * dispersion * 0.12;

  // --- depth: fresnel rim light that brightens where the band passes,
  //     plus a soft thickness gradient (light enters from the top)
  float fresnel = pow(rim, 1.6) * depth;
  glow += cool * fresnel * (0.10 + band * 0.9) * ignition;
  float thickness = 0.5 + 0.5 * clamp(p.y / max(halfSize.y, 1.0), -1.0, 1.0);
  glow *= 0.82 + 0.18 * mix(1.0, thickness, depth);

  glow = clamp(glow * u_motion.z, vec3(0.0), vec3(1.0)) * inside;

  float glowAlpha = max(glow.r, max(glow.g, glow.b));
  float bgAlpha = clamp(u_background.a, 0.0, 1.0) * inside;
  float alpha = glowAlpha + bgAlpha * (1.0 - glowAlpha);
  vec3 composite = glow + u_background.rgb * bgAlpha * (1.0 - glowAlpha);
  gl_FragColor = vec4(composite / max(alpha, 0.00001), alpha);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error("Unable to create shader")
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(info || "Shader compile failed")
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext) {
  const program = gl.createProgram()
  if (!program) throw new Error("Unable to create program")
  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(info || "Program link failed")
  }
  return program
}

const DEFAULTS = {
  playback: true,
  progress: 0,
  duration: 2,
  loop: true,
  pause: 1.2,
  direction: "rtl" as "rtl" | "ltr",
  reverse: false,
  glowWidth: 48,
  intensity: 1.15,
  softness: 0.7,
  radius: Infinity,
  refraction: 0.6,
  dispersion: 0.5,
  depth: 0.7,
  bow: 0,
  edgeWear: 1.6,
  ribbonWidth: 3,
  ribbonStrength: 1,
  ambient: 0.045,
  blue: { r: 0.15, g: 0.25, b: 1, a: 1 },
  pink: { r: 1, g: 0.2, b: 0.76, a: 1 },
  orange: { r: 1, g: 0.32, b: 0.02, a: 1 },
  background: { r: 0, g: 0, b: 0, a: 0 },
} satisfies Required<Omit<AmbientGlareShaderProps, "className" | "coolColor" | "crestColor" | "frontColor" | "freezeAt">>

export default function AmbientGlareShader({
  className,
  coolColor,
  crestColor,
  frontColor,
  freezeAt,
  playback: playbackProp = DEFAULTS.playback,
  progress: progressProp = DEFAULTS.progress,
  duration = DEFAULTS.duration,
  loop = DEFAULTS.loop,
  pause = DEFAULTS.pause,
  direction = DEFAULTS.direction,
  reverse = DEFAULTS.reverse,
  glowWidth = DEFAULTS.glowWidth,
  intensity = DEFAULTS.intensity,
  softness = DEFAULTS.softness,
  radius = DEFAULTS.radius,
  refraction = DEFAULTS.refraction,
  dispersion = DEFAULTS.dispersion,
  depth = DEFAULTS.depth,
  bow = DEFAULTS.bow,
  edgeWear = DEFAULTS.edgeWear,
  ribbonWidth = DEFAULTS.ribbonWidth,
  ribbonStrength = DEFAULTS.ribbonStrength,
  ambient = DEFAULTS.ambient,
  blue: blueProp = DEFAULTS.blue,
  pink: pinkProp = DEFAULTS.pink,
  orange: orangeProp = DEFAULTS.orange,
  background = DEFAULTS.background,
}: AmbientGlareShaderProps) {
  const blue = coolColor ?? blueProp
  const pink = crestColor ?? pinkProp
  const orange = frontColor ?? orangeProp
  const frozen = typeof freezeAt === "number" && freezeAt >= 0
  const playback = frozen ? false : playbackProp
  const progress = frozen ? Math.min(1, freezeAt as number) : progressProp
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const propsRef = useRef({
    playback, progress, duration, loop, pause, direction, reverse, glowWidth, intensity, softness,
    radius, refraction, dispersion, depth, bow, edgeWear, ribbonWidth, ribbonStrength, ambient, blue, pink, orange, background,
  })
  propsRef.current = {
    playback, progress, duration, loop, pause, direction, reverse, glowWidth, intensity, softness,
    radius, refraction, dispersion, depth, bow, edgeWear, ribbonWidth, ribbonStrength, ambient, blue, pink, orange, background,
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: true,
    })
    if (!gl) return

    const program = createProgram(gl)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, -1, 1, 0, 1, 1, -1, 1, 0, 1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const aPos = gl.getAttribLocation(program, "a_pos")
    const aUv = gl.getAttribLocation(program, "a_uv")
    const uMotion = gl.getUniformLocation(program, "u_motion")
    const uGlass = gl.getUniformLocation(program, "u_glass")
    const uRes = gl.getUniformLocation(program, "u_res")
    const uBow = gl.getUniformLocation(program, "u_bow")
    const uEdge = gl.getUniformLocation(program, "u_edge")
    const uBlue = gl.getUniformLocation(program, "u_blue")
    const uPink = gl.getUniformLocation(program, "u_pink")
    const uOrange = gl.getUniformLocation(program, "u_orange")
    const uBackground = gl.getUniformLocation(program, "u_background")

    gl.useProgram(program)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0)
    gl.enableVertexAttribArray(aUv)
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8)
    gl.disable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let raf = 0
    const started = performance.now()
    let cssW = 1
    let cssH = 1

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3)
      cssW = Math.max(1, canvas.clientWidth)
      cssH = Math.max(1, canvas.clientHeight)
      const width = Math.round(cssW * dpr)
      const height = Math.round(cssH * dpr)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const currentProgress = (now: number) => {
      const p = propsRef.current
      let value = Math.max(0, Math.min(1, p.progress))
      if (p.playback) {
        const elapsed = Math.max(0, (now - started) * 0.001)
        const cycleDuration = Math.max(0.2, p.duration)
        const cycle = cycleDuration + Math.max(0, p.pause)
        const t = p.loop ? elapsed % cycle : Math.min(elapsed, cycleDuration)
        value = Math.min(t / cycleDuration, 1)
      }
      // Ease-in-out: a soft start, fast through the middle, a gentle landing.
      if (p.playback) value = value * value * (3 - 2 * value)
      return value
    }

    const frame = (now: number) => {
      resize()
      const p = propsRef.current
      const prog = currentProgress(now)
      const radiusPx = Number.isFinite(p.radius) ? Math.max(0, p.radius) : Math.min(cssW, cssH) * 0.5
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform4f(uMotion, prog, p.glowWidth, p.intensity, p.softness)
      gl.uniform4f(uGlass, radiusPx, p.refraction, p.dispersion, p.depth)
      gl.uniform2f(uRes, cssW, cssH)
      gl.uniform1f(uBow, Math.max(0, Math.min(1, p.bow)))
      gl.uniform4f(uEdge, p.edgeWear, p.ribbonWidth, p.ribbonStrength, p.ambient)
      const ltr = p.direction === "ltr" || p.reverse
      if (canvas.style.transform !== (ltr ? "scaleX(-1)" : "")) canvas.style.transform = ltr ? "scaleX(-1)" : ""
      gl.uniform4f(uBlue, p.blue.r, p.blue.g, p.blue.b, p.blue.a)
      gl.uniform4f(uPink, p.pink.r, p.pink.g, p.pink.b, p.pink.a)
      gl.uniform4f(uOrange, p.orange.r, p.orange.g, p.orange.b, p.orange.a)
      gl.uniform4f(uBackground, p.background.r, p.background.g, p.background.b, p.background.a)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      raf = requestAnimationFrame(frame)
    }

    const observer = new ResizeObserver(() => resize())
    observer.observe(canvas)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={["block h-full w-full", className].filter(Boolean).join(" ")}
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden
    />
  )
}

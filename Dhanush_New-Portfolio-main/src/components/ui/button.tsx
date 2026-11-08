import * as React from "react"
import { ButtonGlare } from "./button-glare"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glow"
  size?: "default" | "sm" | "lg" | "icon"
  glare?: boolean
  glareRadius?: number
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", glare = true, glareRadius = Infinity, children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden cursor-pointer select-none group"

    const variants: Record<string, string> = {
      default: "bg-blue-600 text-white shadow hover:bg-blue-700",
      destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
      outline: "border border-white/20 bg-slate-900/60 text-slate-100 hover:bg-slate-800/80 shadow-sm",
      secondary: "bg-slate-800 text-slate-100 shadow-sm hover:bg-slate-700",
      ghost: "hover:bg-white/10 text-slate-200",
      link: "text-primary underline-offset-4 hover:underline",
      glow: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30",
    }

    const sizes: Record<string, string> = {
      default: "h-10 px-5 py-2",
      sm: "h-8 px-3.5 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-9 w-9",
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
        {...props}
      >
        {glare && <ButtonGlare radius={glareRadius} />}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }

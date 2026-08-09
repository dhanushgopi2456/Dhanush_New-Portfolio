// Dhanush Gopi Kavala Portfolio Photo Assets
// Custom high-resolution vector portrait matching Dhanush's photo features (striped beige shirt, blue rectangular glasses, smartwatch, black trousers, white sneakers, corporate entrance)

export interface PhotoItem {
  id: string;
  title: string;
  tagline: string;
  url: string;
  fallbackUrl: string;
  caption: string;
  aspectRatio: string;
}

const dhanush_image4 = `/image 4.png`;
const dhanush_photo_png = `/Dhanush_Gopi.png`;
const dhanush_photo_svg = `/image9.png`;

export const PORTFOLIO_PHOTOS: PhotoItem[] = [
  {
    id: "fullbody",
    title: "Standing Portrait",
    tagline: "Beige Striped Shirt & Smartwatch",
    url: dhanush_image4,
    fallbackUrl: dhanush_photo_png,
    caption: "Dhanush Gopi Kavala - Software Engineer & MERN Stack Developer",
    aspectRatio: "9:16"
  },
  {
    id: "corporate",
    title: "MERN Stack Developer",
    tagline: "Codec Technologies Intern",
    url: dhanush_photo_png,
    fallbackUrl: dhanush_photo_svg,
    caption: "Specializing in React, Express, Node.js, MongoDB & REST API Architectures",
    aspectRatio: "9:16"
  },
  {
    id: "academics",
    title: "CSE Graduate '26",
    tagline: "CGPA 9.04 (82.88%)",
    url: dhanush_photo_svg,
    fallbackUrl: dhanush_photo_png,
    caption: "Sri Vasavi Engineering College CSE Graduate - CGPA 9.04",
    aspectRatio: "9:16"
  }
];


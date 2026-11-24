import siklabImage from "./assets/projects/siklab-kumpas.webp";
import fraudImage from "./assets/projects/fraud-risk-analyzer.webp";
import bookGardenImage from "./assets/projects/book-garden.webp";

export interface HeroTitle {
  /** Rendered in --text-light. */
  lead: string;
  /** Rendered in --gold-light. */
  accent?: string;
}

export const heroTitles: HeroTitle[] = [{ lead: "Hi! I'm ", accent: "Dan" }, { lead: "whoami.py" }];

export const profileImageUrl: string | null = "/profile.webp";
export const profileImageAlt = "Portrait of Dan";

// about.webp is a 768×1040 crop of PORTFOLIO_PIC.png (17 KB vs 4.9 MB), shaped to the About frame.
export const aboutImageUrl = "/about.webp";
export const aboutImageAlt = "Dan in a white shirt, black-and-white portrait";

export const contactEmail = "danielbarrameda2021@gmail.com";
// Replace with your profile URLs; the hero icons and the Contact list both read these.
export const githubUrl = "https://github.com/AlexDanielBarrameda";
export const linkedinUrl = "https://www.linkedin.com/in/alex-daniel-barrameda/";

/** "https://www.github.com/user/" -> "github.com/user" */
export const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const aboutParagraphs: string[] = [
  "Hey, I’m an aspiring Software and Machine Learning Engineer currently based in the Philippines. I’m a 4th year Computer Science student at the University of Rizal System - Morong.",
  "I focus on the space where software engineering meets applied AI—building end-to-end projects across computer vision, predictive modeling, and full-stack web apps. My interest in ML started with a simple idea: pointing a camera at something and teaching a computer to understand it. Since then, my work has focused on applied machine learning and full-stack development, automating manual processes inside apps and turning complex data into tools that help people improve their performance. I even let my hobbies bleed into my code, like breaking down competitive gameplay mechanics with data instead of relying on guesswork.",
];

export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Machine Learning & Data",
    items: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-Learn",
      "MediaPipe",
      "Pandas",
      "NumPy",
      "Computer Vision",
      "Time-Series Analysis",
      "LLM Integration",
    ],
  },
  {
    title: "Software & Web Development",
    items: ["TypeScript", "JavaScript", "React", "Vite", "Flutter", "Dart", "PHP", "Laravel", "Java", "HTML/CSS"],
  },
];

export interface Project {
  category: string;
  title: string;
  /** Where the project came from, e.g. "Undergraduate Thesis". */
  context: string;
  description: string;
  href: string;
  /** Deployed site, if there is one; shows a "Live site" link next to the repo button. */
  liveUrl?: string;
  image: string;
  imageAlt: string;
}

// Add a project by appending to this list; the looping Projects track picks it up automatically.
export const projects: Project[] = [
  {
    category: "Computer Vision / ML",
    title: "Siklab-Kumpas: a Bidirectional Sign Language Framework",
    context: "Undergraduate Thesis",
    description:
      "An offline Android app that turns Filipino and American Sign Language into text and speech, then signs spoken replies back through a 3D avatar.",
    href: "https://github.com/AlexDanielBarrameda/Siklab-kumpas/tree/main",
    image: siklabImage,
    imageAlt: "Three Siklab-Kumpas app screens: profile picker, sign recognition camera, and the avatar translation hub",
  },
  {
    category: "AI / Web App",
    title: "Fraud Risk Analyzer",
    context: "College Hackathon Project",
    description:
      "Paste a suspicious SMS, chat, or email and get a 0–100 risk score from a rules engine, Google Safe Browsing, domain-age checks, and Gemini.",
    href: "https://github.com/AlexDanielBarrameda/fraud-detector-hackathon",
    liveUrl: "https://fraud-detector-hackathon.vercel.app/",
    image: fraudImage,
    imageAlt: "Fraud Analyzer dashboard in dark mode with the message input, sample scams, and recent scans",
  },
  {
    category: "Full-Stack / Laravel",
    title: "Book Garden Online Library Management System",
    context: "Solo Project",
    description:
      "A Laravel and Filament library system where students borrow books and pay fees through GCash, and librarians approve requests, returns, and refunds.",
    href: "https://github.com/AlexDanielBarrameda/OLMS-LARAVEL",
    image: bookGardenImage,
    imageAlt: "Book Garden admin dashboard with library stats and a books-by-category chart",
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");

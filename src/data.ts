export interface HeroTitle {
  /** Rendered in --text-light. */
  lead: string;
  /** Rendered in --gold-light. */
  accent?: string;
}

export const heroTitles: HeroTitle[] = [{ lead: "Hi! I'm ", accent: "Dan" }, { lead: "whoami.py" }];

// Path to a photo in /public, e.g. "/profile.jpg". null shows the YN placeholder.
export const profileImageUrl: string | null = null;
export const profileImageAlt = "Portrait of Dan";

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

export const aboutParagraphs: string[] = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit with a passion for crafting thoughtful digital experiences. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua—ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore: eu fugiat nulla pariatur, excepteur sint occaecat, and cupidatat non proident.",
];

export const skills: string[] = ["Lorem", "Ipsum", "Dolorsit", "Amet", "Consec", "Elit"];

export interface Project {
  category: string;
  title: string;
  description: string;
  href: string;
}

export const projects: Project[] = [
  {
    category: "Lorem",
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, sed do eiusmod tempor and quiet visual details.",
    href: "#",
  },
  {
    category: "Ipsum",
    title: "Dolor Sit No. 8",
    description:
      "Ut enim ad minim veniam quis nostrud exercitation, ullamco laboris with expressive moments.",
    href: "#",
  },
  {
    category: "Dolor",
    title: "Amet Consectetur",
    description:
      "Duis aute irure dolor in reprehenderit voluptate, velit esse cillum dolore and ease of use.",
    href: "#",
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");

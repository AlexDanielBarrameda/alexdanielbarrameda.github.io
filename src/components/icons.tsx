import type { SVGProps } from "react";
import { githubUrl, linkedinUrl } from "../data";

const base: SVGProps<SVGSVGElement> = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const LinkedInIcon = () => (
  <svg {...base}>
    <path d="M6 10v8M6 6.5v.01M10.5 18v-8M10.5 13.5a3 3 0 0 1 6 0V18" />
  </svg>
);

export const GitHubIcon = () => (
  <svg {...base}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

export const MailIcon = () => (
  <svg {...base}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
);

export interface SocialLink {
  label: string;
  href: string;
  Icon: () => JSX.Element;
  external: boolean;
}

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: linkedinUrl, Icon: LinkedInIcon, external: true },
  { label: "GitHub", href: githubUrl, Icon: GitHubIcon, external: true },
  // Jumps to the on-page Contact section (smooth via html scroll-behavior) instead of opening a mail client.
  { label: "Go to contact section", href: "#contact", Icon: MailIcon, external: false },
];

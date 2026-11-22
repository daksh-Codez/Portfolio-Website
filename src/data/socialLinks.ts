export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string | null; // Placeholder supported
  isConfigured: boolean;
  platform: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@daksh-Codez",
    url: "https://github.com/daksh-Codez",
    isConfigured: true,
    platform: "github"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "@Daksh Goswami",
    url: "https://linkedin.com/in/daksh-goswami",
    isConfigured: true,
    platform: "linkedin"
  },
  {
    id: "codolio",
    label: "Codolio",
    handle: "@dakshCodez",
    url: "https://codolio.com/profile/dakshCodez",
    isConfigured: true,
    platform: "codolio"
  },
  {
    id: "email",
    label: "Email",
    handle: "dakshgoswami4077@gmail.com",
    url: "mailto:dakshgoswami4077@gmail.com",
    isConfigured: true,
    platform: "email"
  }
];

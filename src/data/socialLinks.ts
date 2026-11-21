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
    handle: "dakshcodez", // GitHub profile username or placeholder
    url: "https://github.com/dakshcodez",
    isConfigured: true,
    platform: "github"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "daksh-goswami",
    url: null, // Configurable placeholder; renders gracefully with copy/tooltip
    isConfigured: false,
    platform: "linkedin"
  },
  {
    id: "email",
    label: "Email",
    handle: "dakshgoswami@outlook.com", // Configurable placeholder
    url: "mailto:dakshgoswami@outlook.com",
    isConfigured: false, // will update or toggle easily
    platform: "email"
  }
];

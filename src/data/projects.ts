// At the top of the file, add these utility functions
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 50%)`; // Using HSL for consistent brightness
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2); // Get maximum 2 initials
}

function generateDefaultLogo(name: string) {
  return {
    type: 'initials' as const,
    initials: getInitials(name),
    color: stringToColor(name)
  };
}

// Update the Project type in src/types/project.ts to include the new logo type
export interface Project {
  id: string;
  name: string;
  website: string;
  description: string;
  logo?: string | { type: 'initials'; initials: string; color: string };
  category: string[];
  isOpenSource: boolean;
  github?: string;
  twitter?: string;
  discord?: string;
  lastUpdated: string;
}

export const projects: Project[] = [
  {
    id: 'bun',
    name: 'Bun',
    website: 'https://bun.sh/',
    description: 'Develop, test, run, and bundle JavaScript & TypeScript projects—all with Bun.',
    logo: 'https://github.com/oven-sh/bun/blob/main/src/logo.svg?raw=true',
    category: ['Web Framework'],
    isOpenSource: true,
    github: 'https://github.com/oven-sh/bun',
    twitter: 'bunjavascript',
    discord: 'https://discord.com/CXdq2DP29u',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'ghostty',
    name: 'Ghostty',
    website: 'https://ghostty.org/',
    description: 'Ghostty is a fast, feature-rich, and cross-platform terminal emulator that uses platform-native UI and GPU acceleration.',
    logo: 'https://avatars.githubusercontent.com/u/169223740',
    category: ['Terminal'],
    isOpenSource: true,
    github: 'https://github.com/ghostty-org/ghostty',
    twitter: 'mitchellh',
    discord: 'https://discord.gg/ghostty',
    lastUpdated: new Date().toISOString()
  }
].map(project => ({
  ...project,
  logo: project.logo || generateDefaultLogo(project.name)
}));

// Generate unique categories from all projects
export const categories = Array.from(
  new Set(projects.flatMap(project => project.category))
).sort();
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
    logo: 'https://private-user-images.githubusercontent.com/6010774/382552750-50282090-adfd-4ddb-9e27-c30753c6b161.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDM2ODk0MjAsIm5iZiI6MTc0MzY4OTEyMCwicGF0aCI6Ii82MDEwNzc0LzM4MjU1Mjc1MC01MDI4MjA5MC1hZGZkLTRkZGItOWUyNy1jMzA3NTNjNmIxNjEucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI1MDQwMyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA0MDNUMTQwNTIwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MzFlNzIyN2Y2YWI1ZGU4NTE3MDc1ZmMxMDEwMjM5NTZhY2RmMzc4MjU0YjE1ODE1NjgzYzI5YWY2NDE4OGY3ZCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.4zZSCo40oAHHVxktV2blP7rHNlqTgjFUvi7S9q56uF4',
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
    logo: 'https://private-user-images.githubusercontent.com/1299/393947124-fe853809-ba8b-400b-83ab-a9a0da25be8a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDM2ODk2MDAsIm5iZiI6MTc0MzY4OTMwMCwicGF0aCI6Ii8xMjk5LzM5Mzk0NzEyNC1mZTg1MzgwOS1iYThiLTQwMGItODNhYi1hOWEwZGEyNWJlOGEucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI1MDQwMyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA0MDNUMTQwODIwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NzlhZTMwOTdjNjE2YTJhNjEyOTVmODY2YTZmYzg4MzRjOGMwMDdmN2QwMjg2YjAyMzlhZTRiNzE2MGVjZjEyOCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.RaEDsNYtFIhZmAMjiqdq-lxxlPM24uYISKE8tCB3wVY',
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
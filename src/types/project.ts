export interface Project {
  id: string;
  name: string;
  website: string;
  description: string;
  logo?: string | {
    type: 'initials';
    initials: string;
    color: string;
  };
  category: string[];
  isOpenSource: boolean;
  github?: string;
  twitter?: string;
  discord?: string;
  lastUpdated: string;
}
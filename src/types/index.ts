export interface Profile {
  name: string;
  title: string;
  roles: string[];
  tagline: string;
  subtitles: string[];
  bio: string;
  location: string;
  university: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface ProfileData {
  profile: Profile;
  stats: Stat[];
}

export interface Skill {
  name: string;
  category: string;
  level: number;
  description: string;
}

export interface SkillsData {
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  url: string;
  github: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  stats: Record<string, number | string>;
  featured: boolean;
  image: string;
}

export interface ProjectsData {
  projects: Project[];
  categories: string[];
}

export interface TimelineItem {
  id: string;
  type: string;
  title: string;
  org: string;
  location: string;
  period: string;
  description: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface AIWorkflowStep {
  step: string;
  description: string;
}

export interface ExperienceData {
  timeline: TimelineItem[];
  experience: { title: string; description: string };
  achievements: Achievement[];
  aiWorkflow: AIWorkflowStep[];
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  id?: string;
  errors?: string[];
}

export interface VisitorCount {
  visitors: number;
}

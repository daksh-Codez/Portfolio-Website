export interface ProjectRecord {
  id: string;
  slug: string;
  number: string;
  title: string;
  language: string;
  category: string;
  short_description: string;
  detailed_description?: string;
  technologies: string[];
  highlights: string[];
  github_url?: string;
  live_url?: string;
  cover_image?: string;
  screenshots?: string[];
  source_file_name: string;
  start_line: number;
  code_excerpt: string;
  visual_accent?: string;
  display_order: number;
  status: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
}

export interface SkillRecord {
  id: string;
  name: string;
  category: '01 / PROGRAMMING & SYSTEMS' | '02 / WEB FOUNDATIONS' | '03 / DATABASE' | '04 / DEVELOPMENT WORKFLOW';
  icon_name?: string;
  display_order: number;
  status: 'published' | 'hidden';
  created_at?: string;
  updated_at?: string;
}

export interface PersonalInfoRecord {
  id: number;
  name: string;
  role: string;
  tagline: string;
  headline: string;
  location: string;
  bio: string;
  about_paragraphs: string[];
  avatar_url?: string;
  email: string;
  availability_status: string;
  updated_at?: string;
}

export interface EducationRecordDB {
  id: number;
  institution: string;
  degree: string;
  major: string;
  status: string;
  location: string;
  academic_notes: string[];
  updated_at?: string;
}

export interface TrajectoryItemRecord {
  id: string;
  number: string;
  title: string;
  phase: string;
  type: 'learning' | 'practice' | 'building' | 'workflow' | 'exploration';
  description: string;
  tags: string[];
  display_order: number;
  status: 'published' | 'draft';
  created_at?: string;
  updated_at?: string;
}

export interface InternshipMilestoneRecord {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  updated_at?: string;
}

export interface SocialLinkRecord {
  id: string;
  platform: string;
  url: string;
  handle: string;
  display_order: number;
  status: 'published' | 'hidden';
  updated_at?: string;
}

export interface MediaFileRecord {
  id: string;
  filename: string;
  storage_path: string;
  public_url: string;
  file_size: number;
  mime_type: string;
  created_at?: string;
}

export interface WebsiteSettingRecord {
  key: string;
  value: Record<string, any>;
  updated_at?: string;
}

export type ProjectCategory =
  | "all"
  | "frontend"
  | "backend"
  | "fullstack"
  | "AI & ML"
  | "game development";

export interface ProjectType {
  id: string;
  title: string;
  category: ProjectCategory | ProjectCategory[];
  description: string;
  resultKey?: string;
  summaryKey?: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  projectUrl?: string;
  isFeatured: boolean;
  isWip?: boolean;
  docId?: string;
  showInResume?: string[];
  descKeys?: string[];
  linkUrl?: string;
  linkTextKey?: string;
}


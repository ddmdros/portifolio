export type CertificationCategory = "ia_ml" | "ia_agents" | "back" | "frontend" | "cloud" | "idiomas" | "game_dev" | "fundamentos";

export interface CertificationType {
  id: string;
  titleKey: string;
  orgKey: string;
  year: string;
  showInResume: string[];
  category: CertificationCategory;
  hours?: string;
  credentialUrl?: string;
  credentialUrlPt?: string;
  showOnHome?: boolean;
  sectionHighlight?: boolean;
}

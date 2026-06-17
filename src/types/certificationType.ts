export type CertificationCategory = "ia_ml" | "back" | "frontend" | "cloud" | "idiomas" | "game_dev";

export interface CertificationType {
  id: string;
  titleKey: string;
  orgKey: string;
  year: string;
  showInResume: string[];
  category: CertificationCategory;
  credentialUrl?: string;
  credentialUrlEn?: string;
  credentialUrlPt?: string;
  showOnHome?: boolean;
}

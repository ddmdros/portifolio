export interface CertificationType {
  id: string;
  titleKey: string;
  orgKey: string;
  year: string;
  showInResume: string[];
  category: string;
  credentialUrl?: string;
  credentialUrlEn?: string;
  credentialUrlPt?: string;
  showOnHome?: boolean;
}

import { CERTIFICATIONS_DATA } from "./CertificationsData";

// Only these are listed on the site. Entries with showInPortfolio: false stay in
// CertificationsData.ts (Dev Mode, syllabus links) but are not shown.
// Kept in its own file because Dev Mode rewrites CertificationsData.ts.
export const VISIBLE_CERTIFICATIONS = CERTIFICATIONS_DATA.filter((c) => c.showInPortfolio !== false);

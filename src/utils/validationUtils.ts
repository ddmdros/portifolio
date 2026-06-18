import { type CertificationType } from "../types/certificationType";

function isCertificationPlaceholder(
  cert: CertificationType,
  getTrans: (key: string, lang: "en" | "pt") => string
): boolean {
  const titleEn = getTrans(cert.titleKey, "en").trim();
  const orgEn = getTrans(cert.orgKey, "en").trim();
  return (
    (titleEn.toLowerCase() === "new certification name" || titleEn === "") &&
    (orgEn.toLowerCase() === "issuer org" || orgEn === "")
  );
}

export function checkDuplicateCertification(
  cert: CertificationType,
  allCerts: CertificationType[],
  getTrans: (key: string, lang: "en" | "pt") => string
): boolean {
  if (isCertificationPlaceholder(cert, getTrans)) return false;

  const titleEn = getTrans(cert.titleKey, "en").trim().toLowerCase();
  const orgEn = getTrans(cert.orgKey, "en").trim().toLowerCase();

  return allCerts.some((c) => {
    if (c.id === cert.id) return false;

    // Match credential Url (English)
    if (cert.credentialUrl && c.credentialUrl === cert.credentialUrl) return true;
    // Match credential Url (Portuguese)
    if (cert.credentialUrlPt && c.credentialUrlPt === cert.credentialUrlPt) return true;

    if (isCertificationPlaceholder(c, getTrans)) return false;

    const cTitleEn = getTrans(c.titleKey, "en").trim().toLowerCase();
    const cOrgEn = getTrans(c.orgKey, "en").trim().toLowerCase();

    // Match English name + org + year
    if (titleEn === cTitleEn && orgEn === cOrgEn && cert.year === c.year) {
      return true;
    }

    // Match Portuguese name + org + year
    const titlePt = getTrans(cert.titleKey, "pt").trim().toLowerCase();
    const cTitlePt = getTrans(c.titleKey, "pt").trim().toLowerCase();
    const orgPt = getTrans(cert.orgKey, "pt").trim().toLowerCase();
    const cOrgPt = getTrans(c.orgKey, "pt").trim().toLowerCase();

    if (
      titlePt &&
      titlePt === cTitlePt &&
      orgPt &&
      orgPt === cOrgPt &&
      cert.year === c.year
    ) {
      return true;
    }

    return false;
  });
}

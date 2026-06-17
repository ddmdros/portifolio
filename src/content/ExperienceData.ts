export interface ExperienceType {
  id: string;
  titleKey: string;
  companyKey: string;
  dateKey: string;
  descKeys: string[];
  showInResume: string[];
  portfolioUrlKey?: string;
  linkUrl?: string;
  linkTextKey?: string;
}

export const EXPERIENCE_DATA: ExperienceType[] = [
  {
    "id": "1",
    "titleKey": "resume.exp.keywords.title",
    "companyKey": "resume.exp.keywords.company",
    "dateKey": "resume.exp.keywords.date",
    "descKeys": [
      "resume.exp.keywords.desc1",
      "resume.exp.keywords.desc2",
      "resume.exp.keywords.desc3"
    ],
    "showInResume": [
      "general",
      "cloud",
      "backend",
      "frontend",
      "fullstack",
      "ia_ml"
    ],
    "linkUrl": "https://google.com",
    "linkTextKey": "resume.link.google.text"
  },
  {
    "id": "2",
    "titleKey": "resume.exp.independent.title",
    "companyKey": "resume.exp.independent.company",
    "dateKey": "resume.exp.independent.date",
    "descKeys": [
      "resume.exp.independent.desc1"
    ],
    "portfolioUrlKey": "resume.link.portfolio",
    "showInResume": [
      "general",
      "cloud",
      "backend",
      "frontend",
      "fullstack",
      "ia_ml"
    ]
  }
];

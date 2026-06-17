export interface EducationType {
  id: string;
  titleKey: string;
  instKey: string;
  dateKey: string;
  gpaKey?: string;
  showInResume: boolean;
}

export const EDUCATION_DATA: EducationType[] = [
  {
    id: "1",
    titleKey: "resume.edu.se.title",
    instKey: "resume.edu.se.inst",
    dateKey: "resume.edu.se.date",
    showInResume: true,
  },
  {
    id: "2",
    titleKey: "resume.edu.java.title",
    instKey: "resume.edu.java.inst",
    dateKey: "resume.edu.java.date",
    showInResume: true,
  },
  {
    id: "3",
    titleKey: "resume.edu.journalism.title",
    instKey: "resume.edu.journalism.inst",
    dateKey: "resume.edu.journalism.date",
    gpaKey: "resume.edu.journalism.gpa",
    showInResume: true,
  },
];

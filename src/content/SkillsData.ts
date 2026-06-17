export interface SkillType {
  id: string;
  categoryKey: string;
  name: string;
  showInResume: boolean;
  resumeDetailsKey?: string;
  credentialUrl?: string;
  certTextKey?: string;
}

export const SKILLS_DATA: SkillType[] = [
  // Programming Languages
  {
    id: "s1",
    categoryKey: "about.stacks.programming.languages",
    name: "Python",
    showInResume: false,
  },
  {
    id: "s2",
    categoryKey: "about.stacks.programming.languages",
    name: "JavaScript",
    showInResume: false,
  },
  {
    id: "s3",
    categoryKey: "about.stacks.programming.languages",
    name: "Java",
    showInResume: true,
    resumeDetailsKey: "resume.skills.programming.java",
  },
  {
    id: "s4",
    categoryKey: "about.stacks.programming.languages",
    name: "C#",
    showInResume: true,
    resumeDetailsKey: "resume.skills.programming.csharp",
  },
  // Web & Game Dev
  {
    id: "s5",
    categoryKey: "about.stacks.web.game.dev",
    name: "React",
    showInResume: false,
  },
  {
    id: "s6",
    categoryKey: "about.stacks.web.game.dev",
    name: "TypeScript",
    showInResume: true,
    resumeDetailsKey: "resume.skills.programming.web",
  },
  {
    id: "s7",
    categoryKey: "about.stacks.web.game.dev",
    name: "Tailwind CSS",
    showInResume: false,
  },
  {
    id: "s8",
    categoryKey: "about.stacks.web.game.dev",
    name: "Vite",
    showInResume: false,
  },
  {
    id: "s9",
    categoryKey: "about.stacks.web.game.dev",
    name: "Node.js",
    showInResume: false,
  },
  {
    id: "s10",
    categoryKey: "about.stacks.web.game.dev",
    name: "HTML5",
    showInResume: false,
  },
  {
    id: "s11",
    categoryKey: "about.stacks.web.game.dev",
    name: "CSS3",
    showInResume: false,
  },
  {
    id: "s12",
    categoryKey: "about.stacks.web.game.dev",
    name: "Unity",
    showInResume: false,
  },
  // Data & DevOps
  {
    id: "s13",
    categoryKey: "about.stacks.data.devops",
    name: "PostgreSQL",
    showInResume: false,
  },
  {
    id: "s14",
    categoryKey: "about.stacks.data.devops",
    name: "Git & CI/CD",
    showInResume: false,
  },
  {
    id: "s15",
    categoryKey: "about.stacks.data.devops",
    name: "Google Cloud",
    showInResume: false,
  },
  {
    id: "s16",
    categoryKey: "about.stacks.data.devops",
    name: "Supabase",
    showInResume: false,
  },
  // Languages
  {
    id: "s17",
    categoryKey: "resume.skills.languages",
    name: "English",
    showInResume: true,
    resumeDetailsKey: "resume.skills.languages.english",
    credentialUrl: "https://www.efset.org/cert/iwWZUS",
    certTextKey: "resume.skills.languages.english.cert",
  },
  {
    id: "s18",
    categoryKey: "resume.skills.languages",
    name: "French",
    showInResume: true,
    resumeDetailsKey: "resume.skills.languages.french",
    credentialUrl: "https://linkedin.com/in/diogo-medeiros",
    certTextKey: "resume.skills.languages.french.cert",
  },
];

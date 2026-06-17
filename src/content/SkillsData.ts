export interface SkillType {
  id: string;
  categoryKey: string;
  name: string;
  showInResume: string[];
  resumeDetailsKey?: string;
  credentialUrl?: string;
  certTextKey?: string;
}

export const SKILLS_DATA: SkillType[] = [
  {
    "id": "s1",
    "categoryKey": "about.stacks.programming.languages",
    "name": "Python",
    "showInResume": [
      "ia_ml",
      "general"
    ]
  },
  {
    "id": "s2",
    "categoryKey": "about.stacks.programming.languages",
    "name": "JavaScript",
    "showInResume": [
      "general",
      "frontend",
      "fullstack"
    ]
  },
  {
    "id": "s3",
    "categoryKey": "about.stacks.programming.languages",
    "name": "Java",
    "showInResume": [
      "general",
      "backend",
      "fullstack"
    ],
    "resumeDetailsKey": "resume.skills.programming.java"
  },
  {
    "id": "s4",
    "categoryKey": "about.stacks.programming.languages",
    "name": "C#",
    "showInResume": [
      "backend",
      "fullstack"
    ],
    "resumeDetailsKey": "resume.skills.programming.csharp"
  },
  {
    "id": "s5",
    "categoryKey": "about.stacks.web.game.dev",
    "name": "React",
    "showInResume": [
      "frontend",
      "fullstack"
    ]
  },
  {
    "id": "s6",
    "categoryKey": "about.stacks.web.game.dev",
    "name": "TypeScript",
    "showInResume": [
      "frontend",
      "fullstack",
      "backend",
      "cloud",
      "ia_ml"
    ],
    "resumeDetailsKey": "resume.skills.programming.web"
  },
  {
    "id": "s7",
    "categoryKey": "about.stacks.web.game.dev",
    "name": "Tailwind CSS",
    "showInResume": [
      "frontend",
      "fullstack"
    ]
  },
  {
    "id": "s8",
    "categoryKey": "about.stacks.web.game.dev",
    "name": "Vite",
    "showInResume": [
      "frontend",
      "fullstack"
    ]
  },
  {
    "id": "s9",
    "categoryKey": "about.stacks.web.game.dev",
    "name": "Node.js",
    "showInResume": [
      "backend",
      "fullstack",
      "general"
    ]
  },
  {
    "id": "s10",
    "categoryKey": "about.stacks.web.game.dev",
    "name": "HTML5",
    "showInResume": [
      "frontend",
      "fullstack"
    ]
  },
  {
    "id": "s11",
    "categoryKey": "about.stacks.web.game.dev",
    "name": "CSS3",
    "showInResume": [
      "frontend",
      "fullstack"
    ]
  },
  {
    "id": "s12",
    "categoryKey": "about.stacks.web.game.dev",
    "name": "Unity",
    "showInResume": []
  },
  {
    "id": "s13",
    "categoryKey": "about.stacks.data.devops",
    "name": "PostgreSQL",
    "showInResume": [
      "backend",
      "fullstack",
      "ia_ml",
      "general"
    ]
  },
  {
    "id": "s14",
    "categoryKey": "about.stacks.data.devops",
    "name": "Git & CI/CD",
    "showInResume": [
      "general",
      "cloud",
      "backend",
      "frontend",
      "fullstack",
      "ia_ml"
    ]
  },
  {
    "id": "s15",
    "categoryKey": "about.stacks.data.devops",
    "name": "Google Cloud",
    "showInResume": [
      "general",
      "cloud",
      "backend",
      "fullstack",
      "ia_ml"
    ]
  },
  {
    "id": "s16",
    "categoryKey": "about.stacks.data.devops",
    "name": "Supabase",
    "showInResume": [
      "backend",
      "frontend",
      "fullstack",
      "general"
    ]
  },
  {
    "id": "s17",
    "categoryKey": "resume.skills.languages",
    "name": "English",
    "showInResume": [
      "general",
      "cloud",
      "backend",
      "frontend",
      "fullstack",
      "ia_ml"
    ],
    "resumeDetailsKey": "resume.skills.languages.english",
    "credentialUrl": "https://www.efset.org/cert/iwWZUS",
    "certTextKey": "resume.skills.languages.english.cert"
  },
  {
    "id": "s18",
    "categoryKey": "resume.skills.languages",
    "name": "French",
    "showInResume": [
      "general",
      "cloud",
      "backend",
      "frontend",
      "fullstack",
      "ia_ml"
    ],
    "resumeDetailsKey": "resume.skills.languages.french",
    "credentialUrl": "https://linkedin.com/in/diogo-medeiros",
    "certTextKey": "resume.skills.languages.french.cert"
  }
];

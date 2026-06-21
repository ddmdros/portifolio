export interface EducationCourse {
  id: string;
  titleEn: string;
  titlePt: string;
  subtitleEn?: string;
  subtitlePt?: string;
  completion: number;
  certificateId?: string;
  grade?: number;
  expectedDateEn?: string;
  expectedDatePt?: string;
  isEmphasis?: boolean;
  isCurrent?: boolean;
}

export interface EducationLevel {
  id: string;
  titleEn: string;
  titlePt: string;
  descEn?: string;
  descPt?: string;
  courses: EducationCourse[];
}

export interface EducationType {
  id: string;
  titleKey: string;
  instKey: string;
  dateKey: string;
  gpaKey?: string;
  showInResume: string[];
  showInPortfolio?: boolean;
  certificationIds?: string[];
  levels?: EducationLevel[];
}

export const EDUCATION_DATA: EducationType[] = [
  {
    "id": "1",
    "titleKey": "resume.edu.se.title",
    "instKey": "resume.edu.se.inst",
    "dateKey": "resume.edu.se.date",
    "showInResume": [
      "general",
      "cloud",
      "backend",
      "frontend",
      "fullstack",
      "ia_ml"
    ],
    "levels": [
      {
        "id": "infnet-lvl-1",
        "titleEn": "1st Semester",
        "titlePt": "1º Semestre",
        "descEn": "Software Development Foundations",
        "descPt": "Fundamentos de Desenvolvimento de Software",
        "courses": [
          {
            "id": "infnet-c-1-1",
            "titleEn": "Web Programming with HTML5 and CSS3",
            "titlePt": "Programação Web com HTML 5 e CSS 3",
            "subtitleEn": "Foundations of Software Development",
            "subtitlePt": "Fundamentos do Desenvolvimento de Software",
            "completion": 100,
            "grade": 100
          },
          {
            "id": "infnet-c-1-2",
            "titleEn": "Web Programming with JavaScript I",
            "titlePt": "Programação Web com JavaScript I",
            "subtitleEn": "Foundations of Software Development",
            "subtitlePt": "Fundamentos do Desenvolvimento de Software",
            "completion": 100,
            "grade": 100
          },
          {
            "id": "infnet-c-1-3",
            "titleEn": "Interactivity in Web Pages",
            "titlePt": "Interatividade em Páginas Web",
            "subtitleEn": "Foundations of Software Development",
            "subtitlePt": "Fundamentos do Desenvolvimento de Software",
            "completion": 100,
            "grade": 100
          },
          {
            "id": "infnet-c-1-4",
            "titleEn": "Web Programming with JavaScript II",
            "titlePt": "Programação Web com JavaScript II",
            "subtitleEn": "Foundations of Software Development",
            "subtitlePt": "Fundamentos do Desenvolvimento de Software",
            "completion": 100,
            "grade": 95
          },
          {
            "id": "infnet-c-1-5",
            "titleEn": "Block Project: Foundations of Software Development",
            "titlePt": "Projeto de Bloco: Fundamentos do Desenvolvimento de Software",
            "subtitleEn": "Foundations of Software Development",
            "subtitlePt": "Fundamentos do Desenvolvimento de Software",
            "completion": 100,
            "grade": 100
          },
          {
            "id": "infnet-c-1-6",
            "titleEn": "Course and Career Planning",
            "titlePt": "Planejamento de Curso e Carreira",
            "subtitleEn": "Course and Career Planning",
            "subtitlePt": "Planejamento de Curso e Carreira",
            "completion": 100,
            "grade": 100
          },
          {
            "id": "infnet-c-1-7",
            "titleEn": "Fluency in AI",
            "titlePt": "Fluência em IA",
            "subtitleEn": "Course and Career Planning",
            "subtitlePt": "Planejamento de Curso e Carreira",
            "completion": 100,
            "grade": 100
          }
        ]
      },
      {
        "id": "infnet-lvl-2",
        "titleEn": "2nd Semester (Current)",
        "titlePt": "2º Semestre (Atual)",
        "descEn": "Data Foundations",
        "descPt": "Fundamentos de Dados",
        "courses": [
          {
            "id": "infnet-c-3-1",
            "titleEn": "Data Visualization and Introduction to SQL",
            "titlePt": "Visualização de Dados e Introdução a SQL",
            "subtitleEn": "Data Foundations Block",
            "subtitlePt": "Bloco Fundamentos de Dados",
            "completion": 100
          },
          {
            "id": "infnet-c-3-2",
            "titleEn": "Programming with Python",
            "titlePt": "Programação com Python",
            "subtitleEn": "Data Foundations Block",
            "subtitlePt": "Bloco Fundamentos de Dados",
            "completion": 100
          },
          {
            "id": "infnet-c-3-3",
            "titleEn": "Block Project: Data Foundations",
            "titlePt": "Projeto de Bloco",
            "subtitleEn": "Data Foundations Block",
            "subtitlePt": "Bloco Fundamentos de Dados",
            "completion": 100
          },
          {
            "id": "infnet-c-3-4",
            "titleEn": "Elective: Introduction to Data Science with R",
            "titlePt": "Disciplina Optativa: Introdução à Ciência de Dados com R",
            "subtitleEn": "Elective Course",
            "subtitlePt": "Disciplina Optativa",
            "completion": 100
          },
          {
            "id": "infnet-c-3-5",
            "titleEn": "Elective: Recommendation Systems Algorithms for Streaming",
            "titlePt": "Disciplina Optativa: Algoritmos de sistemas de recomendação para plataformas de streaming",
            "subtitleEn": "Elective Course",
            "subtitlePt": "Disciplina Optativa",
            "completion": 100
          },
          {
            "id": "infnet-c-3-6",
            "titleEn": "Elective: Programming and Machine Learning Club",
            "titlePt": "Disciplina Optativa: Clube de Programação e Machine Learning",
            "subtitleEn": "Elective Course",
            "subtitlePt": "Disciplina Optativa",
            "completion": 100
          },
          {
            "id": "infnet-c-4-1",
            "titleEn": "Foundations of Relational Modeling and SQL",
            "titlePt": "Fundamentos de Modelagem Relacional e SQL",
            "subtitleEn": "Data Foundations Block",
            "subtitlePt": "Bloco Fundamentos de Dados",
            "completion": 0,
            "expectedDateEn": "2nd Sem. 2026",
            "expectedDatePt": "2º Sem. 2026"
          },
          {
            "id": "infnet-c-4-2",
            "titleEn": "Python for Data",
            "titlePt": "Python para Dados",
            "subtitleEn": "Data Foundations Block",
            "subtitlePt": "Bloco Fundamentos de Dados",
            "completion": 0,
            "expectedDateEn": "2nd Sem. 2026",
            "expectedDatePt": "2º Sem. 2026"
          }
        ]
      },
      {
        "id": "infnet-lvl-3",
        "titleEn": "3rd Semester",
        "titlePt": "3º Semestre",
        "descEn": "Back-end Development",
        "descPt": "Desenvolvimento Back-end",
        "courses": [
          {
            "id": "infnet-c-5-1",
            "titleEn": "Back-end Development",
            "titlePt": "Desenvolvimento Back-end",
            "subtitleEn": "1st Cycle Block",
            "subtitlePt": "Bloco de 1ª Roda",
            "completion": 0,
            "expectedDateEn": "2nd Sem. 2026",
            "expectedDatePt": "2º Sem. 2026"
          },
          {
            "id": "infnet-c-6-1",
            "titleEn": "Back-end Development - Advanced Practices",
            "titlePt": "Desenvolvimento Back-end",
            "subtitleEn": "1st Cycle Block",
            "subtitlePt": "Bloco de 1ª Roda",
            "completion": 0,
            "expectedDateEn": "1st Sem. 2027",
            "expectedDatePt": "1º Sem. 2027"
          }
        ]
      },
      {
        "id": "infnet-lvl-4",
        "titleEn": "4th Semester",
        "titlePt": "4º Semestre",
        "descEn": "Analysis and Security of AI Agents",
        "descPt": "Análise e Segurança de Agentes de IA",
        "courses": [
          {
            "id": "infnet-c-7-1",
            "titleEn": "Analysis and Security of AI Agents",
            "titlePt": "Análise e Segurança de Agentes de IA",
            "subtitleEn": "2nd Cycle Block",
            "subtitlePt": "Bloco de 2ª Roda",
            "completion": 0,
            "expectedDateEn": "2nd Sem. 2027",
            "expectedDatePt": "2º Sem. 2027"
          },
          {
            "id": "infnet-c-8-1",
            "titleEn": "Analysis and Security of AI Agents - Advanced Practices",
            "titlePt": "Análise e Segurança de Agentes de IA",
            "subtitleEn": "2nd Cycle Block",
            "subtitlePt": "Bloco de 2ª Roda",
            "completion": 0,
            "expectedDateEn": "2nd Sem. 2027",
            "expectedDatePt": "2º Sem. 2027"
          }
        ]
      },
      {
        "id": "infnet-lvl-5",
        "titleEn": "5th Semester",
        "titlePt": "5º Semestre",
        "descEn": "Secure Engineering of Scalable Software",
        "descPt": "Engenharia Segura de Softwares Escaláveis",
        "courses": [
          {
            "id": "infnet-c-9-1",
            "titleEn": "Secure Engineering of Scalable Software",
            "titlePt": "Engenharia Segura de Softwares Escaláveis",
            "subtitleEn": "2nd Cycle Block",
            "subtitlePt": "Bloco de 2ª Roda",
            "completion": 0,
            "expectedDateEn": "1st Sem. 2028",
            "expectedDatePt": "1º Sem. 2028"
          },
          {
            "id": "infnet-c-10-1",
            "titleEn": "Secure Engineering of Scalable Software - Advanced Practices",
            "titlePt": "Engenharia Segura de Softwares Escaláveis",
            "subtitleEn": "2nd Cycle Block",
            "subtitlePt": "Bloco de 2ª Roda",
            "completion": 0,
            "expectedDateEn": "1st Sem. 2028",
            "expectedDatePt": "1º Sem. 2028"
          }
        ]
      },
      {
        "id": "infnet-lvl-6",
        "titleEn": "6th Semester",
        "titlePt": "6º Semestre",
        "descEn": "Computer Science",
        "descPt": "Ciência da Computação",
        "courses": [
          {
            "id": "infnet-c-11-1",
            "titleEn": "Computer Science",
            "titlePt": "Ciência da Computação",
            "subtitleEn": "2nd Cycle Block",
            "subtitlePt": "Bloco de 2ª Roda",
            "completion": 0,
            "expectedDateEn": "2nd Sem. 2028",
            "expectedDatePt": "2º Sem. 2028"
          },
          {
            "id": "infnet-c-12-1",
            "titleEn": "Computer Science - Advanced Practices",
            "titlePt": "Ciência da Computação",
            "subtitleEn": "2nd Cycle Block",
            "subtitlePt": "Bloco de 2ª Roda",
            "completion": 0,
            "expectedDateEn": "2nd Sem. 2028",
            "expectedDatePt": "2º Sem. 2028"
          }
        ]
      },
      {
        "id": "infnet-lvl-7",
        "titleEn": "7th Semester (Emphasis)",
        "titlePt": "7º Semestre (Ênfase)",
        "descEn": "Graduation Emphasis (Specialization Focus - Block 1)",
        "descPt": "Ênfase de Graduação (Foco de Especialização - Bloco 1)",
        "courses": [
          {
            "id": "infnet-emphasis-13",
            "titleEn": "Emphasis: Applied Software Engineering - Block 1",
            "titlePt": "Ênfase: Engenharia de Software Aplicada - Bloco 1",
            "subtitleEn": "Specialization Focus Block",
            "subtitlePt": "Bloco de Foco de Especialização",
            "completion": 0,
            "expectedDateEn": "1st Sem. 2029",
            "expectedDatePt": "1º Sem. 2029",
            "isEmphasis": true
          },
          {
            "id": "infnet-emphasis-14",
            "titleEn": "Emphasis: Applied Software Engineering - Project",
            "titlePt": "Ênfase: Engenharia de Software Aplicada - Projeto",
            "subtitleEn": "Specialization Focus Block",
            "subtitlePt": "Bloco de Foco de Especialização",
            "completion": 0,
            "expectedDateEn": "1st Sem. 2029",
            "expectedDatePt": "1º Sem. 2029",
            "isEmphasis": true
          }
        ]
      },
      {
        "id": "infnet-lvl-8",
        "titleEn": "8th Semester (Emphasis)",
        "titlePt": "8º Semestre (Ênfase)",
        "descEn": "Graduation Emphasis (Specialization Focus - Block 2)",
        "descPt": "Ênfase de Graduação (Foco de Especialização - Bloco 2)",
        "courses": [
          {
            "id": "infnet-emphasis-15",
            "titleEn": "Emphasis: Applied Software Engineering - Block 2",
            "titlePt": "Ênfase: Engenharia de Software Aplicada - Bloco 2",
            "subtitleEn": "Specialization Focus Block",
            "subtitlePt": "Bloco de Foco de Especialização",
            "completion": 0,
            "expectedDateEn": "2nd Sem. 2029",
            "expectedDatePt": "2º Sem. 2029",
            "isEmphasis": true
          },
          {
            "id": "infnet-emphasis-16",
            "titleEn": "Emphasis: Applied Software Engineering - Final Project",
            "titlePt": "Ênfase: Engenharia de Software Aplicada - Projeto Final",
            "subtitleEn": "Specialization Focus Block",
            "subtitlePt": "Bloco de Foco de Especialização",
            "completion": 0,
            "expectedDateEn": "2nd Sem. 2029",
            "expectedDatePt": "2º Sem. 2029",
            "isEmphasis": true
          }
        ]
      }
    ]
  },
  {
    "id": "custom-edu-1781742523179",
    "titleKey": "resume.edu.customcustom-edu-1781742523179.title",
    "instKey": "resume.edu.customcustom-edu-1781742523179.inst",
    "dateKey": "resume.edu.customcustom-edu-1781742523179.date",
    "showInResume": [],
    "showInPortfolio": true,
    "certificationIds": [
      "9",
      "23",
      "24"
    ],
    "levels": [
      {
        "id": "lvl-1",
        "titleEn": "Level 1 - Building Intelligent Agents with RAG",
        "titlePt": "Nível 1 - Construção de Agentes Inteligentes com RAG",
        "descEn": "Call language models and generate solutions for complex problems. In this stage, you begin transforming ideas into real AI applications.",
        "descPt": "Chame os modelos de linguagem e gere soluções para problemas complexos. Nesta etapa, você começa a transformar ideias em aplicações reais de IA.",
        "courses": [
          {
            "id": "c-1-1",
            "titleEn": "LangChain and Python",
            "titlePt": "LangChain e Python",
            "subtitleEn": "creating tools with OpenAI",
            "subtitlePt": "criando ferramentas com a OpenAI",
            "completion": 100,
            "certificateId": "9"
          },
          {
            "id": "c-1-2",
            "titleEn": "RAG Architectures with LLMs",
            "titlePt": "Arquiteturas RAG com LLMs",
            "subtitleEn": "embeddings, semantic search, and creating agents with LangChain",
            "subtitlePt": "embeddings, busca semântica e criação de agentes com LangChain",
            "completion": 100,
            "certificateId": "23"
          },
          {
            "id": "c-1-3",
            "titleEn": "LangChain",
            "titlePt": "LangChain",
            "subtitleEn": "Advanced RAG Techniques",
            "subtitlePt": "Técnicas Avançadas de RAG",
            "completion": 50
          },
          {
            "id": "c-1-4",
            "titleEn": "LangGraph",
            "titlePt": "LangGraph",
            "subtitleEn": "Orchestrating agents and multi-agents",
            "subtitlePt": "Orquestrando agentes e multiagentes",
            "completion": 0
          },
          {
            "id": "c-1-5",
            "titleEn": "Protocols and Architecture for Building Agents",
            "titlePt": "Protocolos e arquitetura para construção de agentes",
            "subtitleEn": "MCP, A2A, AG-UI and Backend for Agents (BFA)",
            "subtitlePt": "MCP, A2A, AG-UI e Backend for Agents (BFA)",
            "completion": 0
          },
          {
            "id": "c-1-6",
            "titleEn": "Clustering",
            "titlePt": "Clusterização",
            "subtitleEn": "dealing with unlabeled data",
            "subtitlePt": "lidando com dados sem rótulo",
            "completion": 0
          },
          {
            "id": "c-1-7",
            "titleEn": "NLP",
            "titlePt": "NLP",
            "subtitleEn": "applying natural language processing for sentiment analysis",
            "subtitlePt": "aplicando processamento de linguagem natural para análise de sentimentos",
            "completion": 0
          }
        ]
      },
      {
        "id": "lvl-2",
        "titleEn": "Level 2 - Machine Learning, Deep Learning and Fine Tuning",
        "titlePt": "Nível 2 - Machine Learning, Deep Learning e Fine Tuning",
        "descEn": "Create and fine-tune your models.",
        "descPt": "Crie e ajuste os seus modelos.",
        "courses": [
          {
            "id": "c-2-1",
            "titleEn": "Neural Networks",
            "titlePt": "Redes Neurais",
            "subtitleEn": "Deep Learning with PyTorch",
            "subtitlePt": "Deep Learning com PyTorch",
            "completion": 0
          },
          {
            "id": "c-2-2",
            "titleEn": "Training a Neural Network",
            "titlePt": "Treinando uma Rede Neural",
            "subtitleEn": "Deep Learning with PyTorch",
            "subtitlePt": "Deep Learning com PyTorch",
            "completion": 0
          },
          {
            "id": "c-2-3",
            "titleEn": "Recurrent Neural Networks",
            "titlePt": "Redes Neurais Recorrentes",
            "subtitleEn": "Deep Learning with PyTorch",
            "subtitlePt": "Deep Learning com PyTorch",
            "completion": 0
          },
          {
            "id": "c-2-4",
            "titleEn": "Convolutional Neural Networks",
            "titlePt": "Redes Neurais Convolucionais",
            "subtitleEn": "Deep Learning with PyTorch",
            "subtitlePt": "Deep Learning com PyTorch",
            "completion": 0
          },
          {
            "id": "c-2-5",
            "titleEn": "Hugging Face",
            "titlePt": "Hugging Face",
            "subtitleEn": "exploring and applying solutions with AI models",
            "subtitlePt": "explorando e aplicando soluções com modelos de IA",
            "completion": 0
          },
          {
            "id": "c-2-6",
            "titleEn": "Diffusion Models",
            "titlePt": "Modelos de Difusão",
            "subtitleEn": "fundamentals and advanced applications",
            "subtitlePt": "fundamentos e aplicações avançadas",
            "completion": 0
          },
          {
            "id": "c-2-7",
            "titleEn": "Transformers",
            "titlePt": "Transformers",
            "subtitleEn": "fundamentals and practice with PyTorch",
            "subtitlePt": "fundamentos e prática com PyTorch",
            "completion": 0
          }
        ]
      },
      {
        "id": "lvl-3",
        "titleEn": "Level 3 - MLOps and AIOps: operating AI systems in production",
        "titlePt": "Nível 3 - MLOps e AIOps: operando sistemas de IA em produção",
        "descEn": "Prepare to operate AI systems in production.",
        "descPt": "Se prepare para atuar no mercado.",
        "courses": [
          {
            "id": "c-3-1",
            "titleEn": "Artificial Intelligence",
            "titlePt": "Inteligência artificial",
            "subtitleEn": "market preparation",
            "subtitlePt": "preparação para o mercado",
            "completion": 100,
            "certificateId": "24"
          },
          {
            "id": "c-3-2",
            "titleEn": "Entrepreneuring with AI",
            "titlePt": "Empreendendo com IA",
            "subtitleEn": "from ideation to business model",
            "subtitlePt": "da ideação ao modelo de negócio",
            "completion": 0
          },
          {
            "id": "c-3-3",
            "titleEn": "Observability for LLMs",
            "titlePt": "Observabilidade para LLMs",
            "subtitleEn": "monitoring and evaluation with LangFuse",
            "subtitlePt": "monitoramento e avaliação com LangFuse",
            "completion": 0
          },
          {
            "id": "c-3-4",
            "titleEn": "Cloud AI Pipelines",
            "titlePt": "Pipelines de IA em Cloud",
            "subtitleEn": "Azure, AWS and GCP",
            "subtitlePt": "Azure, AWS e GCP",
            "completion": 0
          },
          {
            "id": "c-3-5",
            "titleEn": "MLFlow",
            "titlePt": "MLFlow",
            "subtitleEn": "experiment management and integration with generative AI",
            "subtitlePt": "gerenciamento de experimentos e integração com IA generativa",
            "completion": 0
          },
          {
            "id": "c-3-6",
            "titleEn": "Continuous Integration for LLMs",
            "titlePt": "Integração contínua para LLMs",
            "subtitleEn": "automating model evaluation with GitHub Actions and Deepeval",
            "subtitlePt": "automatizando a avaliação de modelos com GitHub Actions e Deepeval",
            "completion": 0
          },
          {
            "id": "c-3-7",
            "titleEn": "Data Science",
            "titlePt": "Data Science",
            "subtitleEn": "testing relationships with Linear Regression",
            "subtitlePt": "testando relações com Regressão Linear",
            "completion": 0
          },
          {
            "id": "c-3-8",
            "titleEn": "Hugging Face",
            "titlePt": "Hugging Face",
            "subtitleEn": "transferring learning of NLP models",
            "subtitlePt": "transferindo aprendizado de modelos de NLP",
            "completion": 0
          }
        ]
      }
    ]
  },
  {
    "id": "2",
    "titleKey": "resume.edu.java.title",
    "instKey": "resume.edu.java.inst",
    "dateKey": "resume.edu.java.date",
    "showInResume": [
      "cloud",
      "backend",
      "frontend",
      "fullstack",
      "ia_ml",
      "general"
    ]
  },
  {
    "id": "3",
    "titleKey": "resume.edu.journalism.title",
    "instKey": "resume.edu.journalism.inst",
    "dateKey": "resume.edu.journalism.date",
    "gpaKey": "resume.edu.journalism.gpa",
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

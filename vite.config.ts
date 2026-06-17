import { defineConfig, type ViteDevServer } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    {
      name: 'dev-server-middleware',
      configureServer(server: ViteDevServer) {
        server.middlewares.use((req: any, res: any, next: any) => {
          if (req.url === '/api/save-content' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk: any) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const payload = JSON.parse(body);
                const { projects, certifications, education, experience, skills, en, ptbr, generatePdfs = true } = payload;

                // Write ProjectsData
                const projectsContent = `import { type ProjectType } from "../types/projectType";\n\nexport const PROJECTS_DATA: ProjectType[] = ${JSON.stringify(projects, null, 2)};\n`;
                fs.writeFileSync(path.resolve(__dirname, 'src/content/ProjectsData.ts'), projectsContent);

                // Write CertificationsData
                const certsContent = `import { type CertificationType } from "../types/certificationType";\n\nexport const CERTIFICATIONS_DATA: CertificationType[] = ${JSON.stringify(certifications, null, 2)};\n`;
                fs.writeFileSync(path.resolve(__dirname, 'src/content/CertificationsData.ts'), certsContent);

                // Write EducationData
                const eduContent = `export interface EducationType {\n  id: string;\n  titleKey: string;\n  instKey: string;\n  dateKey: string;\n  gpaKey?: string;\n  showInResume: string[];\n}\n\nexport const EDUCATION_DATA: EducationType[] = ${JSON.stringify(education, null, 2)};\n`;
                fs.writeFileSync(path.resolve(__dirname, 'src/content/EducationData.ts'), eduContent);

                // Write ExperienceData
                const expContent = `export interface ExperienceType {\n  id: string;\n  titleKey: string;\n  companyKey: string;\n  dateKey: string;\n  descKeys: string[];\n  showInResume: string[];\n  portfolioUrlKey?: string;\n}\n\nexport const EXPERIENCE_DATA: ExperienceType[] = ${JSON.stringify(experience, null, 2)};\n`;
                fs.writeFileSync(path.resolve(__dirname, 'src/content/ExperienceData.ts'), expContent);

                // Write SkillsData
                const skillsContent = `export interface SkillType {\n  id: string;\n  categoryKey: string;\n  name: string;\n  showInResume: string[];\n  resumeDetailsKey?: string;\n  credentialUrl?: string;\n  certTextKey?: string;\n}\n\nexport const SKILLS_DATA: SkillType[] = ${JSON.stringify(skills, null, 2)};\n`;
                fs.writeFileSync(path.resolve(__dirname, 'src/content/SkillsData.ts'), skillsContent);

                // Write translations
                fs.writeFileSync(path.resolve(__dirname, 'src/i18n/messages/en.json'), JSON.stringify(en, null, 2) + '\n');
                fs.writeFileSync(path.resolve(__dirname, 'src/i18n/messages/ptbr.json'), JSON.stringify(ptbr, null, 2) + '\n');

                if (generatePdfs) {
                  console.log('Successfully saved content files. Rebuilding PDF resumes...');
                  // Trigger PDF rebuild
                  execSync('node scripts/generate_pdfs.cjs', { stdio: 'inherit' });
                } else {
                  console.log('Successfully saved content files. Skipping PDF rebuild as requested (fast mode).');
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, pdfGenerated: generatePdfs }));
              } catch (err: any) {
                console.error('Error in /api/save-content:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }
          next();
        });
      }
    }
  ]
})

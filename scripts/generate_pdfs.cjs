const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Skip PDF generation on Vercel or cloud CI build servers
if (process.env.VERCEL || process.env.CI) {
  console.log('Vercel/CI environment detected. Skipping PDF generation (pre-compiled assets will be used).');
  process.exit(0);
}

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (!fs.existsSync(CHROME_PATH)) {
  console.warn(`WARNING: Headless Chrome executable not found at "${CHROME_PATH}". Skipping PDF generation. (If you are on Windows, ensure Google Chrome is installed).`);
  process.exit(0);
}

const TEMP_DIR = process.env.TEMP || 'C:\\Users\\Diogo\\AppData\\Local\\Temp';
const DEST_DIR = path.resolve(__dirname, '../public/assets');

const projectsDataPath = path.resolve(__dirname, '../src/content/ProjectsData.ts');
const certsDataPath = path.resolve(__dirname, '../src/content/CertificationsData.ts');
const eduDataPath = path.resolve(__dirname, '../src/content/EducationData.ts');
const expDataPath = path.resolve(__dirname, '../src/content/ExperienceData.ts');
const skillsDataPath = path.resolve(__dirname, '../src/content/SkillsData.ts');

const enMessages = require(path.resolve(__dirname, '../src/i18n/messages/en.json'));
const ptbrMessages = require(path.resolve(__dirname, '../src/i18n/messages/ptbr.json'));

const signatureSvg = `
<svg width="120" height="45" viewBox="0 0 150 60" xmlns="http://www.w3.org/2000/svg">
  <path d="M 15,35 C 10,25 25,10 28,20 C 30,30 20,45 15,45 C 10,45 15,35 22,35 C 26,35 28,42 28,45 C 28,48 35,35 38,38 C 40,40 42,45 42,45 C 42,45 46,36 48,39 C 50,42 50,45 52,45 M 65,35 C 60,25 70,15 72,22 C 74,30 70,45 68,45 C 65,45 68,36 74,38 C 78,40 82,38 84,41 C 86,44 88,40 90,43 M 92,43 C 95,38 98,41 100,43 M 102,43 C 105,38 108,41 110,43 M 112,43 C 115,38 118,41 120,43 C 122,45 130,40 135,42 M 18,48 Q 60,42 140,30" 
        fill="none" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`;

function loadTypeScriptData(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const exportMatch = fileContent.match(/export\s+const\s+(\w+)/);
  if (!exportMatch) {
    throw new Error('Could not find export const in ' + filePath);
  }
  const varName = exportMatch[1];
  const cleanContent = fileContent
    .replace(/import\s+[\s\S]*?;/g, '') // strip imports
    .replace(/export\s+interface\s+\w+\s*\{[^{}]*\}/g, '') // strip export interfaces
    .replace(/export\s+type\s+[\s\S]*?;/g, '') // strip export types
    .replace(/export\s+const\s+(\w+)\s*(:\s*[\w\[\]]+)?\s*=/g, 'const $1 =') // strip types and exports
    + `\nmodule.exports = ${varName};`;
    
  const tempPath = path.join(TEMP_DIR, `temp_${varName}.js`);
  fs.writeFileSync(tempPath, cleanContent);
  const data = require(tempPath);
  fs.unlinkSync(tempPath);
  return data;
}

// Load data files dynamically
const PROJECTS_DATA = loadTypeScriptData(projectsDataPath);
const CERTIFICATIONS_DATA = loadTypeScriptData(certsDataPath);
const EDUCATION_DATA = loadTypeScriptData(eduDataPath);
const EXPERIENCE_DATA = loadTypeScriptData(expDataPath);
const SKILLS_DATA = loadTypeScriptData(skillsDataPath);

console.log('Successfully loaded projects, certifications, education, experience, and skills data from TS files.');

function getHtmlTemplate(lang, messages, profile) {
  const getMsg = (key) => messages[key] || key;

  // Filter projects by active profile
  const resumeProjects = PROJECTS_DATA.filter(p => p.showInResume && p.showInResume.includes(profile));

  const projectsHtml = resumeProjects.map(proj => {
    const projectLink = proj.projectUrl || proj.githubUrl || '#';
    const bullets = proj.descKeys ? proj.descKeys.map(key => `<li>${getMsg(key)}</li>`).join('') : '';
    return `
      <div class="project-item">
        <p class="project-name">${getMsg(proj.title)}</p>
        <p style="margin: 0 0 4px 0; color: #475569; line-height: 1.4;">${getMsg(proj.description)}</p>
        <ul style="padding-left: 12px;">
          ${bullets}
          ${proj.projectUrl || proj.githubUrl ? `<li style="margin-top: 2px;"><a href="${projectLink}" target="_blank">${getMsg('resume.project.starrCorp.link')}</a></li>` : ''}
        </ul>
      </div>
    `;
  }).join('');

  // Filter certifications by active profile
  const featuredCerts = CERTIFICATIONS_DATA.filter(c => c.showInResume && c.showInResume.includes(profile));

  const certsHtml = featuredCerts.map(cert => `
    <li style="margin-bottom: 5px;">
      <strong>${getMsg(cert.titleKey)}</strong>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #555555; margin-top: 1px;">
        ${getMsg(cert.orgKey)} &bull; ${cert.year} &bull; <a href="${cert.credentialUrl}" target="_blank" style="color: #059669;">${lang === 'pt' ? 'credencial' : 'credential'}</a>
      </div>
    </li>
  `).join('');

  // Filter education by active profile
  const resumeEdu = EDUCATION_DATA.filter(e => e.showInResume && e.showInResume.includes(profile));

  const eduHtml = resumeEdu.map(edu => `
    <li style="margin-bottom: 5px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <span>&bull; <strong>${getMsg(edu.titleKey)}</strong> — ${getMsg(edu.instKey)}</span>
        <span class="edu-date">${getMsg(edu.dateKey)}</span>
      </div>
      ${edu.gpaKey ? `
        <ul style="padding-left: 12px; list-style-type: circle; margin-top: 1px;">
          <li style="color: #475569; font-size: 9px;">${getMsg(edu.gpaKey)}</li>
        </ul>
      ` : ''}
    </li>
  `).join('');

  // Filter experience by active profile
  const resumeExp = EXPERIENCE_DATA.filter(ex => ex.showInResume && ex.showInResume.includes(profile));

  // Construct contact section
  const githubUrl = 'https://github.com/ddmdros';
  const linkedinUrl = 'https://linkedin.com/in/diogo-medeiros';
  const portfolioUrl = 'https://portifolio-tawny-xi-55.vercel.app';

  const expHtml = resumeExp.map(exp => `
    <div class="exp-item">
      <div class="exp-header">
        <span>${getMsg(exp.companyKey)}</span>
        <span class="exp-date">${getMsg(exp.dateKey)}</span>
      </div>
      <p class="exp-title">${getMsg(exp.titleKey)}</p>
      <ul style="padding-left: 12px; color: #334155;">
        ${exp.descKeys.map(key => `<li>${getMsg(key)}</li>`).join('')}
        ${exp.portfolioUrlKey ? `
          <li>${getMsg(exp.portfolioUrlKey)} <a href="${linkedinUrl}" target="_blank">${lang === 'pt' ? 'aqui' : 'here'}</a>.</li>
        ` : ''}
      </ul>
    </div>
  `).join('');

  // Add Link to Google Skills Profile as "More certifications"
  const googleSkillsProfile = 'https://www.skills.google/public_profiles/34ba9945-3ca3-4701-9312-d811fca01bf7';

  // Dynamic Technical Skills list filtered by active profile
  const resumeSkills = SKILLS_DATA.filter(s => s.showInResume && s.showInResume.includes(profile));

  const techSkillsGrouped = {};
  resumeSkills.forEach(s => {
    if (s.categoryKey !== 'resume.skills.languages') {
      if (!techSkillsGrouped[s.categoryKey]) {
        techSkillsGrouped[s.categoryKey] = [];
      }
      techSkillsGrouped[s.categoryKey].push(s);
    }
  });

  const techSkillsHtml = Object.keys(techSkillsGrouped).map(catKey => {
    const itemsHtml = techSkillsGrouped[catKey].map(s => {
      const detail = s.resumeDetailsKey ? getMsg(s.resumeDetailsKey) : s.name;
      return `<li class="skills-tag"><strong>${detail}</strong></li>`;
    }).join('');
    return `
      <div class="skills-group" style="margin-top: 6px;">
        <p class="skills-group-title">&bull; ${getMsg(catKey)}</p>
        <ul style="padding-left: 12px; list-style-type: circle;">
          ${itemsHtml}
        </ul>
      </div>
    `;
  }).join('');

  // Languages group
  const resumeLangs = resumeSkills.filter(s => s.categoryKey === 'resume.skills.languages');
  const langsHtml = resumeLangs.map(s => {
    const detail = s.resumeDetailsKey ? getMsg(s.resumeDetailsKey) : s.name;
    const certLink = s.credentialUrl && s.certTextKey ? `
      <ul style="padding-left: 12px; list-style-type: square; margin-top: 1px;">
        <li>${getMsg(s.certTextKey)} <a href="${s.credentialUrl}" target="_blank">${lang === 'pt' ? 'aqui' : 'here'}</a></li>
      </ul>
    ` : '';
    return `
      <li class="skills-tag" style="margin-top: 4px;">
        <strong>${detail}</strong>
        ${certLink}
      </li>
    `;
  }).join('');

  const languagesSectionHtml = resumeLangs.length > 0 ? `
    <div class="skills-group" style="margin-top: 8px;">
      <p class="skills-group-title">&bull; ${lang === 'pt' ? 'Idiomas' : 'Languages'}</p>
      <ul style="padding-left: 12px; list-style-type: circle;">
        ${langsHtml}
      </ul>
    </div>
  ` : '';

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>Resume - Diogo Medeiros</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 15mm 15mm 15mm;
    }
    body {
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      line-height: 1.4;
      color: #2c3e50;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    a {
      color: #059669;
      text-decoration: none;
      font-weight: 500;
    }
    a:hover {
      text-decoration: underline;
    }
    .header {
      margin-bottom: 12px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 10px;
    }
    .name {
      font-size: 26px;
      font-weight: 700;
      color: #059669;
      margin: 0 0 2px 0;
      letter-spacing: -0.5px;
    }
    .title {
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 4px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .contact-bar {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      color: #64748b;
      margin: 0;
    }
    .contact-bar a {
      color: #64748b;
      font-weight: normal;
    }
    .section-title {
      font-size: 10px;
      font-weight: 700;
      color: #059669;
      text-transform: uppercase;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-top: 12px;
      margin-bottom: 6px;
      letter-spacing: 0.8px;
      display: flex;
      align-items: center;
    }
    .section-title::before {
      content: "";
      display: inline-block;
      width: 3px;
      height: 10px;
      background-color: #34d399;
      margin-right: 6px;
      border-radius: 1px;
    }
    .section-content {
      margin-bottom: 6px;
      color: #334155;
    }
    ul {
      margin: 0;
      padding-left: 14px;
    }
    li {
      margin-bottom: 3px;
    }
    .grid-2 {
      display: flex;
      justify-content: space-between;
      gap: 30px;
      margin-bottom: 6px;
    }
    .col {
      flex: 1;
      min-width: 0;
    }
    .project-item, .exp-item {
      margin-bottom: 8px;
    }
    .project-name, .exp-company {
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 2px 0;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .exp-date, .edu-date {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      color: #64748b;
      font-weight: 500;
    }
    .exp-title {
      font-style: italic;
      color: #475569;
      font-weight: 500;
      margin: 0 0 4px 0;
    }
    .skills-group {
      margin-bottom: 8px;
    }
    .skills-group-title {
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 3px 0;
    }
    .skills-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      color: #475569;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      font-size: 7.5px;
      color: #64748b;
      border-top: 1px dashed #cbd5e1;
      padding-top: 8px;
    }
    .footer-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .lgpd-text {
      max-width: 280px;
      line-height: 1.3;
    }
    .footer-right {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="name">Diogo Medeiros</h1>
    <h2 class="title">${lang === 'pt' ? 'Engenheiro Full-Stack' : 'Full-Stack Engineer'}</h2>
    <p class="contact-bar">
      Lages, Brazil &bull; <a href="mailto:ddmdros@proton.me">ddmdros@proton.me</a> &bull; <a href="${linkedinUrl}" target="_blank">linkedin.com/in/diogo-medeiros</a> &bull; <a href="${githubUrl}" target="_blank">github.com/ddmdros</a>
    </p>
  </div>

  <div class="section-title">${lang === 'pt' ? 'Objetivo' : 'Goal'}</div>
  <div class="section-content" style="line-height: 1.45;">
    ${getMsg('resume.goal')}
  </div>

  <div class="section-title">${getMsg('resume.section.education')}</div>
  <div class="section-content">
    <ul style="padding-left: 8px; list-style-type: none;">
      ${eduHtml}
    </ul>
  </div>

  <div class="grid-2">
    <div class="col">
      <div class="section-title">${lang === 'pt' ? 'Projetos' : 'Projects'}</div>
      ${projectsHtml}
      <p style="margin: 4px 0 0 0;"><strong>${getMsg('resume.project.more')}</strong> <a href="${portfolioUrl}/${lang}/projects" target="_blank">${getMsg('resume.project.more.link')}</a></p>
    </div>

    <div class="col">
      <div class="section-title">${getMsg('resume.section.skills')}</div>
      ${techSkillsHtml}
      ${languagesSectionHtml}
    </div>
  </div>

  <div class="section-title" style="margin-top: 2px;">${getMsg('resume.section.experience')}</div>
  <div class="section-content">
    ${expHtml}
  </div>

  <div class="grid-2" style="margin-top: 2px; margin-bottom: 0;">
    <div class="col">
      <div class="section-title">${getMsg('resume.section.certifications')}</div>
      <ul style="padding-left: 12px;">
        ${certsHtml}
      </ul>
      <p style="margin: 4px 0 0 0; padding-left: 12px;"><strong>${lang === 'pt' ? 'Mais certificações:' : 'More certifications:'}</strong> <a href="${googleSkillsProfile}" target="_blank">${lang === 'pt' ? 'aqui' : 'here'}</a></p>
    </div>

    <div class="col">
      <div class="section-title">${lang === 'pt' ? 'Contato' : 'Contact'}</div>
      <ul style="padding-left: 12px; list-style-type: none;">
        <li style="margin-bottom: 3px;"><strong>&bull; Github:</strong> <a href="${githubUrl}" target="_blank">github.com/ddmdros</a></li>
        <li style="margin-bottom: 3px;"><strong>&bull; LinkedIn:</strong> <a href="${linkedinUrl}" target="_blank">linkedin.com/in/diogo-medeiros</a></li>
        <li style="margin-bottom: 3px;"><strong>&bull; ${lang === 'pt' ? 'Portfólio' : 'Portfolio'}:</strong> <a href="${portfolioUrl}" target="_blank">portifolio-tawny-xi-55.vercel.app</a></li>
      </ul>
    </div>
  </div>

  <div class="footer">
    <div class="footer-left">
      ${signatureSvg}
      <div class="lgpd-text">
        ${getMsg('resume.lgpd')}
      </div>
    </div>
    <div class="footer-right">
      ${getMsg('resume.updated')}
    </div>
  </div>
</body>
</html>
  `;
}

// Active CV profiles to compile
const PROFILES = ['general', 'cloud', 'backend', 'frontend', 'fullstack', 'ia_ml'];

// Create destination directory if it doesn't exist
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Compile CVs for all profiles in both languages
try {
  PROFILES.forEach(profile => {
    console.log(`Generating CVs for profile: "${profile}"...`);
    const htmlEn = getHtmlTemplate('en', enMessages, profile);
    const htmlPt = getHtmlTemplate('pt', ptbrMessages, profile);

    const tempHtmlEnPath = path.join(TEMP_DIR, `resume_${profile}_en.html`);
    const tempHtmlPtPath = path.join(TEMP_DIR, `resume_${profile}_pt.html`);
    const tempPdfEnPath = path.join(TEMP_DIR, `resume_${profile}_en.pdf`);
    const tempPdfPtPath = path.join(TEMP_DIR, `resume_${profile}_pt.pdf`);

    fs.writeFileSync(tempHtmlEnPath, htmlEn);
    fs.writeFileSync(tempHtmlPtPath, htmlPt);

    // Print EN PDF
    execSync(`"${CHROME_PATH}" --headless=new --disable-gpu --no-sandbox --print-to-pdf-no-header --print-to-pdf="${tempPdfEnPath}" "${tempHtmlEnPath}"`);
    // Print PT PDF
    execSync(`"${CHROME_PATH}" --headless=new --disable-gpu --no-sandbox --print-to-pdf-no-header --print-to-pdf="${tempPdfPtPath}" "${tempHtmlPtPath}"`);

    // Copy to destination
    const destPdfEnName = `resume_${profile}_en.pdf`;
    const destPdfPtName = `resume_${profile}_pt.pdf`;
    
    fs.copyFileSync(tempPdfEnPath, path.join(DEST_DIR, destPdfEnName));
    fs.copyFileSync(tempPdfPtPath, path.join(DEST_DIR, destPdfPtName));

    // If general, copy to default filename for fallback
    if (profile === 'general') {
      fs.copyFileSync(tempPdfEnPath, path.join(DEST_DIR, 'resume_en.pdf'));
      fs.copyFileSync(tempPdfPtPath, path.join(DEST_DIR, 'resume_pt.pdf'));
    }

    // Clean up
    fs.unlinkSync(tempHtmlEnPath);
    fs.unlinkSync(tempHtmlPtPath);
    fs.unlinkSync(tempPdfEnPath);
    fs.unlinkSync(tempPdfPtPath);
    console.log(`Profile "${profile}" PDFs generated and copied.`);
  });
  console.log('All profile PDFs generated successfully.');
} catch (err) {
  console.error('Error generating PDFs:', err);
  process.exit(1);
}

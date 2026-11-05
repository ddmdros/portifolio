// Builds the one-page AI Engineer CV PDFs from the HTML sources in this folder.
// Usage: node cv/build.cjs   (needs Playwright: npx playwright install chromium, or a global install)
const path = require("path");
const { chromium } = require("playwright");

const OUT = path.resolve(__dirname, "../public/assets");
const FILES = [
  ["cv_ai_engineer_pt.html", "Diogo_Medeiros_CV_AI_Engineer_pt.pdf"],
  ["cv_ai_engineer_en.html", "Diogo_Medeiros_CV_AI_Engineer_en.pdf"],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [src, dest] of FILES) {
    await page.goto("file://" + path.join(__dirname, src));
    await page.pdf({ path: path.join(OUT, dest), format: "A4", preferCSSPageSize: true, printBackground: true });
    console.log("wrote", dest);
  }
  await browser.close();
})();

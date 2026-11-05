// Fails when en.json and ptbr.json do not have the same keys, so no string is
// missing in one language. Run with `npm run check:i18n`.
const path = require("path");

const dir = path.resolve(__dirname, "../src/i18n/messages");
const en = Object.keys(require(path.join(dir, "en.json")));
const pt = Object.keys(require(path.join(dir, "ptbr.json")));

const missingInPt = en.filter((k) => !pt.includes(k));
const missingInEn = pt.filter((k) => !en.includes(k));

if (missingInPt.length || missingInEn.length) {
  if (missingInPt.length) console.error("Missing in ptbr.json:", missingInPt.join(", "));
  if (missingInEn.length) console.error("Missing in en.json:", missingInEn.join(", "));
  process.exit(1);
}
console.log(`i18n OK: ${en.length} keys in both languages.`);

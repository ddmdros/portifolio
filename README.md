# Engineering portfolio

Source of my software engineering portfolio: [portifolio-tawny-xi-55.vercel.app](https://portifolio-tawny-xi-55.vercel.app/en).
It presents my projects as case studies (context, problem, what I built, decisions, results, limits) and holds the
data behind my CV.

## Stack

- React 19, TypeScript and Vite
- Tailwind CSS 4 with the typography plugin for the case studies
- `react-intl` for English and Brazilian Portuguese (every route is prefixed with `/en` or `/pt`)
- `react-markdown` for the case studies in `src/content/docs/<project>/<lang>/<project>.md`
- Deployed on Vercel; `vercel.json` rewrites every path to the SPA

## Running it

Node 22:

```bash
npm ci
npm run dev        # http://localhost:5173
```

Checks (the same ones CI runs):

```bash
npm run lint
npm run check:i18n # en.json and ptbr.json must have the same keys
npx tsc -b
npx vite build
```

## Where the content lives

| What | File |
|---|---|
| Profile, links, which CV is downloadable | `src/config/profile.ts` |
| Projects, experience, education, skills, certifications | `src/content/*Data.ts` |
| Every visible string, in both languages | `src/i18n/messages/en.json`, `ptbr.json` |
| Case studies | `src/content/docs/` |
| Hand-made CV (the one the site offers) | `cv/` → `public/assets/Diogo_Medeiros_CV_AI_Engineer_*.pdf` |

## Dev Mode

`/en/dev-mode` is a local content editor. It only exists in `npm run dev`: it posts to a Vite dev-server endpoint
(`/api/save-content` in `vite.config.ts`) that rewrites the files above and can regenerate the profile CVs with
`scripts/generate_pdfs.cjs` (needs a local Chrome). Production builds leave it out, and the generated profile PDFs
are git-ignored.

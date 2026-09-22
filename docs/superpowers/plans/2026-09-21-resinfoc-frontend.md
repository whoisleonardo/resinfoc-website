# RESINFOC Front-end Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the existing REJORC public site as the RESINFOC portal while preserving the CMS, API contracts, and administrative interface.

**Architecture:** Keep the React route structure and `ContentContext` contract unchanged. Update the content seeds/fallbacks, shared visual tokens, and public page composition; add one static logo derivative in the front-end public assets so the brand renders without depending on a pre-populated media upload.

**Tech Stack:** React 18, React Router 6, Vite 8, CSS custom properties, existing Express content API.

**Spec:** `docs/superpowers/specs/2026-09-21-resinfoc-frontend-design.md`

## Global Constraints

- Do not change backend routes, database schema, API response shapes, authentication, or admin-page behavior.
- Preserve the `ContentContext` section keys: `site`, `home_hero`, `pillars`, `current_project`, `materias`, `fotos`, `sobre`, `atualizacoes`, `contato`, `footer`, and `newsletter_cta`.
- Use the RESINFOC palette: azul-petróleo as base and coral as the primary accent/CTA color.
- Keep external links in new Spotify and Jornal Comunicação calls-to-action opening in a new tab with `rel="noreferrer"`.
- Retain visible keyboard focus, reduced-motion support, and mobile navigation behavior.
- Avoid adding dependencies; the project currently has no unit-test runner, so verification is production build plus browser smoke tests.

---

### Task 1: Create a resilient RESINFOC brand asset and design tokens

**Files:**
- Create: `frontend/public/resinfoc-logo.png`
- Modify: `frontend/src/styles/theme.css`
- Test: browser visual check of `/` at desktop and 390px widths

**Interfaces:**
- Consumes: `/Users/whoisleo/Downloads/Logo resinfoc (2048 x 1152 px).pdf.pdf`, page 1.
- Produces: `/resinfoc-logo.png` and the CSS variables `--brand-ink`, `--brand-coral`, `--surface`, and `--surface-muted` available to all public components.

- [ ] **Step 1: Produce the logo image from the supplied PDF**

Run:

```bash
mkdir -p tmp/pdfs
pdftoppm -png -singlefile -r 144 -f 1 -l 1 '/Users/whoisleo/Downloads/Logo resinfoc (2048 x 1152 px).pdf.pdf' tmp/pdfs/resinfoc-logo
mkdir -p frontend/public
mv tmp/pdfs/resinfoc-logo.png frontend/public/resinfoc-logo.png
```

Expected: `frontend/public/resinfoc-logo.png` shows the coral RESINFOC lockup and microphone on blue-petróleo.

- [ ] **Step 2: Add the failing visual acceptance checklist before styling**

Record these acceptance checks in the task notes and use them after Step 3:

```text
- The primary header, footer, badges, cards, buttons, and focus ring no longer use REJORC purple/gold/green/blue tokens.
- A coral call-to-action on the azul-petróleo background meets a readable contrast treatment.
- At 390px wide, the logo stays inside the header without horizontal scrolling.
```

Expected before Step 3: the current REJORC palette makes the first check fail.

- [ ] **Step 3: Implement the RESINFOC token layer and responsive primitives**

In `frontend/src/styles/theme.css`, replace the old brand palette with explicit RESINFOC semantic tokens and retarget global text, background, placeholder, focus and article-link styles. Add reusable classes for the blue editorial section, coral pill/badge, and audio-feature card only if those classes remove repeated page styles. Keep the existing `.container`, grid breakpoints and reduced-motion rule intact.

Use this token baseline:

```css
:root {
  --brand-ink: #1f5278;
  --brand-coral: #ff6f61;
  --surface: #fffaf6;
  --surface-muted: #eef4f5;
  --ink: #173143;
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'Nunito Sans', sans-serif;
}
```

Expected: public pages can consistently use `var(--brand-ink)` and `var(--brand-coral)` instead of old project-specific colors.

- [ ] **Step 4: Verify the asset and global style behavior**

Run:

```bash
cd frontend && npm run build
```

Expected: exit code 0 and generated output includes the public logo asset.

Open the home page at desktop and 390px width. Confirm the three acceptance checks from Step 2.

- [ ] **Step 5: Commit the brand foundation**

```bash
git add frontend/public/resinfoc-logo.png frontend/src/styles/theme.css
git commit -m "feat: adiciona identidade visual do RESINFOC"
```

### Task 2: Make default content and seed content RESINFOC-specific

**Files:**
- Modify: `frontend/src/content/defaultContent.js`
- Modify: `backend/src/defaultContent.js`
- Test: manual comparison of both object shapes and fallback rendering with API unavailable

**Interfaces:**
- Consumes: existing `defaultContent` object shapes in the front-end fallback and backend seed.
- Produces: matching RESINFOC defaults that remain editable via the current `/acesso` panel.

- [ ] **Step 1: Write the failing content-contract checklist**

Record the exact required values:

```text
site.siteName = "RESINFOC"
site.tagline = "Rede Sonora de Informação e Ciência"
materias.bannerUrl = "https://jornalcomunicacao.ufpr.br/tag/jornal-comunicacao/"
The home content includes a Spotify URL of "https://open.spotify.com/show/03hof1vNtNXhtwey0UPZYp?si=DovdvEyUQXaGKAewF9ROww&utm_source=copy-link".
All existing top-level content section keys remain present in both files.
```

Expected before Step 2: the current values identify REJORC and contain no Spotify URL.

- [ ] **Step 2: Update both defaults without altering their schema**

Change REJORC naming/copy to RESINFOC naming in both content files. Update the hero to explain the Rede Sonora de Informação e Ciência, revise photo/current-project/contact/newsletter copy to refer to audio, science and the RESINFOC, and set `materias.bannerUrl` to the provided Jornal Comunicação link.

Add a `spotify` object under `home_hero` with these exact fields:

```js
spotify: {
  label: 'Ouça o RESINFOC',
  title: 'Informação e ciência no seu fone',
  text: 'Episódios, entrevistas e conversas para aproximar a ciência do cotidiano.',
  url: 'https://open.spotify.com/show/03hof1vNtNXhtwey0UPZYp?si=DovdvEyUQXaGKAewF9ROww&utm_source=copy-link',
  ctaLabel: 'Ouvir no Spotify ↗',
},
```

Set the front-end fallback `site.logoHeader.url` and `site.logoFooter.url` to `/resinfoc-logo.png`; use the same static URL in the backend seed so a fresh database presents the correct logo.

- [ ] **Step 3: Run the content-contract verification**

Run:

```bash
node --input-type=module -e "import('./frontend/src/content/defaultContent.js').then(({defaultContent}) => { for (const key of ['site','home_hero','pillars','current_project','materias','fotos','sobre','atualizacoes','contato','footer','newsletter_cta']) if (!(key in defaultContent)) throw new Error('missing frontend key: ' + key); if (defaultContent.site.siteName !== 'RESINFOC') throw new Error('wrong frontend brand'); if (!defaultContent.home_hero.spotify?.url.includes('open.spotify.com/show/03hof1vNtNXhtwey0UPZYp')) throw new Error('missing Spotify URL'); })"
node -e "const {defaultContent}=require('./backend/src/defaultContent'); for (const key of ['site','home_hero','pillars','current_project','materias','fotos','sobre','atualizacoes','contato','footer','newsletter_cta']) if (!(key in defaultContent)) throw new Error('missing backend key: '+key); if (defaultContent.site.siteName !== 'RESINFOC') throw new Error('wrong backend brand'); if (defaultContent.materias.bannerUrl !== 'https://jornalcomunicacao.ufpr.br/tag/jornal-comunicacao/') throw new Error('wrong Jornal URL');"
```

Expected: both commands exit with code 0.

- [ ] **Step 4: Confirm fallback behavior manually**

Start only the Vite app with its API unreachable. Open `/`, `/materias`, `/sobre`, `/midias`, `/atualizacoes`, and `/contato`; confirm titles and empty states render from front-end defaults rather than crashing.

- [ ] **Step 5: Commit default content**

```bash
git add frontend/src/content/defaultContent.js backend/src/defaultContent.js
git commit -m "feat: adapta conteudo padrao ao RESINFOC"
```

### Task 3: Recompose shared navigation, home, and external editorial calls

**Files:**
- Modify: `frontend/src/components/Header.jsx`
- Modify: `frontend/src/components/Footer.jsx`
- Modify: `frontend/src/pages/Home.jsx`
- Test: browser navigation/link smoke test

**Interfaces:**
- Consumes: `content.site`, `content.home_hero`, `content.materias`, `content.fotos`, `content.current_project`, `content.footer`, and `content.newsletter_cta`.
- Produces: a RESINFOC home with the Spotify feature and Jornal Comunicação call-to-action, preserving all existing route paths.

- [ ] **Step 1: Write the failing home acceptance checklist**

```text
- Header and footer identify RESINFOC and use the static logo when no managed logo URL exists.
- The home page contains a clearly labeled Spotify section whose link points to the supplied Spotify show.
- The Jornal Comunicação CTA points to the supplied tag URL and has target="_blank" and rel="noreferrer".
- Existing links to /sobre, /materias, /midias, /atualizacoes, and /contato remain functional.
```

Expected before Step 2: the Spotify section is absent and the home Jornal CTA has `href="#"`.

- [ ] **Step 2: Update header and footer brand presentation**

Retain navigation routes but replace generic “Sobre” with “Sobre o RESINFOC” and replace the header newsletter button with “Fale com a gente” linked to `/contato`. Render `/resinfoc-logo.png` as the fallback image, with `alt={site.siteName || 'RESINFOC'}`. Use `var(--brand-ink)` for the footer and `var(--brand-coral)` for its accent labels.

- [ ] **Step 3: Rebuild the home in the approved content order**

Keep all existing dynamic collections and route links, but change section copy/styling to the approved order: RESINFOC hero, explanation/pillars, Spotify feature, featured articles plus Jornal Comunicação CTA, project updates, gallery, and contact CTA.

Render the audio feature only when `hero.spotify?.url` exists:

```jsx
{hero.spotify?.url && (
  <section className="container" style={{ padding: '0 32px 96px' }}>
    <div className="audio-feature">
      <div>
        <span className="coral-pill">{hero.spotify.label}</span>
        <h2>{hero.spotify.title}</h2>
        <p>{hero.spotify.text}</p>
      </div>
      <a href={hero.spotify.url} target="_blank" rel="noreferrer">
        {hero.spotify.ctaLabel}
      </a>
    </div>
  </section>
)}
```

Use `section.bannerUrl` for the home Jornal Comunicação CTA as well; remove the hard-coded `href="#"`.

- [ ] **Step 4: Run the browser smoke test**

Run:

```bash
cd frontend && npm run build
cd frontend && npm run dev -- --host 127.0.0.1
```

Expected: build succeeds and the development server starts. In a browser, test each navigation item, the Spotify link, the Jornal Comunicação link, and the mobile menu at 390px. Confirm external links retain `target="_blank"` and `rel="noreferrer"` in the rendered DOM.

- [ ] **Step 5: Commit the public landing experience**

```bash
git add frontend/src/components/Header.jsx frontend/src/components/Footer.jsx frontend/src/pages/Home.jsx
git commit -m "feat: cria vitrine editorial do RESINFOC"
```

### Task 4: Retheme the remaining public pages without changing behavior

**Files:**
- Modify: `frontend/src/pages/Sobre.jsx`
- Modify: `frontend/src/pages/Materias.jsx`
- Modify: `frontend/src/pages/Fotos.jsx`
- Modify: `frontend/src/pages/Atualizacoes.jsx`
- Modify: `frontend/src/pages/Contato.jsx`
- Test: browser smoke test for content, filters, modal and contact form states

**Interfaces:**
- Consumes: the unchanged content objects and current `api.sendContactMessage`, `MateriaModal`, `MediaBlock`, and `NewsletterForm` interfaces.
- Produces: visual consistency with the RESINFOC tokens while retaining current page interactions.

- [ ] **Step 1: Write the failing interaction checklist**

```text
- Materias category buttons still filter the existing items and cards still open a body modal or an external link as before.
- Contact form keeps required-field validation, disabled sending state, success message and error message behavior.
- Photo and update empty states render when their item arrays are empty.
- No public page retains user-facing REJORC copy or hard-coded old brand colors.
```

Expected before Step 2: old REJORC copy and color literals exist on these pages.

- [ ] **Step 2: Apply semantic tokens and RESINFOC copy to all five pages**

Replace visible REJORC names with RESINFOC-aware labels, use `var(--brand-ink)`, `var(--brand-coral)`, `var(--surface)` and `var(--ink)` in place of old purple/gold/green/blue literals, and use the microphone motif only as a decorative `aria-hidden` element. Do not alter the `CATS` values, API calls, field names, `MediaBlock` props, `MateriaModal` open state or `NewsletterForm` props.

For page media text, change fixed alt and placeholder strings from “equipe do REJORC” / “projeto atual” to generic RESINFOC alternatives, such as `alt="Equipe do RESINFOC"` and `placeholderLabel="[ registro do RESINFOC ]"`.

- [ ] **Step 3: Verify existing behavior after the retheme**

Run:

```bash
cd frontend && npm run build
```

Expected: exit code 0.

In the browser, filter a category on `/materias`; open a body-backed card if one exists; inspect an external-link card if one exists; submit `/contato` once with blank required fields; and confirm `/midias` and `/atualizacoes` display their existing empty states when no API content is available.

- [ ] **Step 4: Verify keyboard and mobile accessibility**

At 390px and desktop widths, tab through every public page. Confirm a visible focus ring on links, buttons, select, inputs and textarea; verify the header has no overflow; and enable reduced-motion in browser emulation to confirm no essential content requires animation.

- [ ] **Step 5: Commit the page retheme**

```bash
git add frontend/src/pages/Sobre.jsx frontend/src/pages/Materias.jsx frontend/src/pages/Fotos.jsx frontend/src/pages/Atualizacoes.jsx frontend/src/pages/Contato.jsx
git commit -m "feat: aplica identidade RESINFOC nas paginas publicas"
```

### Task 5: Perform a final regression pass and document operational notes

**Files:**
- Modify: `README.md`
- Test: production build and public-route smoke test

**Interfaces:**
- Consumes: completed public front-end and current start/build commands.
- Produces: concise documentation that content managers can understand without changes to the admin workflow.

- [ ] **Step 1: Write the final regression checklist**

```text
- The production front-end builds successfully.
- All public routes render: /, /sobre, /materias, /midias, /atualizacoes, /contato, and /newsletter/sair.
- The /fotos redirect still reaches /midias.
- Public content works both from the API and from the front-end fallback.
- No admin route, backend route, database schema, or API response contract changed.
```

- [ ] **Step 2: Add an operational note to the README**

Add a short “RESINFOC branding” section explaining that the site is a front-end white-label of the existing content system, that logo/visual fallback lives at `frontend/public/resinfoc-logo.png`, and that managers can still replace it through the existing content editor. List the Spotify and Jornal Comunicação destinations as configured public integrations.

- [ ] **Step 3: Run final verification**

Run:

```bash
cd frontend && npm run build
```

Expected: exit code 0.

Use the production preview or dev server to visit every route from Step 1. Confirm browser console has no React errors and external CTAs use the expected URLs.

- [ ] **Step 4: Inspect the change set before commit**

Run:

```bash
git diff --check
git status --short
git log --oneline -5
```

Expected: no whitespace errors; status contains only RESINFOC rebrand files intended by this plan.

- [ ] **Step 5: Commit documentation and final verification result**

```bash
git add README.md
git commit -m "docs: registra operacao do site RESINFOC"
```

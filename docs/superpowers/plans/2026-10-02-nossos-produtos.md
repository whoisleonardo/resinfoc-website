# Nossos Produtos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a página editável Nossos Produtos, para reproduzir áudio próprio e conteúdos incorporados do Spotify.

**Architecture:** Uma nova seção `nossos_produtos` é adicionada aos fallbacks do frontend e ao conteúdo padrão do backend, portanto a API existente a entrega e persiste sem endpoint novo. A página pública usa um utilitário puro para transformar e validar URLs do Spotify; o painel usa uma variante restrita do seletor de mídia já existente.

**Tech Stack:** React 18, React Router 6, Vite, Express, SQLite, Node test runner with `tsx` JSX loader.

**Spec:** `docs/superpowers/specs/2026-10-02-nossos-produtos-design.md`

## Global Constraints

- A rota pública é exatamente `/nossos-produtos` e deve constar no cabeçalho.
- O único conteúdo aceito é áudio: `audio` (MP3, M4A, OGG ou WAV) e `spotify`; nenhum tipo de vídeo deve aparecer na nova tela.
- Itens usam `id`, `title`, `description` e `media`.
- A página precisa ter estado vazio, players acessíveis e layout de uma coluna em telas estreitas.
- URLs incompatíveis do Spotify devem exibir orientação no cartão, sem criar iframe.
- Não migrar itens da seção Mídias nem adicionar métricas ou APIs do Spotify.

## Review Focus

- URL curta `spotify.link` ou URL sem identificador deve mostrar orientação, sem iframe nem exceção.
- URLs do Spotify já no formato `/embed/...` devem continuar renderizando o mesmo recurso.
- URL de upload relativa `/uploads/...` deve receber `API_URL` no `audio.src`.
- Um título de produto com caracteres especiais deve ser preservado no rótulo acessível do player e iframe.
- Se a API retornar conteúdo antigo sem `nossos_produtos`, o fallback local deve renderizar a página sem quebrar.

## File Structure

- `frontend/src/utils/spotify.js`: valida e converte URLs públicas do Spotify para URL de embed.
- `frontend/src/components/ProductPlayer.jsx`: escolhe player HTML de áudio, iframe Spotify ou aviso de URL inválida.
- `frontend/src/pages/NossosProdutos.jsx`: composição da página pública e sua grade responsiva.
- `frontend/src/admin/pages/ProdutosAdmin.jsx`: gestão da nova seção no painel.
- `frontend/src/components/MediaPicker.jsx`: permite restringir os tipos exibidos por cada consumidor.
- `frontend/src/{App.jsx,components/Header.jsx,content/defaultContent.js}`: registra rota, navegação e fallback.
- `backend/src/defaultContent.js`: registra a seção no contrato de conteúdo da API.
- `frontend/src/**/*.test.{js,jsx}`: protegem a conversão, escolhas permitidas e renderização de players.

### Task 1: Utilitário Spotify e infraestrutura de teste

**Files:**
- Create: `frontend/src/utils/spotify.js`
- Create: `frontend/src/utils/spotify.test.js`

**Interfaces:**
- Produces: `spotifyEmbedUrl(url: string): string | null` para o player público.

- [ ] **Step 1: Write the failing tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { spotifyEmbedUrl } from './spotify.js';

test('converts a Spotify episode URL to an embed URL', () => {
  assert.equal(
    spotifyEmbedUrl('https://open.spotify.com/episode/4kz4?si=abc'),
    'https://open.spotify.com/embed/episode/4kz4'
  );
});

test('keeps a valid Spotify embed URL canonical', () => {
  assert.equal(
    spotifyEmbedUrl('https://open.spotify.com/embed/show/03hof1vNtNXhtwey0UPZYp'),
    'https://open.spotify.com/embed/show/03hof1vNtNXhtwey0UPZYp'
  );
});

test('rejects a non-Spotify or identifier-less URL', () => {
  assert.equal(spotifyEmbedUrl('https://spotify.link/abc'), null);
  assert.equal(spotifyEmbedUrl('https://example.com/episode/4kz4'), null);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/utils/spotify.test.js`

Expected: FAIL because `spotify.js` does not exist.

- [ ] **Step 3: Write the minimal implementation**

```js
const RESOURCE_TYPES = new Set(['album', 'artist', 'episode', 'playlist', 'show', 'track']);

export function spotifyEmbedUrl(value) {
  try {
    const url = new URL(value);
    if (url.hostname !== 'open.spotify.com') return null;
    const parts = url.pathname.split('/').filter(Boolean);
    const [first, type, id] = parts[0] === 'embed' ? parts : ['embed', ...parts];
    if (first !== 'embed' || !RESOURCE_TYPES.has(type) || !id) return null;
    return `https://open.spotify.com/embed/${type}/${id}`;
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test src/utils/spotify.test.js`

Expected: PASS with 3 passing tests.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/utils/spotify.js frontend/src/utils/spotify.test.js
git commit -m "feat: adiciona conversor de embed Spotify"
```

### Task 2: Modelo de conteúdo e player público

**Files:**
- Create: `frontend/src/components/ProductPlayer.jsx`
- Create: `frontend/src/components/ProductPlayer.test.jsx`
- Modify: `frontend/src/content/defaultContent.js`
- Modify: `backend/src/defaultContent.js`

**Interfaces:**
- Consumes: `spotifyEmbedUrl(url)` de `frontend/src/utils/spotify.js`.
- Produces: `ProductPlayer({ media, title })`, onde `media` tem `{ type: 'audio' | 'spotify', url: string }`.

- [ ] **Step 0: Install the JSX test loader**

Run: `npm install --save-dev tsx`

Expected: `tsx` added to `devDependencies` and `package-lock.json` updated.

- [ ] **Step 1: Write the failing component tests**

Use `react-dom/server` with the `tsx` loader installed in Step 0:

```jsx
import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import ProductPlayer from './ProductPlayer.jsx';

test('renders a labelled native player for uploaded audio', () => {
  const html = renderToStaticMarkup(<ProductPlayer title="Entrevista & ciência" media={{ type: 'audio', url: '/uploads/audio.mp3' }} />);
  assert.match(html, /<audio/);
  assert.match(html, /aria-label="Ouvir Entrevista &amp; ciência"/);
});

test('renders a titled Spotify iframe for a valid URL', () => {
  const html = renderToStaticMarkup(<ProductPlayer title="Episódio 1" media={{ type: 'spotify', url: 'https://open.spotify.com/episode/4kz4' }} />);
  assert.match(html, /open.spotify.com\/embed\/episode\/4kz4/);
  assert.match(html, /title="Ouvir Episódio 1 no Spotify"/);
});

test('explains an invalid Spotify URL instead of rendering an iframe', () => {
  const html = renderToStaticMarkup(<ProductPlayer title="Episódio 1" media={{ type: 'spotify', url: 'https://spotify.link/abc' }} />);
  assert.doesNotMatch(html, /<iframe/);
  assert.match(html, /Link do Spotify inválido/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx tsx --test src/components/ProductPlayer.test.jsx`

Expected: FAIL because `ProductPlayer.jsx` does not exist.

- [ ] **Step 3: Implement the content defaults and component**

Add `nossos_produtos` to both default-content objects with Portuguese fallback copy and `items: []`. Implement the player with the existing `resolveMediaUrl` API helper:

```jsx
if (media?.type === 'audio' && media.url) {
  return <audio controls aria-label={`Ouvir ${title}`} src={resolveMediaUrl(media.url)} style={{ width: '100%' }} />;
}

const embedUrl = media?.type === 'spotify' ? spotifyEmbedUrl(media.url) : null;
if (embedUrl) {
  return <iframe src={embedUrl} title={`Ouvir ${title} no Spotify`} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ border: 0, width: '100%', height: 152 }} />;
}
return <div role="status">Link do Spotify inválido. Atualize o cadastro deste produto.</div>;
```

- [ ] **Step 4: Run component and utility tests**

Run: `npx tsx --test src/utils/spotify.test.js src/components/ProductPlayer.test.jsx`

Expected: PASS with 6 passing tests.

- [ ] **Step 5: Commit**

```bash
git add frontend/package.json frontend/package-lock.json backend/src/defaultContent.js frontend/src/content/defaultContent.js frontend/src/components/ProductPlayer.jsx frontend/src/components/ProductPlayer.test.jsx
git commit -m "feat: adiciona modelo e player de produtos sonoros"
```

### Task 3: Página pública, rota e navegação

**Files:**
- Create: `frontend/src/pages/NossosProdutos.jsx`
- Create: `frontend/src/pages/NossosProdutos.test.jsx`
- Modify: `frontend/src/App.jsx`
- Modify: `frontend/src/components/Header.jsx`

**Interfaces:**
- Consumes: `content.nossos_produtos` com `badge`, `title`, `subtitle`, `items`, `ctaTitle`, `ctaText`, `ctaButtonLabel`; `ProductPlayer` da Task 2.
- Produces: rota pública `/nossos-produtos` e item de navegação `Nossos Produtos`.

- [ ] **Step 1: Extend the failing render test for the empty page state**

```jsx
import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { ContentProvider } from '../content/ContentContext.jsx';
import NossosProdutos from './NossosProdutos.jsx';

test('renders the product archive empty state when no products exist', () => {
  const html = renderToStaticMarkup(
    <ContentProvider><NossosProdutos /></ContentProvider>
  );
  assert.match(html, /Nenhum produto sonoro cadastrado ainda\./);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx tsx --test src/pages/NossosProdutos.test.jsx`

Expected: FAIL because the page module and/or the required text does not exist.

- [ ] **Step 3: Implement the page and register it**

Create `NossosProdutos.jsx` by following the structural spacing of `Fotos.jsx`: render badge, title, subtitle, a `grid-3` of cards with title, optional description and `ProductPlayer`; show the exact empty-state copy from Step 1; preserve the optional dark CTA linking to `/contato`. Add the import and `<Route path="nossos-produtos" element={<NossosProdutos />} />` to `App.jsx`, and `{ to: '/nossos-produtos', label: 'Nossos Produtos' }` immediately after Mídias in `Header.jsx`.

- [ ] **Step 4: Run the page and player test suite**

Run: `npx tsx --test src/components/ProductPlayer.test.jsx src/pages/NossosProdutos.test.jsx`

Expected: PASS.

- [ ] **Step 5: Build the frontend**

Run: `npm run build`

Expected: exit 0 and Vite production bundle output.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/pages/NossosProdutos.jsx frontend/src/pages/NossosProdutos.test.jsx frontend/src/App.jsx frontend/src/components/Header.jsx
git commit -m "feat: cria pagina nossos produtos"
```

### Task 4: Gestão de produtos no painel

**Files:**
- Create: `frontend/src/admin/pages/ProdutosAdmin.jsx`
- Modify: `frontend/src/admin/components/MediaPicker.jsx`
- Modify: `frontend/src/admin/AdminLayout.jsx`
- Modify: `frontend/src/App.jsx`
- Test: `frontend/src/utils/spotify.test.js`

**Interfaces:**
- Consumes: `useSection('nossos_produtos')`, `MediaPicker({ allowedTypes })` e o formato de item da Task 2.
- Produces: rota de painel `/acesso/painel/produtos` e navegação `Nossos Produtos`.

- [ ] **Step 1: Write the failing unit test for restricted media choices**

Extract a pure helper from `MediaPicker.jsx` and test it:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { mediaTypesFor } from './mediaTypes.js';

test('returns only audio and Spotify for products', () => {
  assert.deepEqual(mediaTypesFor(['audio', 'spotify']).map((type) => type.value), ['audio', 'spotify']);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/admin/components/mediaTypes.test.js`

Expected: FAIL because `mediaTypes.js` does not exist.

- [ ] **Step 3: Implement the restricted picker and editor**

Create `mediaTypes.js` with the complete type catalog and filter:

```js
export const MEDIA_TYPES = [
  { value: 'image', label: 'Imagem' },
  { value: 'audio', label: 'Áudio' },
  { value: 'spotify', label: 'Spotify' },
  { value: 'tiktok', label: 'Vídeo do TikTok' },
  { value: 'instagram', label: 'Reels do Instagram' },
];

export function mediaTypesFor(allowedTypes) {
  return allowedTypes ? MEDIA_TYPES.filter((type) => allowedTypes.includes(type.value)) : MEDIA_TYPES;
}
```

Change `MediaPicker` to accept `allowedTypes`, defaulting to all existing types. In `ProdutosAdmin`, create new items as:

```js
{ id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, title: '', description: '', media: { type: 'audio', url: '' } }
```

Render title, description and `MediaPicker` with `allowedTypes={['audio', 'spotify']}`. Register the panel route and sidebar item.

- [ ] **Step 4: Run the media-type and Spotify tests**

Run: `node --test src/admin/components/mediaTypes.test.js src/utils/spotify.test.js`

Expected: PASS.

- [ ] **Step 5: Build the frontend**

Run: `npm run build`

Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/admin/pages/ProdutosAdmin.jsx frontend/src/admin/components/MediaPicker.jsx frontend/src/admin/components/mediaTypes.js frontend/src/admin/components/mediaTypes.test.js frontend/src/admin/AdminLayout.jsx frontend/src/App.jsx
git commit -m "feat: permite gerir nossos produtos no painel"
```

### Task 5: Verificação integrada

**Files:**
- Modify: no production files expected.

**Interfaces:**
- Consumes: toda a funcionalidade das Tasks 1–4.
- Produces: evidência de build e testes completos para entrega.

- [ ] **Step 1: Run all frontend tests**

Run: `npx tsx --test src/utils/spotify.test.js src/components/ProductPlayer.test.jsx src/pages/NossosProdutos.test.jsx src/admin/components/mediaTypes.test.js`

Expected: PASS com todos os testes verdes.

- [ ] **Step 2: Build frontend**

Run: `npm run build`

Expected: exit 0.

- [ ] **Step 3: Inspect changed files and status**

Run: `git diff main...HEAD --check && git status --short`

Expected: nenhuma falha de whitespace; somente artefatos explicitamente esperados ou workspace ignorado.

- [ ] **Step 4: Commit any verification-only documentation if created**

```bash
git status --short
```

Expected: nenhum arquivo de produto não commitado.

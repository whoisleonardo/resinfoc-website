import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import ProductPlayer from './ProductPlayer.jsx';

describe('ProductPlayer', () => {
it('renders a labelled native player for uploaded audio', () => {
  const html = renderToStaticMarkup(<ProductPlayer title="Entrevista & ciência" media={{ type: 'audio', url: '/uploads/audio.mp3' }} />);

  expect(html).toMatch(/<audio/);
  expect(html).toMatch(/aria-label="Ouvir Entrevista &amp; ciência"/);
});

it('renders a titled Spotify iframe for a valid URL', () => {
  const html = renderToStaticMarkup(<ProductPlayer title="Episódio 1" media={{ type: 'spotify', url: 'https://open.spotify.com/episode/4kz4' }} />);

  expect(html).toMatch(/open.spotify.com\/embed\/episode\/4kz4/);
  expect(html).toMatch(/title="Ouvir Episódio 1 no Spotify"/);
});

it('explains an invalid Spotify URL instead of rendering an iframe', () => {
  const html = renderToStaticMarkup(<ProductPlayer title="Episódio 1" media={{ type: 'spotify', url: 'https://spotify.link/abc' }} />);

  expect(html).not.toMatch(/<iframe/);
  expect(html).toMatch(/Link do Spotify inválido/);
});
});

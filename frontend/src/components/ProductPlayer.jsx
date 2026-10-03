import { resolveMediaUrl } from '../api';
import { spotifyEmbedUrl } from '../utils/spotify';

export default function ProductPlayer({ media, title }) {
  if (media?.type === 'audio' && media.url) {
    return <audio controls aria-label={`Ouvir ${title}`} src={resolveMediaUrl(media.url)} style={{ width: '100%' }} />;
  }

  const embedUrl = media?.type === 'spotify' ? spotifyEmbedUrl(media.url) : null;
  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        title={`Ouvir ${title} no Spotify`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ border: 0, width: '100%', height: 152 }}
      />
    );
  }

  return <div role="status" className="empty-state">Link do Spotify inválido. Atualize o cadastro deste produto.</div>;
}

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

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

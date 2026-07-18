import { getStore } from '@netlify/blobs';

const CONTENT_TYPES = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg',
  png: 'image/png', webp: 'image/webp',
  gif: 'image/gif', svg: 'image/svg+xml',
  json: 'application/json',
};

export default async (request) => {
  const url = new URL(request.url);
  const [, prefix, ...rest] = url.pathname.split('/');

  let store, key;
  if (prefix === 'images') {
    store = getStore('images');
    key = rest.join('/');
  } else if (url.pathname === '/catalog.json') {
    store = getStore('data');
    key = 'data.json';
  } else {
    return new Response('Not found', { status: 404 });
  }

  const blob = await store.get(key, { type: 'arrayBuffer' });
  if (!blob) return new Response('Not found', { status: 404 });

  const ext = key.split('.').pop().toLowerCase();
  return new Response(blob, {
    headers: {
      'Content-Type': CONTENT_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
};

export const config = { path: ['/images/*', '/catalog.json'] };

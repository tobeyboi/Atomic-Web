// Shared head-to-head board for /tennis.
// Storage, whichever is connected to the Vercel project (Storage tab):
//   - Vercel Blob  → BLOB_READ_WRITE_TOKEN
//   - Upstash Redis → KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_*)
// Both backends do compare-and-set writes so simultaneous updates aren't lost.

import { get, head, put, BlobAccessError, BlobNotFoundError, BlobPreconditionFailedError } from '@vercel/blob';

const MAX_MATCHES = 5000;

// ---------- Redis (Upstash REST) ----------
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const REDIS_KEY = 'tennis-h2h:default';

async function redis(...cmd) {
  const r = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error || `Redis HTTP ${r.status}`);
  return j.result;
}

const redisStore = {
  async read() {
    const raw = await redis('GET', REDIS_KEY);
    return { raw, version: raw };
  },
  async write(raw, version) {
    const ok = version
      ? await redis('EVAL',
          "if redis.call('GET', KEYS[1]) == ARGV[1] then redis.call('SET', KEYS[1], ARGV[2]) return 1 else return 0 end",
          '1', REDIS_KEY, version, raw)
      : await redis('SET', REDIS_KEY, raw, 'NX');
    return ok === 1 || ok === 'OK';
  },
};

// ---------- Vercel Blob ----------
const BLOB_PATH = 'tennis-h2h/board.json';
// A Blob store is either private or public. The blob URL says which; for a brand-new
// board we find out by trying private first. BLOB_ACCESS can force one.
let blobAccess = process.env.BLOB_ACCESS || null;

async function blobMeta() {
  try { return await head(BLOB_PATH); }
  catch (e) { if (e instanceof BlobNotFoundError) return null; throw e; }
}

const blobStore = {
  async read() {
    const meta = await blobMeta();
    if (!meta) return { raw: null, version: null };
    blobAccess = /[./]private[./]/.test(meta.url) ? 'private' : 'public';
    let raw;
    if (blobAccess === 'private') {
      const r = await get(meta.url, { access: 'private', useCache: false });
      if (!r || r.statusCode !== 200) return { raw: null, version: null };
      raw = await new Response(r.stream).text();
    } else {
      // Public blobs sit behind a CDN; key the URL on the etag so we never read an old copy.
      const r = await fetch(`${meta.url}?v=${encodeURIComponent(meta.etag)}`, { cache: 'no-store' });
      if (!r.ok) throw new Error(`Blob fetch HTTP ${r.status}`);
      raw = await r.text();
    }
    return { raw, version: meta.etag };
  },
  async write(raw, version) {
    const attempt = (access) => put(BLOB_PATH, raw, {
      access,
      contentType: 'application/json',
      addRandomSuffix: false,
      cacheControlMaxAge: 60,
      ...(version ? { ifMatch: version } : { allowOverwrite: false }),
    });
    const first = blobAccess || 'private';
    const other = first === 'private' ? 'public' : 'private';
    try {
      try { await attempt(first); blobAccess = first; }
      catch (e) {
        // Wrong access type for this store: try the other one once.
        if (!(e instanceof BlobAccessError) && !/access|private|public/i.test(String(e?.message))) throw e;
        await attempt(other); blobAccess = other;
      }
      return true;
    } catch (e) {
      // Someone else wrote first (etag changed, or the board was just created).
      if (e instanceof BlobPreconditionFailedError || /precondition|already exists/i.test(String(e?.message))) return false;
      throw e;
    }
  },
};

const store = process.env.BLOB_READ_WRITE_TOKEN ? blobStore
  : REDIS_URL && REDIS_TOKEN ? redisStore
  : null;

// ---------- Board rules ----------
const str = (v, max) => String(v ?? '').slice(0, max);
const cleanMatch = (m) => ({
  id: str(m.id, 40),
  winner: m.winner === 1 ? 1 : 0,
  count: Math.min(99, Math.max(1, parseInt(m.count, 10) || 1)),
  date: /^\d{4}-\d{2}-\d{2}$/.test(m.date) ? m.date : new Date().toISOString().slice(0, 10),
  score: str(m.score, 80),
  note: str(m.note, 200),
});
const cleanPlayer = (p = {}, i) => ({
  name: str(p.name, 60) || `Player ${i + 1}`,
  country: str(p.country, 3) || 'VNM',
  photo: typeof p.photo === 'string' && p.photo.startsWith('data:image/') ? p.photo.slice(0, 200000) : '',
});
const cleanState = (s = {}) => ({
  players: [0, 1].map(i => cleanPlayer((s.players || [])[i], i)),
  matches: (Array.isArray(s.matches) ? s.matches : []).slice(-MAX_MATCHES).map(cleanMatch).filter(m => m.id),
});

function apply(state, op) {
  switch (op && op.t) {
    case 'add':
      if (!state.matches.some(m => m.id === op.match?.id)) state.matches.push(cleanMatch(op.match || {}));
      break;
    case 'del':
      state.matches = state.matches.filter(m => m.id !== op.id);
      break;
    case 'restore':
      for (const m of op.matches || []) if (!state.matches.some(x => x.id === m.id)) state.matches.push(cleanMatch(m));
      break;
    case 'clear':
      state.matches = [];
      break;
    case 'player': {
      const i = op.i === 1 ? 1 : 0;
      state.players[i] = cleanPlayer({ ...state.players[i], ...(op.patch || {}) }, i);
      break;
    }
    case 'replace':
      return cleanState(op.state);
    default:
      throw new Error('Unknown op');
  }
  state.matches = state.matches.slice(-MAX_MATCHES).filter(m => m.id);
  return state;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!store) return res.status(503).json({ error: 'not_configured' });
  try {
    if (req.method === 'GET') {
      const { raw } = await store.read();
      return res.status(200).json({ state: raw ? JSON.parse(raw) : null });
    }
    if (req.method === 'POST') {
      const op = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      // Optimistic concurrency: re-read and retry if someone else wrote in between.
      for (let attempt = 0; attempt < 6; attempt++) {
        const { raw, version } = await store.read();
        const next = apply(raw ? cleanState(JSON.parse(raw)) : cleanState(), op);
        if (await store.write(JSON.stringify(next), version)) return res.status(200).json({ state: next });
        await new Promise(r => setTimeout(r, 80 + Math.random() * 200));
      }
      return res.status(409).json({ error: 'busy' });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: String(e.message || e) });
  }
}

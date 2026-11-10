// Shared head-to-head board for /tennis, stored in Redis (Upstash REST API).
// Connect a Redis database in Vercel (Storage → Upstash Redis); Vercel then sets
// KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL / _TOKEN).

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'tennis-h2h:default';
const MAX_MATCHES = 5000;

async function redis(...cmd) {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error || `Redis HTTP ${r.status}`);
  return j.result;
}

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
  if (!URL_ || !TOKEN) return res.status(503).json({ error: 'not_configured' });
  try {
    if (req.method === 'GET') {
      const raw = await redis('GET', KEY);
      return res.status(200).json({ state: raw ? JSON.parse(raw) : null });
    }
    if (req.method === 'POST') {
      const op = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      // Optimistic concurrency: retry if someone else wrote in between.
      for (let attempt = 0; attempt < 5; attempt++) {
        const raw = await redis('GET', KEY);
        const next = apply(raw ? cleanState(JSON.parse(raw)) : cleanState(), op);
        const nextRaw = JSON.stringify(next);
        const ok = raw
          ? await redis('EVAL',
              "if redis.call('GET', KEYS[1]) == ARGV[1] then redis.call('SET', KEYS[1], ARGV[2]) return 1 else return 0 end",
              '1', KEY, raw, nextRaw)
          : await redis('SET', KEY, nextRaw, 'NX');
        if (ok === 1 || ok === 'OK') return res.status(200).json({ state: next });
      }
      return res.status(409).json({ error: 'busy' });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
}

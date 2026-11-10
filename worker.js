// Cloudflare Worker: ورود اعضا، ثبت لاگ ورودها، و ارسال کد تلگرام برای مدیر (اختیاری)
//
// متغیرهای لازم (Settings > Variables and Secrets):
//   ADMIN_PASS     رمز پنل مدیریت (همان رمز داخل سایت)
//   TEAM_CODE      کد ورود تیم (مثلا EP123mohammad)
//   ALLOWED_ORIGIN آدرس سایتت مثل https://username.github.io (بدون اسلش آخر)
// اتصال KV (Settings > Bindings > KV namespace): نام متغیر را DB بگذار
// فقط برای کد تلگرام مدیر (اختیاری): BOT_TOKEN, CHAT_ID, SECRET

const norm = s => String(s == null ? '' : s).replace(/\s+/g, '').toLowerCase();
function eq(a, b) {
  a = String(a); b = String(b);
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
async function sign(secret, msg) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function getMembers(env) { return (await env.DB.get('members', 'json')) || {}; }
async function addLog(env, kind, name) {
  const ts = Date.now();
  const key = 'log:' + String(9999999999999 - ts).padStart(13, '0') + ':' + Math.random().toString(36).slice(2, 6);
  await env.DB.put(key, '1', { metadata: { n: name, k: kind, t: ts }, expirationTtl: 60 * 60 * 24 * 30 });
}

export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return json({ error: 'method' }, 405);
    const path = new URL(req.url).pathname;
    let b = {};
    try { b = await req.json(); } catch (e) { b = {}; }

    /* ---- ورود اعضا ---- */
    if (path === '/login') {
      const m = (await getMembers(env))[norm(b.code)];
      if (!m || !eq(String(b.team || ''), env.TEAM_CODE || '')) return json({ ok: false });
      await addLog(env, 'login', m.n);
      return json({ ok: true, name: m.n, admin: !!m.a });
    }
    if (path === '/visit') {
      const m = (await getMembers(env))[norm(b.code)];
      if (!m) return json({ ok: false });
      if (b.log) await addLog(env, 'visit', m.n);
      return json({ ok: true, name: m.n, admin: !!m.a });
    }

    /* ---- مدیر ---- */
    if (path.indexOf('/admin/') === 0) {
      if (!eq(String(b.pass || ''), env.ADMIN_PASS || '')) return json({ ok: false, error: 'pass' }, 401);
      if (path === '/admin/check') return json({ ok: true });
      if (path === '/admin/sync') {
        const map = {};
        (Array.isArray(b.members) ? b.members : []).slice(0, 500).forEach(x => {
          const c = norm(x && x.c);
          if (c && c !== '-') map[c] = { n: String(x.n || '').slice(0, 60), a: !!x.a };
        });
        await env.DB.put('members', JSON.stringify(map));
        return json({ ok: true, count: Object.keys(map).length });
      }
      if (path === '/admin/logs') {
        const l = await env.DB.list({ prefix: 'log:', limit: 300 });
        return json({ ok: true, logs: l.keys.map(k => k.metadata).filter(Boolean), members: Object.keys(await getMembers(env)).length });
      }
      if (path === '/admin/clear') {
        const l = await env.DB.list({ prefix: 'log:', limit: 1000 });
        await Promise.all(l.keys.map(k => env.DB.delete(k.name)));
        return json({ ok: true });
      }
      return json({ error: 'not found' }, 404);
    }

    /* ---- کد تلگرام برای ورود مدیر (اختیاری) ---- */
    if (path === '/send') {
      const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 100000000).padStart(8, '0');
      const exp = Date.now() + 5 * 60 * 1000;
      const sig = await sign(env.SECRET, code + '.' + exp);
      const r = await fetch('https://api.telegram.org/bot' + env.BOT_TOKEN + '/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.CHAT_ID, text: '🔐 کد ورود پنل مدیریت EP:\n' + code + '\nاعتبار: ۵ دقیقه' })
      });
      if (!r.ok) return json({ ok: false, error: 'telegram' }, 502);
      return json({ ok: true, exp, sig });
    }
    if (path === '/verify') {
      const code = String(b.code || ''), exp = Number(b.exp), sig = String(b.sig || '');
      if (!/^\d{8}$/.test(code) || !exp || Date.now() > exp) return json({ ok: false });
      return json({ ok: eq(await sign(env.SECRET, code + '.' + exp), sig) });
    }
    return json({ error: 'not found' }, 404);
  }
};

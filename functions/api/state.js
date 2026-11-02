const stateStore = globalThis.__KE_STATE__ || (globalThis.__KE_STATE__ = {
  auth: false,
  subs: [],
  audit: [["Demo Official", "Logged in", "Session", new Date().toISOString().slice(0, 16).replace('T', ' '), "Success"]]
});

async function readFromDb(env) {
  if (!env || !env.DB) return null;

  try {
    const rows = await env.DB.prepare('SELECT payload FROM app_state ORDER BY id DESC LIMIT 1').all();
    if (rows && rows.results && rows.results.length > 0) {
      return JSON.parse(rows.results[0].payload || '{}');
    }
  } catch (error) {
    // ignore DB issues and fall back to memory for local dev
  }

  return null;
}

async function writeToDb(env, payload) {
  if (!env || !env.DB) return false;

  try {
    await env.DB.prepare('INSERT INTO app_state (payload) VALUES (?)').bind(JSON.stringify(payload)).run();
    return true;
  } catch (error) {
    return false;
  }
}

export async function onRequest(context) {
  const { request, env } = context;

  try {
    if (request.method === 'GET') {
      const dbState = await readFromDb(env);
      const responseState = dbState || stateStore;
      return Response.json({ ok: true, state: responseState });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const incoming = body && typeof body === 'object' ? body : {};
      Object.assign(stateStore, incoming);
      await writeToDb(env, stateStore);
      return Response.json({ ok: true, state: stateStore, message: 'State saved' });
    }

    return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
  } catch (error) {
    return Response.json({ ok: false, error: error.message || 'Invalid request' }, { status: 400 });
  }
}

const stateStore = globalThis.__KE_STATE__ || (globalThis.__KE_STATE__ = {
  auth: false,
  subs: [],
  audit: [["Demo Official", "Logged in", "Session", new Date().toISOString().slice(0, 16).replace('T', ' '), "Success"]]
});

export async function onRequest(context) {
  const { request } = context;

  try {
    if (request.method === 'GET') {
      return Response.json({ ok: true, state: stateStore });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const incoming = body && typeof body === 'object' ? body : {};
      Object.assign(stateStore, incoming);
      return Response.json({ ok: true, state: stateStore, message: 'State saved' });
    }

    return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
  } catch (error) {
    return Response.json({ ok: false, error: error.message || 'Invalid request' }, { status: 400 });
  }
}

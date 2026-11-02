export async function onRequest(context) {
  const { request } = context;

  if (request.method === 'GET') {
    return Response.json({
      ok: true,
      service: 'kenyanelections-api',
      status: 'online',
      timestamp: new Date().toISOString()
    });
  }

  return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
}

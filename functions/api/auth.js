export async function onRequest(context) {
  const { request } = context;

  if (request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    return Response.json({
      ok: true,
      message: 'Authentication request accepted',
      payload: body,
      authorized: body.email === 'official@demo.ke' && body.password === 'demo123',
    });
  }

  return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
}

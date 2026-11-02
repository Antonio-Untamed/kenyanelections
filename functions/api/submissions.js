export async function onRequest(context) {
  const { request } = context;

  if (request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    return Response.json({
      ok: true,
      message: 'Submission received',
      submitted: body,
      savedAt: new Date().toISOString(),
    });
  }

  return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
}

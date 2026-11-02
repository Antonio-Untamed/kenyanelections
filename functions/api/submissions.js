export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await request.json().catch(() => ({}));

    if (env && env.DB) {
      await env.DB.prepare('INSERT INTO submissions (payload) VALUES (?)').bind(JSON.stringify(body)).run();
    }

    return Response.json({
      ok: true,
      message: 'Submission received',
      submitted: body,
      savedAt: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({ ok: false, error: error.message || 'Submission failed' }, { status: 400 });
  }
}

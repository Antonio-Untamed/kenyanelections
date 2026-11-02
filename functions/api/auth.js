const demoCredentials = {
  email: 'official@demo.ke',
  password: 'demo123'
};

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await request.json();
    const email = body?.email || '';
    const password = body?.password || '';

    const allowedEmail = env?.ADMIN_EMAIL || demoCredentials.email;
    const allowedPassword = env?.ADMIN_PASSWORD || demoCredentials.password;

    const isValid = email === allowedEmail && password === allowedPassword;

    return Response.json({
      ok: isValid,
      message: isValid ? 'Authentication successful' : 'Invalid credentials',
      user: isValid ? { email, role: 'Election Official' } : null
    }, {
      status: isValid ? 200 : 401
    });
  } catch (error) {
    return Response.json({ ok: false, error: error.message || 'Invalid request' }, { status: 400 });
  }
}

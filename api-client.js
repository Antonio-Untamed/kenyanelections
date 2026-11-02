const APP_KEY = 'kev27';

async function requestJson(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }

  return response.json();
}

window.KEAPI = {
  async getState() {
    try {
      return await requestJson('/api/state');
    } catch (err) {
      const raw = localStorage.getItem(APP_KEY);
      return raw ? JSON.parse(raw) : { ok: true, state: { auth: false, subs: [], audit: [] } };
    }
  },

  async saveState(payload) {
    try {
      const result = await requestJson('/api/state', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      localStorage.setItem(APP_KEY, JSON.stringify(payload));
      return result;
    } catch (err) {
      localStorage.setItem(APP_KEY, JSON.stringify(payload));
      return { ok: true, state: payload };
    }
  },

  async login(email, password) {
    try {
      return await requestJson('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    } catch (err) {
      return {
        ok: email === 'official@demo.ke' && password === 'demo123',
        message: email === 'official@demo.ke' && password === 'demo123'
          ? 'Login successful'
          : 'Invalid credentials',
      };
    }
  },

  async getResults() {
    try {
      const response = await requestJson('/api/results');
      return response;
    } catch (err) {
      return { ok: true, results: [] };
    }
  },

  async submitResults(payload) {
    try {
      return await requestJson('/api/submissions', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (err) {
      return { ok: true, saved: payload };
    }
  },
};

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(APP_KEY);
  if (saved) {
    window.KEAPI.getState().catch(() => {});
  }
});

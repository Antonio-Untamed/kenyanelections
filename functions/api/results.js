const demoResults = [
  {
    id: 1,
    name: 'Nakuru Town East',
    county: 'Nakuru',
    status: 'Verified',
    total: 12430,
    winners: [
      { name: 'Amani Kariuki', party: 'Unity Alliance', votes: 4655 },
      { name: 'Zawadi Otieno', party: 'Progress Party', votes: 3580 },
      { name: 'Hassan Juma', party: 'Civic Front', votes: 2180 },
      { name: 'Neema Chebet', party: 'Green Future', votes: 2015 }
    ]
  },
  {
    id: 2,
    name: 'Nyali',
    county: 'Mombasa',
    status: 'Pending',
    total: 11890,
    winners: [
      { name: 'Amani Kariuki', party: 'Unity Alliance', votes: 4215 },
      { name: 'Zawadi Otieno', party: 'Progress Party', votes: 3395 },
      { name: 'Hassan Juma', party: 'Civic Front', votes: 2280 },
      { name: 'Neema Chebet', party: 'Green Future', votes: 2000 }
    ]
  },
  {
    id: 3,
    name: 'Kisumu Central',
    county: 'Kisumu',
    status: 'Verified',
    total: 13140,
    winners: [
      { name: 'Amani Kariuki', party: 'Unity Alliance', votes: 4820 },
      { name: 'Zawadi Otieno', party: 'Progress Party', votes: 3740 },
      { name: 'Hassan Juma', party: 'Civic Front', votes: 2440 },
      { name: 'Neema Chebet', party: 'Green Future', votes: 2140 }
    ]
  }
];

async function readFromDb(env) {
  if (!env || !env.DB) return null;

  try {
    const rows = await env.DB.prepare('SELECT payload FROM results ORDER BY id DESC').all();
    if (rows && rows.results && rows.results.length > 0) {
      return rows.results.map((row) => JSON.parse(row.payload || '{}'));
    }
  } catch (error) {
    // fallback to static demo results
  }

  return null;
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'GET') {
    return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const dbResults = await readFromDb(env);
    const results = dbResults && dbResults.length ? dbResults : demoResults;

    return Response.json({
      ok: true,
      results,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({ ok: false, error: error.message || 'Failed to load results' }, { status: 500 });
  }
}

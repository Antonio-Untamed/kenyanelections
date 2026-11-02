# Kenya Elections Demo

This project is configured for a production-ready Cloudflare deployment with a static frontend and backend APIs backed by Cloudflare Pages Functions and D1.

## Local development

```bash
npm install
npx wrangler pages dev .
```

## Cloudflare setup

1. Create a D1 database:

```bash
npx wrangler d1 create kenya-elections-db
```

2. Copy the database ID into `wrangler.toml`.
3. Create the schema:

```bash
npx wrangler d1 execute kenya-elections-db --file=./schema.sql
```

4. Add runtime secrets if you want to replace the demo credentials:

```bash
npx wrangler secret put ADMIN_EMAIL
npx wrangler secret put ADMIN_PASSWORD
```

## Deploy

```bash
npm run deploy
```

## API endpoints

- `GET /api/health` — basic health check
- `POST /api/auth` — validate the official login
- `GET /api/results` — read results from D1, or demo data fallback
- `POST /api/submissions` — save a submitted result record
- `GET /api/state` — read saved app state
- `POST /api/state` — persist app state

## Frontend usage

Add this before the application logic:

```html
<script src="/api-client.js"></script>
```

Then call the API via `window.KEAPI`.

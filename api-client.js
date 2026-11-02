# Kenya Elections Demo

This project is set up for a Cloudflare Pages static deployment with a lightweight backend API using Pages Functions.

## Local development

```bash
npm install
npx wrangler pages dev .
```

## Deploy to Cloudflare

```bash
npm run deploy
```

## Backend endpoints

- `GET /api/health` — service health check
- `GET /api/state` — returns the current application state
- `POST /api/state` — stores the current application state

## Frontend hookup

Add this script before the app's main JavaScript in `index.html` to sync localStorage with the backend:

```html
<script src="/api-client.js"></script>
```

The file `api-client.js` is included in the project root and will automatically sync the `kev27` app state to the backend.

For real production persistence, replace the in-memory storage with Cloudflare D1 or KV.

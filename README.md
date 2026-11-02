# Kenya Elections Demo

This project is a Cloudflare Pages app with Pages Functions for backend APIs.

## Run locally

```bash
npm install
npx wrangler pages dev .
```

## Deploy to Cloudflare

1. Push this repo to GitHub.
2. Open Cloudflare Dashboard.
3. Go to Workers & Pages > Create application > Pages.
4. Connect the repository.
5. Set the output directory to the repo root (`.`).
6. Deploy.

## Available APIs

- `GET /api/health` — health check
- `GET /api/state` — read the current app state
- `POST /api/state` — save app state
- `POST /api/auth` — validate official login
- `GET /api/results` — fetch election results data
- `POST /api/submissions` — save a submitted result record

## Frontend integration

Include this script in your HTML before the app logic:

```html
<script src="/api-client.js"></script>
```

Then call the app API through `window.KEAPI`.

# Kenya Elections Demo

This repository contains a single-page static election results dashboard built in plain HTML, CSS, and JavaScript.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by the dev server.

## Deploy to Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare Dashboard, go to Workers & Pages > Create application > Pages.
3. Select the repository and choose the default build settings.
4. For the project output directory, use the repository root (`.`).
5. Deploy.

Alternatively, you can deploy from the terminal:

```bash
npm run deploy
```

This project is designed as a static site and does not require a backend or build step.

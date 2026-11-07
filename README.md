<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Entrepreneur Grenada

Editorial website and content management dashboard.

## Admin dashboard

Open `/admin` on the deployed website to access the admin interface. The dashboard requires the PHP API to be deployed and configured; no demo credentials or local database are included.

Set `VITE_API_BASE_URL` in the Vercel project environment variables to the HTTPS base URL of the PHP API. See [API_SETUP.md](./API_SETUP.md) for the endpoint contract and deployment notes.

## Run locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Set `GEMINI_API_KEY` in `.env.local` if required by any Gemini API feature.
3. Run the app: `npm run dev`

## Build for static hosting

Run `npm install` and `npm run build`. Upload the generated `dist/` directory to your static host's public web root.

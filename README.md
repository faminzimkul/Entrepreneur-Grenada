<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/19004a73-d5af-420e-aa53-cfb4e17e276f

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Set `GEMINI_API_KEY` in `.env.local` if required by any Gemini API feature.
3. Run the app: `npm run dev`

## Build for static hosting

Run `npm install` and `npm run build`. Upload the generated `dist/` directory to your static host's public web root.

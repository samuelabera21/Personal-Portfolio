# Frontend Next (Static Clone)
Live link: https://samuelabera.netlify.app/

#This folder is a static-ready clone of your fullstack frontend UI.

Important:
- No backend is required for public pages.
- Data is served from local static in-memory sources.
- Your original fullstack app in [frontend](../frontend) remains untouched.

## Local Development

From this folder:

```bash
npm install
npm run dev
```

Default local URL:
- `http://localhost:3001`

## Static Data Source

Edit static data in:
- [src/lib/static-data.ts](src/lib/static-data.ts)

API wrappers now use static data in:
- [src/lib/api.ts](src/lib/api.ts)
- [src/lib/server-api.ts](src/lib/server-api.ts)

## Netlify Deployment

Use this folder as the Netlify project root.

Build settings:
- Build command: `npm run build`
- Publish directory: leave empty (Netlify Next.js runtime handles this)

Note: This is a Next.js app (not plain HTML export). Netlify must detect/build it as Next.js.

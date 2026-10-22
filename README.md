# Song Lyrics Finder

A small React app to search song lyrics by artist and song title, powered by the free [lyrics.ovh](https://lyrics.ovh) API.

**Live demo:** https://letras-canciones-snowy.vercel.app

## Features

- Search lyrics by artist and song name
- Loading state and friendly error message when a song is not found
- User input is URL-encoded before calling the API
- No API keys or environment variables required
- Can be embedded in other sites through an `<iframe>`

## Tech stack

- [React 19](https://react.dev)
- [Vite 8](https://vite.dev)
- Native `fetch` (no HTTP client dependency)
- Deployed on [Vercel](https://vercel.com)

## Getting started

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (by default `http://localhost:5173`).

### Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build for production into `dist/`    |
| `npm run preview` | Preview the production build locally |

## Embedding

The deployment allows framing from any origin (`Content-Security-Policy: frame-ancestors *`, set in `vercel.json`), so you can embed it like this:

```html
<iframe
  src="https://letras-canciones-snowy.vercel.app"
  title="Song Lyrics Finder"
  width="100%"
  height="700"
  style="border: 0"
  loading="lazy"
></iframe>
```

## Project structure

```
src/
├── components/    # UI components (form, alert, lyrics)
├── context/       # LetrasProvider: search state and API call
├── hooks/         # useLetras hook to consume the context
├── App.jsx
└── main.jsx
```

## Deployment

The project is configured for Vercel (`vercel.json`). To deploy your own copy:

```bash
npx vercel deploy --prod
```

## License

This project is for learning purposes. Lyrics are provided by lyrics.ovh and belong to their respective owners.

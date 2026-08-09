# Immanuel Church PH

The Immanuel Church PH website is a Next.js app with a routed public site: Home, Blogs, Events, Give, and Live. The homepage keeps the editorial church story and adds a bounded, video-led hero carousel so the design stays composed on very wide screens.

## Preview locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build for Vercel

```bash
npm run build
npm start
```

The `feature/homepage` branch is intended for preview deployments. Keep production on `main` until the homepage is approved.

## Media

Place the future intro video at `public/videos/intro.mp4`. Until it is added, the first carousel slide keeps the church-building poster and displays a friendly fallback. Public images live in `public/assets/`.

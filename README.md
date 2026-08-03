# Immanuel Community — Coming Soon

A responsive one-page launch notice for `immanuelphilippines.church`.

## Add the supplied images

Place the two PNG files in the `assets` folder using these exact names:

- `assets/logo.jpeg`
- `assets/church-building.jpeg`

The page displays clean branded placeholders until those files are added.

## Preview locally

```bash
npm run dev
```

Then open `http://127.0.0.1:3000`.

## Deploy with Vercel

Push these files to the `main` branch of the GitHub repository already connected
to the `immanuel-philippines` Vercel project. Vercel will run `npm run build` and
publish the generated `dist` folder automatically.

After the first production deployment succeeds, add
`immanuelphilippines.church` from the project's **Settings → Domains** page.

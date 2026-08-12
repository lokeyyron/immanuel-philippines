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

## Member authentication (Supabase)

The member page now uses Supabase Auth with cookie-based sessions. The portal route is protected by `middleware.js`; visitors without a valid session are sent back to `/members`. There is deliberately no public sign-up form. A Discipler/admin creates or invites each member from the Supabase dashboard.

### Connect the project

1. Create a Supabase project on the free tier.
2. In **Project Settings → API**, copy the project URL and publishable key (the older `anon` key also works).
3. Copy `.env.example` to `.env.local` and fill in:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```

4. In Supabase **Authentication → URL Configuration**, add these redirect URLs:

   - `http://localhost:3000/auth/callback`
   - the Vercel preview URL followed by `/auth/callback`

5. In **Authentication → Users**, choose **Add user** or **Send invitation** for each member. Do not place a `SUPABASE_SECRET_KEY` in `.env.local` for this front-end; it is reserved for a future server-only admin invite endpoint.

The login form accepts the email address registered by the Discipler and a password. Password reset, roles, group membership, journal permissions, and giving records should be added after the church confirms the member data model. Until the environment variables are added, the UI shows a setup message and cannot authenticate anyone.

## Media

Place the future intro video at `public/videos/intro.mp4`. Until it is added, the first carousel slide keeps the church-building poster and displays a friendly fallback. Public images live in `public/assets/`.

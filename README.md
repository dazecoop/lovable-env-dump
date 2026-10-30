# Lovable Env Dump

Drop two files into any [Lovable](https://lovable.dev) Cloud project to dump every Supabase environment variable the server can see — including the service-role key that isn't visible in the Lovable dashboard.

> [!CAUTION]
> The service-role key bypasses Row Level Security. Copy what you need, then **revert the commit and push immediately** so the route is never left in a deployed app.

## Usage

1. Clone your Lovable project
2. Copy the two files in:
   ```sh
   cp src/lib/env-dump.functions.ts  <project>/src/lib/
   cp src/routes/env-dump.tsx        <project>/src/routes/
   ```
3. Commit and push
4. Sign in to the app, then visit `/env-dump`
5. Copy what you need
6. Revert the commit and push again

The route requires the user to be signed in — it reuses the project's existing `requireSupabaseAuth` middleware, so unauthenticated visitors get nothing.

## How it works

`env-dump.functions.ts` is a TanStack Start server function that reads `process.env`, filters for keys matching `/supabase/i`, and returns them sorted. The auth middleware runs first, so the function only executes for signed-in users.

`env-dump.tsx` is a file-based route at `/env-dump` that calls the server function on mount and renders the key-value pairs as plain text.

## Project structure

```
src/lib/env-dump.functions.ts   Server function — reads and returns Supabase env vars
src/routes/env-dump.tsx         Route — renders the vars at /env-dump
```

## Why

Lovable's dashboard exposes the Supabase URL and anon key but not the service-role key. If you need it (to run migrations, seed data, or call the Management API outside Lovable), this is the quickest way to grab it.

## Licence

MIT. See [LICENSE](LICENSE).

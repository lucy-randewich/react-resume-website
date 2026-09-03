# Supabase setup

1. Create a free Supabase project.
2. Apply the migrations in `migrations/`.
3. Copy `.env.example` to `.env.local`.
4. In **Project Settings → API**, copy the project URL and publishable key into
   `.env.local`.
5. Restart the Vite development server.

When new migrations are added, apply them with:

```sh
npx supabase db push --dry-run
npx supabase db push
```

Deploy the protected leaderboard submission function with:

```sh
npx supabase functions deploy shrimp-score
```

The function receives Supabase's service-role key from the hosted function
environment. Never copy that key into the frontend or a `VITE_` variable.

The publishable key is intended for frontend use. Never put a Supabase secret
or service-role key in a `VITE_` environment variable.

# Next.js + Sass Template (Next.js 16, Prisma 7, Postgres, Better Auth)

A starter template for building a modern Next.js (v16) app with **ShadcnUI styling**, **Prisma (v7) + PostgreSQL**, and **Better Auth** for authentication.

## Features

- **Next.js 16** app structure (App Router)
- **Prisma 7** ORM with **PostgreSQL**
- **Better Auth** integration (sessions, providers, callbacks)
- Environment-based configuration via `.env`

## Tech Stack

- **Framework:** Next.js 16
- **Styling:** Tailwindcss
- **Database:** PostgreSQL
- **ORM:** Prisma 7
- **Auth:** Better Auth

## Requirements

- **Node.js** (LTS recommended)
- **PostgreSQL** (local or hosted)
- A package manager: `pnpm` / `npm` / `yarn` (examples use `pnpm`)

## Getting Started

### 1) Install dependencies

```bash
bun install
```

### 2) Configure environment variables

Create a `.env` file (or copy from `.env.example` if present):

```bash
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"

# Better Auth (example placeholders — adjust to your config)
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="replace-with-a-long-random-secret"

# If you use OAuth providers, add them here (examples)
# GITHUB_CLIENT_ID=""
# GITHUB_CLIENT_SECRET=""
```

### 3) Set up the database

Run migrations and generate the Prisma client:

```bash
bun prisma generate
bun prisma migrate dev
```

(Optional) Open Prisma Studio:

```bash
bun prisma studio
```

### 4) Run the app

```bash
bun dev
```

Then open: http://localhost:3000

## Prisma Notes

- Update your Prisma schema in `prisma/schema.prisma`.
- Apply schema changes with:

```bash
bun prisma migrate dev
```

- For production environments you typically run:

```bash
bun prisma migrate deploy
```

## Better Auth Notes

This template is intended to be wired to Better Auth for authentication. You will typically:

- Configure Better Auth using environment variables (base URL + secret)
- Add providers (e.g., GitHub, Google) via env vars
- Mount/implement auth routes and session handling according to Better Auth docs

If you don’t plan to use OAuth providers, you can keep provider env vars unset.


## Deployment

- Ensure `DATABASE_URL` points to your hosted Postgres instance.
- Set `BETTER_AUTH_URL` to your deployed site URL.
- Set a strong `BETTER_AUTH_SECRET`.
- Run Prisma migrations in your deploy pipeline:

```bash
bun prisma migrate deploy
```
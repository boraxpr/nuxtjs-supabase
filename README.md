# Prerequisites

1. .env file with SUPABASE_URL and SUPABASE_KEY

2. NPM package manager and NodeJS (Please refer to <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>)

3. Install the dependencies

```bash
npm install
```

4. Get Database Schemas from Supabase

```bash
npm run update-types
```

5. Run

```bash
npm run dev
```

# About

## Overview

The project uses Front-End [NuxtJS](https://nuxt.com/docs/getting-started/introduction), Back-End [Supabase](https://supabase.com/). Additional Back-end features are expected to be implemented as Serverless Functions (/server/api).

## User Interface

- UI Component libraries : [Primevue](https://primevue.org/) and [Flowbite](https://flowbite.com/docs/getting-started/introduction/)
- UI theme is configured manually by extending and customizing Primevue provided theme.
- Primevue styled mode.
- TailwindCSS installed and used.
- CSS Layer Order : Tailwind base, primevue, Tailwind utility
  - This allows tailwind utility classes to overwrite primevue stylings on customizations.

## Authentication

- By using Supabase, Authentication is done automatically via Supabase JavaScript Client. All Authentication processes are done in server-side within Supabase, ensuring robust security measures are in place.

## Database Connection

- By using Supabase, Database connection is done with ease by connecting through Supabase JavaScript Client. It's simple and effective to select,insert,delete,update the data.
- Moreover, future extensibility is well-supported and flexible through the underlying technology Supabase used _i.e. PostgREST an open-source web server that auto-generates a RESTFUL API from a PostgreSQL database. Even in the scenarios without Supabase supported client, Supabase also provides direct PostgREST API endpoints. _

## PostgREST
- [PostgREST](https://postgrest.org/en/stable/references/api/tables_views.html#operators) provides extensive filtering capabilities allowing customized and specific data query from PostgreSQL database through generated RESTful API. 

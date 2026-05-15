# Project Guidelines

## Code Style

- Use TypeScript and React with the existing `@/*` path alias.
- Prefer functional components, explicit props types, and the current import style used in the root route file and shared layout component.
- Keep formatting aligned with the repo defaults: Prettier and ESLint are the source of truth, with `@typescript-eslint/no-unused-vars` disabled and `react-hooks` rules enabled.
- Use the shadcn/ui component structure already present in the UI primitives and the site-level composition pattern in the shared site components.
- Keep styling consistent with the main stylesheet; prefer shared tokens, Tailwind utilities, and CSS variables over ad hoc one-off styles.

## Architecture

- This is a TanStack Start app with file-based routing and a generated route tree.
- Global app shell and document setup live in the root route; shared layout lives in the site layout component.
- Route-specific UI should stay in the route file or in small feature components under the site component area; reusable primitives belong in the UI primitives area.
- Server entry and SSR wiring live in the server entry and worker config, so keep Cloudflare Worker assumptions in mind when changing server code.
- Avoid introducing new architectural patterns unless the existing route/component split cannot support the change.

## Build and Test

- Install dependencies with Bun, using the existing lockfile.
- Use `bun run dev` for local development, `bun run build` for production validation, `bun run build:dev` for development-mode builds, `bun run lint` for linting, and `bun run format` for formatting.
- Agents should run lint and a production build after meaningful changes when the change affects app behavior or shared infrastructure.

## Conventions

- Keep route filenames aligned with the file-based routing model and the existing route set.
- Use the `*.server.ts` suffix for server-only modules; do not use the Next.js `server-only` package.
- Preserve the current component organization: feature sections in the site component area, primitives in the UI primitives area.
- Do not duplicate repository documentation inside this file; if docs are added later, link to them instead of copying them here.
- When updating styles, preserve the existing visual language rather than introducing a new theme by default.

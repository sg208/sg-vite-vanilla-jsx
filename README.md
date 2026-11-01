# Form picker

A date range form with a calendar written from scratch in plain JavaScript, using JSX without a framework.

Live: https://sg-vite-vanilla-jsx.engg.app

## Stack

- Vite 8 (https://vite.dev/)
- JSX through start-dom-jsx (https://www.npmjs.com/package/start-dom-jsx), which turns JSX into real DOM nodes
- unplugin-auto-import (https://github.com/antfu/unplugin-auto-import)
- Tailwind CSS 4 (https://tailwindcss.com/) and SCSS (https://sass-lang.com/)
- FontAwesome (https://fontawesome.com/), bundled with the build
- Vitest with jsdom (https://vitest.dev/)

The site has four pages: the form at `/`, plus `/accessibility`, `/privacy` and `/terms`. There is no router. The host serves `index.html` for every path and `src/index.js` picks the page from the URL.

## Requirements

```
Node 24 (see .node-version)
pnpm 10 (see packageManager in package.json)
```

## Run locally

```
pnpm install
pnpm dev
```

That starts Vite on localhost:3000 without the sample API.

To run with the sample API, install json-server and concurrently globally once, then use `dev2`. It serves `jsonserver/db.json` on port 8080 next to Vite.

```
pnpm add -g json-server@0.17.4 concurrently
pnpm dev2
```

## Test and check

```
pnpm test
pnpm lint
pnpm format:check
```

## Build

```
pnpm build
pnpm prod
```

`pnpm build` writes the site to `dist/`. Production builds have no json-server, so the build also writes the items from `jsonserver/db.json` to `dist/api/items.json` and the app fetches that file. `pnpm prod` builds and then previews the result on localhost:8000.

## Deploy

The site runs as a Cloudflare Worker with static assets, configured in `wrangler.jsonc`.

```
pnpm run deploy
```

This builds and runs `wrangler deploy`. You need `wrangler` 4 installed globally and `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` set in the environment. Use `pnpm run deploy`, not `pnpm deploy`, which is a built-in pnpm workspace command.

## License

MIT. See [LICENSE](LICENSE).

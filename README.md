# Form picker

This is a simple form picker with inhouse built datepicker.

## Demo

Demo is hosted as a Cloudflare Worker (static assets) on the sg208 account: https://sg-vite-vanilla-jsx.engg.app

`wrangler.jsonc` holds the config. `pnpm run deploy` builds and runs `wrangler deploy` (plain `pnpm deploy` is pnpm's built-in workspace command); it needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment.

Production builds emit the items in `jsonserver/db.json` as `dist/api/items.json`, and the app fetches that file in production. Locally, `pnpm dev2` still uses json-server on port 8080.

## Node / pnpm version

```
Node 24 (see .node-version)
pnpm 10 (see packageManager in package.json)
```

## Goodies

1. Vanilla JS
2. Vite 8 (https://vite.dev/)
3. JSX (https://www.npmjs.com/package/start-dom-jsx)
4. Unplugin auto import (https://github.com/antfu/unplugin-auto-import)
5. Tailwind CSS 4 (https://tailwindcss.com/)
6. FontAwesome (https://fontawesome.com/)
7. SCSS (https://sass-lang.com/)
8. Vitest + jsdom tests (https://vitest.dev/)

## Installation

Install packages

```
pnpm install
```

Install **jsonserver** globallay in your machine, skip if already installed

```
pnpm add -g json-server@0.17.4
```

Install **concurrently** globallay in your machine, skip if already installed

```
pnpm add -g concurrently
```

## Running locally

Run locally WITHOUT jsonserver > localhost:3000

```
pnpm dev
```

Run locally WITH jsonserver > localhost:3000

```
pnpm dev2
```

Generate files for production

```
pnpm build
```

Generate files for production and run preview from generated files > localhost:8000

```
pnpm prod
```

## Checks

Run the tests, lint and format check

```
pnpm test
pnpm lint
pnpm format:check
```

## License

MIT. See [LICENSE](LICENSE).

# Form picker

This is a simple form picker with inhouse built datepicker.

## Demo

Demo is hosted on Cloudflare Pages: https://sg-vite-vanilla-jsx.engg.me/

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

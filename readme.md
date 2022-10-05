# Form picker

This is a simple form picker with inhouse built datepicker.

## Node / NPM Version

```
Node v16.15.0
NPM 8.5.5
```

## Stacks

1. Vanilla JS
2. Vite V3 (https://vitejs.dev/)
3. JSX (https://www.npmjs.com/package/start-dom-jsx)
4. Unplugin auto import (https://github.com/antfu/unplugin-auto-import)
5. Tailwind CSS (https://tailwindcss.com/)

## Installation

Install packages

```
npm install
```

Install **jsonserver** globallay in your machine, skip if already installed

```
npm install -g json-server
```

Install **concurrently** globallay in your machine, skip if already installed

```
npm install -g npm install -g concurrently
```

## Running locally

Run locally WITHOUT jsonserver > localhost:3000

```
npm run dev
```
Run locally WITH jsonserver > localhost:3000

```
npm run dev2
```
Generate files for production

```
npm run build
```
Generate files for production and run preview from generated files  > localhost:8000

```
npm run prod
```

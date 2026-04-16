# Form Picker

A vanilla JavaScript form picker with a custom-built datepicker. Built with modern tooling and zero external UI frameworks.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **Vite** | 8.0.8 | Build tool (OXC transformer, Rolldown bundler) |
| **Vanilla JS + JSX** | start-dom-jsx | Custom JSX factory without React |
| **Tailwind CSS** | 4.2.2 | CSS-first utility styling |
| **FontAwesome** | 7.2.0 | Icon library (SCSS) |
| **ESLint** | 10.2.0 | Code quality |
| **Prettier** | 3.8.3 | Code formatting |

**Node:** v22.11.0+ | **npm:** 10.x+

## Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev           # Vite dev server (localhost:3000)
npm run dev2          # Vite + json-server mock API (localhost:3000 + 8080)

# Production
npm run build         # Build for production
npm run preview       # Preview build (localhost:8000)
npm run prod          # Build + preview

# Code quality
npm run lint          # Check code style
npm run format        # Check formatting
npm run fix           # Auto-fix lint + format issues
```

## Project Structure

```
src/
├── index.js           # Entry point, mounts Index page
├── style.css          # Global styles (Tailwind imports)
├── core/              # Utility functions (el, ref, html, etc)
├── hooks/             # Custom hooks (Form, Date, Data management)
├── components/        # UI components (Header, Footer, Content, etc)
├── pages/             # Page components (Index page)
└── styles/            # Component-specific styles

vite.config.js         # Vite + OXC JSX config
eslint.config.js       # ESLint flat config
postcss.config.cjs     # PostCSS + Tailwind v4
tailwind.config.cjs    # Tailwind content + theme
prettier.config.js     # Prettier + plugin config
```

## Key Features

- **Vanilla JS** - No framework dependencies
- **Custom JSX** - Uses `start-dom-jsx` factory (`h`, `Fragment`)
- **Auto-imports** - Functions automatically available (via unplugin-auto-import)
- **Reactive refs** - Simple state management (`ref` hook)
- **CSS-first** - Tailwind v4 with CSS-first approach
- **Date picker** - Custom-built datepicker component

## Demo

Live: https://sg-vite-vanilla-jsx.engg.me/

## Notes

- Auto-imported globals: `h`, `Fragment`, `el`, `ref`, `html`, `nextTick`, `scrollBottom`, `classList`, `jsx`
- JSX uses classic transform (not React automatic)
- All styling via Tailwind utilities + FontAwesome icons

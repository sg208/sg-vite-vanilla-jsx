# Design

## Architecture

- `index.html` → `src/index.js` → page picked from `location.pathname` (`src/index.js:17-28`) → appended to `#app`. Unknown paths → form page. WHY: no framework; JSX compiles to real DOM nodes via `start-dom-jsx` `h` (`vite.config.js`, oxc classic pragma, `development: false` so no `__self`/`__source` attributes land in the DOM).
- Components = functions returning DOM elements; state = `ref()` objects (`src/core/index.js`) held inside hooks.
- Pages: `/` form (`pages/Index.jsx`) · `/accessibility` · `/privacy` · `/terms`; legal pages share `components/LegalPage` (header, back link, footer). <!-- enggflo -->
- Footer (`components/Footer/index.jsx`) links the three legal pages (`aria-current="page"` on the active one) + the GitHub repo. Anchors built by `components/Link`. WHY: `start-dom-jsx` treats `<a>` as SVG. <!-- enggflo -->
- Hooks + core helpers are globals through `unplugin-auto-import` (`vite.config.js`). WHY: keeps component files import-free.

## Data flow

- `useData` fetches items: dev → json-server `localhost:8080`; prod → `/api/items.json`, emitted at build from `jsonserver/db.json` (`src/hooks/Data.js:3-5`, `vite.config.js:8-21`). WHY: the Worker serves static assets only, no API.
- `FormInputText` owns the label, input, hint, error and the trigger button; it creates a `DatePicker` controller (`{ element, open, close, isOpen }`).
- `DatePicker` follows the WAI-ARIA APG date picker dialog pattern: `role="dialog"` labelled by the month heading, a `role="grid"` table with roving `tabindex`, `aria-selected` on the picked day and `aria-current="date"` on today. Grid keys live in `src/components/DatePicker/keys.js`; rows are rendered by `Weeks.jsx`.
- Picking a date writes the date as dd-mm-yyyy into the input, fires an `input` event, closes the dialog and returns focus to the trigger.
- `useForm.validateForms` sets `aria-invalid`, fills the field's error text (tied with `aria-describedby`), focuses the first invalid field and announces the errors in `#arialive-assertive`. A valid range is summarised in `#form-status` and announced politely.

## Hosting <!-- enggflo -->

- Cloudflare Worker with static assets at https://sg-vite-vanilla-jsx.engg.app (`wrangler.jsonc`): `assets.directory` = `dist`, `not_found_handling` = `single-page-application`, custom domain route, `workers_dev` + `preview_urls` off.
- Deploy = `pnpm run deploy` (build + `wrangler deploy`). WHY: SPA fallback serves `index.html` for every path → client-side page pick, no router.
- Vercel · Netlify · Railway · Cloudflare Pages · engg.me retired.

## Look

- Tokens in `src/style.css` (`:root`, dark values under `prefers-color-scheme: dark`). Ink chrome on a blue-grey ground; the one hue (`--accent`) marks the picked date and the range band between start and end.
- Geist as the only face, tabular figures on dates. The open calendar is the only surface with a shadow.

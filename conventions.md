# Conventions

- SCOPE: patterns the repo follows that ESLint (`eslint.config.js`) + Prettier (`.prettierrc`) do not enforce. Formatting → `pnpm format`.

## Naming

- Components → `src/components/<PascalName>/index.jsx`, default export; component-local CSS/helpers beside it (`DatePicker/keys.js`, `DatePicker/Weeks.jsx`).
- Pages → `src/pages/<PascalName>.jsx`, default export, one per route in `src/index.js:17-25`.
- Hooks → `src/hooks/<Name>.js` exporting `use<Name>` as named arrow function (`src/hooks/Data.js:1`).
- Booleans → `is`/`has` prefix (`isFetching` `src/hooks/Data.js:8`, `hasError` `src/hooks/Form.js:30`, `isCurrent` `src/components/Footer/index.jsx:24`).
- Tests → `tests/<area>.test.js`.

## Code

- Arrow functions + `const`; `async`/`await`, no `.then()` (`src/hooks/Data.js:10-14`).
- New auto-imported export under `src/` → add name to `autoImportGlobals` (`eslint.config.js:5-20`).
- Links → `components/Link`, NEVER raw `<a>` in JSX. WHY: `start-dom-jsx` builds `<a>` as SVG (`src/components/Link/index.jsx:1-2`).

## Errors

- Form errors → `aria-invalid` + field error text via `aria-describedby` + `#arialive-assertive` announcement (`src/hooks/Form.js`). No `console.log`.

## Git

- Conventional commit subjects (`feat` `fix` `chore` `docs` `style` `test`, optional scope) since 2026-10-31 (`git log`).
- Work on `develop` or `<type>/<slug>` off `develop`; merge into `develop`; `main` via release only.

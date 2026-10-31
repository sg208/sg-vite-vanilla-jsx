# Design

## Architecture

- `index.html` → `src/index.js` → `pages/Index.jsx` appended to `#app`. WHY: no framework; JSX compiles to real DOM nodes via `start-dom-jsx` `h` (`vite.config.js:36-42`, oxc classic pragma).
- Components = functions returning DOM elements; state = `ref()` objects (`src/core/index.js:46`) held inside hooks.
- Hooks + core helpers are globals through `unplugin-auto-import` (`vite.config.js:15-26`). WHY: keeps component files import-free.

## Data flow

- `useData` fetches items from json-server (`src/hooks/Data.js:2`).
- `FormInputText` toggles its `DatePicker`; date click writes `dateShort` into the input (`src/components/DatePicker/index.jsx:29`).
- `useForm.validateForms` marks empty fields with `!border-red-500` (`src/hooks/Form.js`).

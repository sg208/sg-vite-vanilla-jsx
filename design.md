# Design

## Architecture

- `index.html` → `src/index.js` → `pages/Index.jsx` appended to `#app`. WHY: no framework; JSX compiles to real DOM nodes via `start-dom-jsx` `h` (`vite.config.js`, oxc classic pragma, `development: false` so no `__self`/`__source` attributes land in the DOM).
- Components = functions returning DOM elements; state = `ref()` objects (`src/core/index.js`) held inside hooks.
- Hooks + core helpers are globals through `unplugin-auto-import` (`vite.config.js`). WHY: keeps component files import-free.

## Data flow

- `useData` fetches items from json-server (`src/hooks/Data.js`).
- `FormInputText` owns the label, input, hint, error and the trigger button; it creates a `DatePicker` controller (`{ element, open, close, isOpen }`).
- `DatePicker` follows the WAI-ARIA APG date picker dialog pattern: `role="dialog"` labelled by the month heading, a `role="grid"` table with roving `tabindex`, `aria-selected` on the picked day and `aria-current="date"` on today. Grid keys live in `src/components/DatePicker/keys.js`; rows are rendered by `Weeks.jsx`.
- Picking a date writes the nl-NL short date into the input, fires an `input` event, closes the dialog and returns focus to the trigger.
- `useForm.validateForms` sets `aria-invalid`, fills the field's error text (tied with `aria-describedby`), focuses the first invalid field and announces the errors in `#arialive-assertive`. A valid range is summarised in `#form-status` and announced politely.

## Look

- Tokens in `src/style.css` (`:root`, dark values under `prefers-color-scheme: dark`). Ink chrome on a blue-grey ground; the one hue (`--accent`) marks the picked date and the range band between start and end.
- Geist as the only face, tabular figures on dates. The open calendar is the only surface with a shadow.

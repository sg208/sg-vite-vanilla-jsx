# Form Picker - Developer Guide

## Quick Reference

### npm Scripts
```
dev           Vite dev server :3000
build         Production build to dist/
lint          Check ESLint violations
format        Check Prettier formatting
fix           Auto-fix lint + format
```

### Auto-imported Globals
Functions available in all files without imports (from `src/core/index.js`):
- `el(selector)` → DOM query (returns single or all elements)
- `ref(value)` → Reactive object `{value: ...}`
- `html(string)` → Create DOM from HTML string
- `jsx(selector, component)` → Replace element with component
- `nextTick(callback)` → Async callback (100ms delay)
- `scrollBottom(element, isBlockEnd)` → Smooth scroll
- `classList({target, classes, method})` → Bulk class operations

JSX factory (from `start-dom-jsx`):
- `h(tag, props, ...children)` → Create elements
- `Fragment` → Render multiple roots

---

## File Map

### Entry & Config
| File | Purpose |
|------|---------|
| `index.html` | HTML template, loads `src/index.js` |
| `src/index.js` | App entry point, mounts Index page to #app |
| `vite.config.js` | Vite build, OXC JSX config, unplugin-auto-import |
| `postcss.config.cjs` | @tailwindcss/postcss setup |
| `tailwind.config.cjs` | Tailwind content scanning |
| `eslint.config.js` | ESLint flat config (no-extra-parens + globals) |
| `prettier.config.js` | Prettier + tailwindcss plugin |

### Source Code Structure
```
src/
├── index.js                  Entry point (sets up IIFE, mounts Index)
├── style.css                 Global Tailwind imports
│
├── core/index.js             ⭐ CORE UTILITIES
│   └─ el, ref, html, jsx, nextTick, scrollBottom, classList
│
├── hooks/                    Custom hooks (state/data)
│   ├── Form.js              Form state management
│   ├── Date.js              Date picker logic
│   └── Data.js              External data fetching
│
├── components/              UI Components
│   ├── Header/              Top navigation
│   ├── Footer/              Bottom bar
│   ├── Main/                Main content area
│   ├── Content/             Form content
│   ├── SideBar/             Sidebar
│   ├── FormInputText/       Text input field
│   ├── DatePicker/          Date picker UI
│   ├── Modal/               Modal wrapper
│   └── Icon/                FontAwesome icon helper
│
└── pages/
    └── Index.jsx            Main page (composes all components)
```

### Component Entry Points
Each component is in its own directory with `index.jsx`:
- `components/Header/index.jsx` → `import Header from './components/Header'`
- `components/DatePicker/index.jsx` → auto-resolved

---

## Key Implementation Details

### JSX Transform (OXC/Vite 8)
```js
// vite.config.js oxc setting
oxc: {
  jsx: {
    runtime: 'classic',    // Not React automatic
    pragma: 'h',           // Custom JSX factory
    pragmaFrag: 'Fragment' // Fragment support
  }
}
```
Result: `<Component/>` → `h(Component, null)` (not `React.createElement`)

### Auto-imports Setup
```js
// vite.config.js
AutoImport({
  dirs: ['./src/**'],              // Scan src/ for exports
  imports: [{
    'start-dom-jsx': ['h', 'Fragment']  // Explicit package imports
  }]
})
```
Effect: 
- `src/core/index.js` exports auto-imported → `el`, `ref`, etc available everywhere
- `start-dom-jsx` imports auto-injected → `h`, `Fragment` available everywhere

### Tailwind CSS v4
```css
/* src/style.css */
@import 'tailwindcss';
```
- CSS-first approach (no @tailwind directives)
- Autoprefixer built-in
- Content auto-detected from `tailwind.config.cjs`

### State Management Pattern
```js
// Using ref for reactive state
const formState = ref({
  name: '',
  email: ''
})

// Update in hooks/events
formState.value.name = 'John'
```
Simple two-way binding without framework overhead.

---

## Development Workflow

### Adding a New Component
1. Create `src/components/MyComponent/index.jsx`
2. Export default component function
3. Use auto-imported globals + JSX
4. Import in parent or page

Example:
```jsx
// src/components/MyComponent/index.jsx
export default function MyComponent(props) {
  return h('div', { class: 'p-4' }, 
    h('h1', null, 'Hello'),
    h('p', null, props.message)
  )
}

// Usage anywhere - auto-imported:
// h(MyComponent, { message: 'World' })
```

### Adding a New Hook
1. Create `src/hooks/MyHook.js`
2. Export default function or named export
3. Manages state with `ref()` if needed
4. Return state/functions

Example:
```js
// src/hooks/MyHook.js
export default function useMyHook() {
  const data = ref(null)
  
  const fetch = async () => {
    data.value = await api.get('...')
  }
  
  return { data, fetch }
}
```

### Styling Components
- Use Tailwind utilities directly: `class="p-4 bg-white rounded"`
- Optional: CSS modules for scoped styles
- Global styles in `src/style.css`
- SCSS available for complex styles

---

## Build Info

### Vite 8 (Rolldown + OXC)
- **Dev mode:** ESM hot module reload
- **Prod build:** Rolldown bundler + OXC transformer
- Output: Single `dist/index.js` (via rollupOptions.output.entryFileNames)
- CSS: Inlined or extracted based on config

### Size Metrics
Latest build:
- JS: ~10KB gzipped
- CSS: ~27KB gzipped (includes FontAwesome fonts)
- Total: < 50KB gzipped

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| ESLint "undefined variable" | Add to eslint.config.js globals |
| Tailwind classes not working | Check `tailwind.config.cjs` content paths |
| JSX not transforming | Verify `vite.config.js` oxc config has `runtime: 'classic'` |
| Auto-import not working | Ensure unplugin-auto-import is in vite plugins |
| SCSS import errors | Check FontAwesome paths in `src/index.js` |

---

## Performance Notes

- No runtime framework → faster execution
- Tree-shaking via Vite/Rolldown
- CSS utilities only loaded (Tailwind)
- Custom datepicker avoids date library dependency
- Refs for state avoid virtual DOM overhead

---

## Dependencies Summary

| Category | Packages |
|----------|----------|
| **Build** | vite, postcss |
| **Framework** | start-dom-jsx |
| **Styling** | tailwindcss, @tailwindcss/postcss, sass |
| **Icons** | @fortawesome/fontawesome-free |
| **Dev Tools** | eslint, @eslint/js, globals, prettier, prettier-plugin-tailwindcss |
| **Utils** | unplugin-auto-import |

Total: 143 packages (after removing @svgr/core, autoprefixer)

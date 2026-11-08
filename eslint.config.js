import js from '@eslint/js'
import globals from 'globals'

// Exports auto-imported by unplugin-auto-import (vite.config.js)
const autoImportGlobals = Object.fromEntries(
  ['h', 'Fragment', 'el', 'ref', 'useData', 'useDate', 'useForm'].map(
    (name) => [name, 'readonly']
  )
)

export default [
  { ignores: ['dist/', 'auto-imports.d.ts'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...autoImportGlobals }
    }
  },
  {
    files: ['vite.config.js', 'eslint.config.js'],
    languageOptions: { globals: globals.node }
  }
]

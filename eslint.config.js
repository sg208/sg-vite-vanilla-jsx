import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        h: 'readonly',
        Fragment: 'readonly',
        el: 'readonly',
        classList: 'readonly',
        html: 'readonly',
        nextTick: 'readonly',
        scrollBottom: 'readonly',
        ref: 'readonly',
        jsx: 'readonly'
      }
    },
    rules: {
      'no-extra-parens': ['error', 'all', { ignoreJSX: 'multi-line' }]
    }
  }
]

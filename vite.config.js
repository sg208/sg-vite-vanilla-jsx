/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  server: {
    port: 3000
  },
  preview: {
    port: 8000
  },
  plugins: [
    tailwindcss(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.md$/ // .md
      ],
      dirs: ['./src/**'],
      imports: [
        {
          'start-dom-jsx': ['h', 'Fragment']
        }
      ]
    })
  ],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'index.js'
      }
    }
  },
  oxc: {
    jsx: {
      runtime: 'classic',
      // No __self/__source props: start-dom-jsx would write them to the DOM
      development: false,
      pragma: 'h',
      pragmaFrag: 'Fragment'
    }
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js']
  }
})

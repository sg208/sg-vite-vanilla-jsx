/// <reference types="vitest/config" />
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'

// Hosted builds have no JSON Server, so emit its items as dist/api/items.json
const emitItemsJson = () => ({
  name: 'emit-items-json',
  apply: 'build',
  generateBundle() {
    const db = JSON.parse(
      readFileSync(new URL('./jsonserver/db.json', import.meta.url), 'utf8')
    )
    this.emitFile({
      type: 'asset',
      fileName: 'api/items.json',
      source: JSON.stringify(db.items)
    })
  }
})

export default defineConfig({
  server: {
    port: 3000
  },
  preview: {
    port: 8000
  },
  plugins: [
    emitItemsJson(),
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

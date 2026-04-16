import AutoImport from 'unplugin-auto-import/vite'

export default {
  server: {
    port: 3000
  },
  preview: {
    port: 8000
  },
  plugins: [
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
      pragma: 'h',
      pragmaFrag: 'Fragment'
    }
  }
}

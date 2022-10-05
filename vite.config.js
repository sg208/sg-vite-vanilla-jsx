import AutoImport from "unplugin-auto-import/vite"

export default {
  server: {
    port: 3000,
  },
  preview: {
    port: 8000,
  },
  plugins: [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.md$/, // .md
      ],
      dirs: ["./src/**"],
      imports: [
        {
          "start-dom-jsx": ["h", "Fragment"],
        },
      ],
    }),
  ],
  build: {
    // outDir: "prod",
    // minify: "esbuild",
    // polyfillModulePreload: false,
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        // minifyInternalExports: true,
      },
    },
    // lib: {
    //   entry: "src/index.js",
    //   formats: ["iife"],
    //   fileName: "index",
    //   name: "PaqtFormPicker",
    // },
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
}

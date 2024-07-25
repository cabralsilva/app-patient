import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), 
    nodePolyfills(),
    NodeGlobalsPolyfillPlugin({
    buffer: true
  })],
  build: {
    rollupOptions: {
      external: [
        "react-csv",
      ],
    }
  }
})

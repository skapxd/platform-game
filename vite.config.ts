import { defineConfig } from 'vite'

import path from 'path'
/** @type {import('vite').UserConfig} */
export default defineConfig({
  resolve: {
    alias: {
      '#': path.resolve(__dirname)
    }
  }
})

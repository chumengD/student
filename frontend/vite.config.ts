import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteSingleFile()
  ],
  build: {
    // 将阈值设置得非常大 (例如 100000000)，强制所有图片和资源内联为 Base64
    assetsInlineLimit: 100000000
  }
})

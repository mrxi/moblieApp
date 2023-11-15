import { fileURLToPath, URL } from 'node:url'

import { defineConfig ,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default({mode})=>{
  const env=loadEnv(mode, process.cwd())
  console.log(env.VITE_APP_BASE_API,'环境区分')
   return defineConfig({
    css:{
  preprocessorOptions:{
    scss:{
      additionalData: `@import "@/assets/styles/variables.scss";`
    }
  }
    },
    plugins: [
      vue(),
    ],
    build: {
      outDir:'mobileApp',
      minify: 'mobileApp',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    base:'./',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 配置代理
  server: {
    proxy: {
      "/api": {
        target:env.VITE_APP_BASE_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  })
} 


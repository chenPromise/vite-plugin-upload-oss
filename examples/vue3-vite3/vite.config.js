import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginUploadOss from "vite-plugin-upload-oss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vitePluginUploadOss({
      // 阿里云地区 如oss-cn-beijing
      region: '',
      // 阿里云账号AccessKey。
      accessKeyId: '',
      accessKeySecret: '',
      // 填写Bucket名称。如 fe-user-test
      bucket:''
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

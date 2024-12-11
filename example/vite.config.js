import { fileURLToPath, URL } from 'node:url'

import { isVue2 } from 'vue-demi';
import { defineConfig } from 'vite'
// 想要2、3切换使用 @vitejs/plugin-vue只能使用 3.x.x 版本的，4.x 会用 shallowRef 这个方法，默认2版本的vue没有这个方法
import vue3 from '@vitejs/plugin-vue' 
import * as compiler from 'vue3/compiler-sfc'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import vueDevTools from 'vite-plugin-vue-devtools'


// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: isVue2 ? fileURLToPath(new URL('./node_modules/vue2', import.meta.url)) : fileURLToPath(new URL('./node_modules/vue3', import.meta.url))
    },
  },
  plugins: [
    isVue2 ? vue2() : vue3({ compiler: compiler, }),
    isVue2 ? ScriptSetup() : undefined,
    isVue2 ? undefined : vueDevTools(),

  ],
  
})

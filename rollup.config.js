import { isVue2 } from 'vue-demi'
import vue2 from 'rollup-plugin-vue2'
// vue2 支持 setup语法
import ScriptSetup from 'unplugin-vue2-script-setup/rollup'
import vue3 from 'rollup-plugin-vue3'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

console.log('=====rollup isVue2=====', isVue2)
export default {
  input: "./src/index.js",
  output: [
    {
      file: `./dist/vue${isVue2 ? '2' : '3'}/index.esm.js`,
      format: 'es'
    },
    {
      file: `./dist/vue${isVue2 ? '2' : '3'}/index.cjs.js`,
      format: 'cjs'
    }
  ],
  external: ['vue'],
  plugins: [
    
    isVue2 ? ScriptSetup() : undefined,
    isVue2 ? vue2() : vue3(),
    resolve(),
    commonjs(),
    // terser(),
  ]
}
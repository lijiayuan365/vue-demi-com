import { isVue2 } from 'vue-demi'
import vue2 from 'rollup-plugin-vue2'
// vue2 支持 setup语法
import ScriptSetup from 'unplugin-vue2-script-setup/rollup'
import vue3 from 'rollup-plugin-vue3'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

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
  external: ['vue', 'vue-demi'],
  plugins: [
    
    isVue2 ? ScriptSetup() : undefined,
    isVue2 ? vue2() : vue3(),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // 排除 node_modules 目录
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'], // 支持的文件扩展名
      babelHelpers: 'bundled' // 使用 Babel 自带的 helper 函数
    }),
    // terser(),
  ]
}

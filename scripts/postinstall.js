// 导入必要的模块
import { isVue2 } from 'vue-demi'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'path'
import { existsSync, statSync, mkdirSync, readdirSync, copyFileSync, unlinkSync } from 'fs'

// 根据 Vue 版本设置标识
const version = isVue2 ? '2' : '3'
console.log('===version====', version)

// 在 ES 模块中获取当前文件路径（替代 CommonJS 的 __dirname）
const __filename = fileURLToPath(import.meta.url)  // 将 import.meta.url 转换为文件路径
const __dirname = dirname(__filename)              // 获取文件所在目录路径

// 获取对应 Vue 版本的构建目录路径
export function getDistDir(version) {
  const dirname = String(version).startsWith('2') ? 'vue2' : 'vue3'
  return path.join(__dirname, `../dist/${dirname}/`)
}

// 复制目录的主函数
export function copyDir(src, dest) {
  console.log(`copying from ${src} to ${dest}`)
  // 为了兼容 pnpm，先尝试删除目标文件/目录
  try {
    unlinkSync(dest)
  } catch (error) {}
  try {
    copyRecursiveSync(src, dest)
  } catch (error) {
    console.log('===error====')
    console.error(error)
  }
}

// 递归复制目录及其内容
export function copyRecursiveSync(src, dest) {
  const exists = existsSync(src)                    // 检查源路径是否存在
  const stats = exists && statSync(src)             // 获取文件/目录信息
  const isDirectory = stats && stats.isDirectory()  // 判断是否为目录
  if (isDirectory) {
    // 如果是目录，确保目标目录存在
    !existsSync(dest) && mkdirSync(dest)
    // 遍历目录中的所有项目并递归复制
    readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      )
    })
  } else {
    // 如果是文件，直接复制
    copyFileSync(src, dest)
  }
}

// 切换 Vue 版本的函数
export function switchVersion(version) {
  const src = getDistDir(version)
  const dest = path.join(src, '..')
  console.log(`[frontend-shared] switch lib to vue version ${version}`)
  copyDir(src, dest)
}

// 执行版本切换
switchVersion(version)

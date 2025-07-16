#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, rmSync } from 'fs'
import { resolve } from 'path'

const root = resolve(process.cwd())
const distDir = resolve(root, 'dist')

console.log('🚀 开始构建擎路组件库...')

// 清理构建目录
if (existsSync(distDir)) {
  console.log('🧹 清理构建目录...')
  rmSync(distDir, { recursive: true, force: true })
}

try {
  // 构建组件库
  console.log('📦 构建组件库...')
  execSync('vite build --mode lib', { stdio: 'inherit' })

  // 生成类型定义文件
  console.log('📝 生成类型定义文件...')
  execSync('vue-tsc --declaration --emitDeclarationOnly --outDir dist', { stdio: 'inherit' })

  // 复制必要文件
  console.log('📋 复制必要文件...')
  execSync('cp README.md dist/', { stdio: 'inherit' })
  execSync('cp package.json dist/', { stdio: 'inherit' })

  console.log('✅ 构建完成！')
  console.log('📁 构建文件位于 dist/ 目录')

} catch (error) {
  console.error('❌ 构建失败:', error.message)
  process.exit(1)
}

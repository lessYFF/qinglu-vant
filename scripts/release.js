#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { createInterface } from 'readline'

const root = resolve(process.cwd())
const packagePath = resolve(root, 'package.json')

// 读取当前版本
const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'))
const currentVersion = packageJson.version

console.log(`📦 当前版本: ${currentVersion}`)

// 版本类型选择
const versionTypes = {
  patch: '补丁版本 (x.x.X)',
  minor: '次要版本 (x.X.x)',
  major: '主要版本 (X.x.x)',
  beta: 'Beta版本 (x.x.x-beta.x)',
  custom: '自定义版本'
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

function getNextVersion(current, type) {
  const [major, minor, patch] = current.split('.').map(Number)
  
  switch (type) {
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'major':
      return `${major + 1}.0.0`
    case 'beta':
      return `${major}.${minor}.${patch + 1}-beta.0`
    default:
      return current
  }
}

async function selectVersionType() {
  console.log('\n📋 请选择版本类型:')
  Object.entries(versionTypes).forEach(([key, desc], index) => {
    console.log(`${index + 1}. ${key} - ${desc}`)
  })

  const choice = await question('\n请输入选择 (1-5): ')
  const types = Object.keys(versionTypes)
  const selectedType = types[parseInt(choice) - 1]

  if (!selectedType) {
    console.log('❌ 无效选择')
    process.exit(1)
  }

  return selectedType
}

async function getNewVersion(type) {
  if (type === 'custom') {
    return await question('请输入自定义版本号: ')
  }
  
  const nextVersion = getNextVersion(currentVersion, type)
  console.log(`\n🔄 新版本: ${nextVersion}`)
  
  const confirm = await question('确认发布此版本? (y/N): ')
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ 发布已取消')
    process.exit(0)
  }
  
  return nextVersion
}

async function updateVersion(newVersion) {
  packageJson.version = newVersion
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n')
  console.log(`✅ 版本已更新为: ${newVersion}`)
}

async function runTests() {
  console.log('\n🧪 运行测试...')
  try {
    execSync('npm run test', { stdio: 'inherit' })
    console.log('✅ 测试通过')
  } catch (error) {
    console.log('❌ 测试失败')
    process.exit(1)
  }
}

async function buildProject() {
  console.log('\n📦 构建项目...')
  try {
    execSync('npm run build', { stdio: 'inherit' })
    console.log('✅ 构建完成')
  } catch (error) {
    console.log('❌ 构建失败')
    process.exit(1)
  }
}

async function publishPackage(isBeta = false) {
  console.log('\n🚀 发布到 npm...')
  try {
    const publishCmd = isBeta ? 'npm publish --tag beta' : 'npm publish'
    execSync(publishCmd, { stdio: 'inherit' })
    console.log('✅ 发布成功')
  } catch (error) {
    console.log('❌ 发布失败')
    process.exit(1)
  }
}

async function createGitTag(version) {
  console.log('\n🏷️  创建 Git 标签...')
  try {
    execSync(`git add .`, { stdio: 'inherit' })
    execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
    execSync(`git tag v${version}`, { stdio: 'inherit' })
    execSync(`git push origin v${version}`, { stdio: 'inherit' })
    console.log(`✅ Git 标签 v${version} 创建成功`)
  } catch (error) {
    console.log('⚠️  Git 标签创建失败，但发布已完成')
  }
}

async function main() {
  try {
    const versionType = await selectVersionType()
    const newVersion = await getNewVersion(versionType)
    
    await updateVersion(newVersion)
    await runTests()
    await buildProject()
    
    const isBeta = newVersion.includes('beta')
    await publishPackage(isBeta)
    await createGitTag(newVersion)
    
    console.log(`\n🎉 版本 ${newVersion} 发布成功！`)
    
  } catch (error) {
    console.error('❌ 发布过程中出现错误:', error.message)
    process.exit(1)
  } finally {
    rl.close()
  }
}

main()

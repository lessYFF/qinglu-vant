const common = {
  // 阿里云行为验证
  verifyTest: false, // 是否开启测试模式
  verifyAppKey: 'FFFF0N0000000000B2DA',

  // 开发环境统一 CDN 配置
  CDNHost: 'https://qinglu-file-dev.oss-cn-shanghai.aliyuncs.com',
  privateCDNHost: 'https://qinglu-file-private-dev.oss-cn-shanghai.aliyuncs.com',
}

const appEnvs = {
  local: {
    APIPrefix: '//sa.qinglusaas-dev.com',
  },
  // etc项目
  alter1: {
    APIPrefix: '//s1.qinglusaas-dev.com',
  },
  // 日常迭代环境
  dev: {
    APIPrefix: '//sa.qinglusaas-dev.com/dev',
  },
  // bug修复环境
  bugfix: {
    APIPrefix: '//sa.qinglusaas-dev.com/bugfix',
  },
  // ultra项目环境
  ultra: {
    APIPrefix: '//sa.qinglusaas-dev.com/ultra',
  },
  // beyond项目环境
  beyond: {
    APIPrefix: '//sa.qinglusaas-dev.com/beyond',
  },
  // 公共环境
  stable: {
    APIPrefix: '//sa.qinglusaas-dev.com',
  },
  // pro项目环境
  pro: {
    APIPrefix: '//sa.qinglusaas-dev.com/pro',
  },
  // promax项目环境
  promax: {
    APIPrefix: '//sa.qinglusaas-dev.com/promax',
  },
  // tank项目环境
  tank: {
    APIPrefix: '//sa.qinglusaas-dev.com/tank',
  },
  // 正式环境
  prod: {
    APIPrefix: 'https://s.qinglusaas.com',
    CDNHost: 'https://img.qinglusaas.com',
    privateCDNHost: 'https://qinglu-file-private.oss-cn-shanghai.aliyuncs.com',
  },
}

// 在浏览器环境中，使用 import.meta.env 替代 process.env
const getAppEnv = () => {
  // 检查是否在浏览器环境中
  if (typeof window !== 'undefined') {
    // 浏览器环境，使用默认值或从其他地方获取环境变量
    return 'local'
  }

  // Node.js 环境，使用 process.env
  if (typeof process !== 'undefined' && process.env) {
    return (process.env.__APP_ENV__ ?? '') in appEnvs ? process.env.__APP_ENV__ : 'local'
  }

  // 默认环境
  return 'local'
}

const appEnv = getAppEnv()
const config = {
  ...common,
  ...appEnvs[appEnv]
}

export default config

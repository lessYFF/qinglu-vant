import Mock from 'mockjs'

// 导入各个组件的Mock数据
import formMocks from './form'
import businessMocks from './business'
import commonMocks from './common'

// 统一的Mock数据管理器
class MockManager {
  constructor() {
    this.mocks = new Map()
    this.init()
  }

  init() {
    // 注册表单组件Mock数据
    this.registerMocks('form', formMocks)
    
    // 注册业务组件Mock数据
    this.registerMocks('business', businessMocks)
    
    // 注册通用组件Mock数据
    this.registerMocks('common', commonMocks)
  }

  registerMocks(category, mocks) {
    this.mocks.set(category, mocks)
  }

  getMockData(category, component, scenario = 'default') {
    const categoryMocks = this.mocks.get(category)
    if (!categoryMocks || !categoryMocks[component]) {
      console.warn(`Mock data not found for ${category}.${component}`)
      return null
    }

    const componentMocks = categoryMocks[component]
    if (typeof componentMocks === 'function') {
      return componentMocks(scenario)
    }

    return componentMocks[scenario] || componentMocks.default || componentMocks
  }

  getAllMockData() {
    const result = {}
    for (const [category, mocks] of this.mocks) {
      result[category] = {}
      for (const [component, mockData] of Object.entries(mocks)) {
        if (typeof mockData === 'function') {
          result[category][component] = {
            default: mockData('default'),
            scenarios: ['default', 'empty', 'error', 'loading']
          }
        } else {
          result[category][component] = mockData
        }
      }
    }
    return result
  }

  // 为AI模型提供的结构化数据
  getAIModelData() {
    return {
      version: '1.0.0',
      description: '擎路组件库Mock数据',
      categories: Array.from(this.mocks.keys()),
      components: this.getAllMockData(),
      usage: {
        description: '如何使用Mock数据',
        examples: [
          {
            description: '获取表单选择字段的默认数据',
            code: "mockManager.getMockData('form', 'selectField', 'default')"
          },
          {
            description: '获取业务订单搜索栏的数据',
            code: "mockManager.getMockData('business', 'orderSearchBar', 'default')"
          }
        ]
      }
    }
  }
}

// 创建全局Mock管理器实例
const mockManager = new MockManager()

// 导出Mock管理器
export default mockManager

// 为了兼容性，也导出各个分类的Mock数据
export { formMocks, businessMocks, commonMocks }

// 设置Mock拦截（开发环境）
if (process.env.NODE_ENV === 'development') {
  // 设置Mock延迟
  Mock.setup({
    timeout: '200-600'
  })
}

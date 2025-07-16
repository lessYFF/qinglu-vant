import mockManager from './index.js'

// Mock API接口定义
export default [
  // 获取所有Mock数据
  {
    url: '/api/mock/all',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: mockManager.getAllMockData()
      }
    }
  },

  // 获取AI模型数据
  {
    url: '/api/mock/ai-model',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: mockManager.getAIModelData()
      }
    }
  },

  // 获取特定组件的Mock数据
  {
    url: '/api/mock/:category/:component',
    method: 'get',
    response: ({ query, url }) => {
      const urlParts = url.split('/')
      const category = urlParts[urlParts.length - 2]
      const component = urlParts[urlParts.length - 1]
      const scenario = query.scenario || 'default'
      
      const data = mockManager.getMockData(category, component, scenario)
      
      if (data === null) {
        return {
          code: 404,
          message: `Mock data not found for ${category}.${component}`,
          data: null
        }
      }
      
      return {
        code: 200,
        message: 'success',
        data
      }
    }
  },

  // 获取表单组件Mock数据
  {
    url: '/api/mock/form',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('form')
      }
    }
  },

  // 获取业务组件Mock数据
  {
    url: '/api/mock/business',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('business')
      }
    }
  },

  // 获取通用组件Mock数据
  {
    url: '/api/mock/common',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('common')
      }
    }
  },

  // 表单组件具体接口
  {
    url: '/api/mock/form/select-field',
    method: 'get',
    response: ({ query }) => {
      const scenario = query.scenario || 'default'
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('form', 'selectField', scenario)
      }
    }
  },

  {
    url: '/api/mock/form/datetime-field',
    method: 'get',
    response: ({ query }) => {
      const scenario = query.scenario || 'default'
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('form', 'datetimeField', scenario)
      }
    }
  },

  {
    url: '/api/mock/form/upload-field',
    method: 'get',
    response: ({ query }) => {
      const scenario = query.scenario || 'default'
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('form', 'uploadField', scenario)
      }
    }
  },

  // 业务组件具体接口
  {
    url: '/api/mock/business/order-search-bar',
    method: 'get',
    response: ({ query }) => {
      const scenario = query.scenario || 'default'
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('business', 'orderSearchBar', scenario)
      }
    }
  },

  {
    url: '/api/mock/business/vehicle-appearance',
    method: 'get',
    response: ({ query }) => {
      const scenario = query.scenario || 'default'
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('business', 'vehicleAppearance', scenario)
      }
    }
  },

  {
    url: '/api/mock/business/order-contract',
    method: 'get',
    response: ({ query }) => {
      const scenario = query.scenario || 'default'
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('business', 'orderContract', scenario)
      }
    }
  },

  {
    url: '/api/mock/business/order-contract-content',
    method: 'get',
    response: ({ query }) => {
      const scenario = query.scenario || 'default'
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('business', 'orderContractContent', scenario)
      }
    }
  },

  {
    url: '/api/mock/business/rental-car-deposit-panel',
    method: 'get',
    response: ({ query }) => {
      const scenario = query.scenario || 'default'
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('business', 'rentalCarDepositPanel', scenario)
      }
    }
  },

  // 通用组件具体接口
  {
    url: '/api/mock/common/calendar-picker',
    method: 'get',
    response: ({ query }) => {
      const scenario = query.scenario || 'default'
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('common', 'calendarPicker', scenario)
      }
    }
  },

  {
    url: '/api/mock/common/media-preview',
    method: 'get',
    response: ({ query }) => {
      const scenario = query.scenario || 'default'
      return {
        code: 200,
        message: 'success',
        data: mockManager.getMockData('common', 'mediaPreview', scenario)
      }
    }
  },

  // 组件使用示例接口
  {
    url: '/api/mock/examples',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          description: '擎路组件库Mock数据使用示例',
          examples: [
            {
              title: '表单选择字段 - 城市选择',
              url: '/api/mock/form/select-field?scenario=city',
              description: '获取城市选择字段的Mock数据'
            },
            {
              title: '业务组件 - 车辆外观检查',
              url: '/api/mock/business/vehicle-appearance?scenario=damaged',
              description: '获取有损坏的车辆外观数据'
            },
            {
              title: '通用组件 - 媒体预览',
              url: '/api/mock/common/media-preview?scenario=images',
              description: '获取纯图片的媒体预览数据'
            }
          ]
        }
      }
    }
  }
]

import Mock from 'mockjs'

// 表单组件Mock数据
const formMocks = {
  // 选择字段组件
  selectField: (scenario = 'default') => {
    const baseData = {
      title: '选择字段',
      placeholder: '请选择',
      columns: Mock.mock({
        'list|5-10': [{
          'text': '@cname',
          'value|+1': 1
        }]
      }).list
    }

    switch (scenario) {
      case 'empty':
        return {
          ...baseData,
          columns: []
        }
      case 'single':
        return {
          ...baseData,
          columns: [{ text: '唯一选项', value: 1 }]
        }
      case 'city':
        return {
          ...baseData,
          title: '选择城市',
          columns: [
            { text: '北京', value: 'beijing' },
            { text: '上海', value: 'shanghai' },
            { text: '广州', value: 'guangzhou' },
            { text: '深圳', value: 'shenzhen' },
            { text: '杭州', value: 'hangzhou' },
            { text: '成都', value: 'chengdu' }
          ]
        }
      default:
        return baseData
    }
  },

  // 日期时间字段组件
  datetimeField: (scenario = 'default') => {
    const baseData = {
      title: '选择时间',
      placeholder: '请选择时间',
      type: 'datetime',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2030, 11, 31)
    }

    switch (scenario) {
      case 'date':
        return {
          ...baseData,
          title: '选择日期',
          type: 'date'
        }
      case 'time':
        return {
          ...baseData,
          title: '选择时间',
          type: 'time'
        }
      case 'range':
        return {
          ...baseData,
          title: '选择时间范围',
          type: 'datetime-range'
        }
      default:
        return baseData
    }
  },

  // 上传字段组件
  uploadField: (scenario = 'default') => {
    const baseData = {
      title: '上传文件',
      accept: 'image/*',
      multiple: true,
      maxCount: 9,
      maxSize: 5 * 1024 * 1024, // 5MB
      previewList: Mock.mock({
        'list|0-3': [{
          'url': '@image(200x200)',
          'name': '@word(5,10).jpg',
          'size|1000-5000000': 1
        }]
      }).list
    }

    switch (scenario) {
      case 'single':
        return {
          ...baseData,
          multiple: false,
          maxCount: 1
        }
      case 'document':
        return {
          ...baseData,
          title: '上传文档',
          accept: '.pdf,.doc,.docx',
          previewList: Mock.mock({
            'list|0-2': [{
              'url': '@url',
              'name': '@word(5,10).pdf',
              'size|1000-5000000': 1
            }]
          }).list
        }
      case 'empty':
        return {
          ...baseData,
          previewList: []
        }
      default:
        return baseData
    }
  },

  // 单选字段组件
  radioField: (scenario = 'default') => {
    const baseData = {
      title: '单选字段',
      options: Mock.mock({
        'list|3-6': [{
          'label': '@cname',
          'value|+1': 1
        }]
      }).list
    }

    switch (scenario) {
      case 'yesno':
        return {
          ...baseData,
          title: '是否同意',
          options: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
          ]
        }
      case 'gender':
        return {
          ...baseData,
          title: '性别',
          options: [
            { label: '男', value: 1 },
            { label: '女', value: 2 }
          ]
        }
      default:
        return baseData
    }
  },

  // 滑块字段组件
  slideField: (scenario = 'default') => {
    const baseData = {
      title: '滑块字段',
      min: 0,
      max: 100,
      step: 1,
      value: 50
    }

    switch (scenario) {
      case 'price':
        return {
          ...baseData,
          title: '价格范围',
          min: 0,
          max: 10000,
          step: 100,
          value: 5000
        }
      case 'age':
        return {
          ...baseData,
          title: '年龄',
          min: 18,
          max: 80,
          step: 1,
          value: 30
        }
      default:
        return baseData
    }
  },

  // 标签字段组件
  tagsField: (scenario = 'default') => {
    const baseData = {
      title: '标签字段',
      tags: Mock.mock({
        'list|5-10': ['@cname']
      }).list,
      selectedTags: Mock.mock({
        'list|0-3': ['@cname']
      }).list
    }

    switch (scenario) {
      case 'skills':
        return {
          ...baseData,
          title: '技能标签',
          tags: ['JavaScript', 'Vue.js', 'React', 'Node.js', 'Python', 'Java', 'Go', 'TypeScript'],
          selectedTags: ['JavaScript', 'Vue.js']
        }
      case 'interests':
        return {
          ...baseData,
          title: '兴趣爱好',
          tags: ['阅读', '旅行', '摄影', '音乐', '运动', '电影', '美食', '游戏'],
          selectedTags: ['阅读', '旅行']
        }
      default:
        return baseData
    }
  },

  // 门店字段组件
  storeField: (scenario = 'default') => {
    const baseData = {
      title: '选择门店',
      stores: Mock.mock({
        'list|5-10': [{
          'id|+1': 1,
          'name': '@ctitle(5,10)',
          'address': '@county(true)',
          'phone': /^1[3-9]\d{9}$/,
          'distance|0.1-10.0': 1
        }]
      }).list
    }

    switch (scenario) {
      case 'nearby':
        return {
          ...baseData,
          title: '附近门店',
          stores: baseData.stores.sort((a, b) => a.distance - b.distance)
        }
      case 'empty':
        return {
          ...baseData,
          stores: []
        }
      default:
        return baseData
    }
  }
}

export default formMocks

import Mock from 'mockjs'

// 通用组件Mock数据
const commonMocks = {
  // 日历选择器组件
  calendarPicker: (scenario = 'default') => {
    const baseData = {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2030, 11, 31),
      defaultDate: new Date(),
      type: 'range', // single, range
      allowSameDay: false,
      disabledDates: []
    }

    switch (scenario) {
      case 'single':
        return {
          ...baseData,
          type: 'single'
        }
      case 'withDisabled':
        return {
          ...baseData,
          disabledDates: [
            new Date(2024, 0, 1), // 元旦
            new Date(2024, 1, 10), // 春节
            new Date(2024, 4, 1), // 劳动节
            new Date(2024, 9, 1), // 国庆节
          ]
        }
      case 'nearFuture':
        return {
          ...baseData,
          minDate: new Date(),
          maxDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90天后
        }
      default:
        return baseData
    }
  },

  // 媒体预览组件
  mediaPreview: (scenario = 'default') => {
    const baseData = Mock.mock({
      mediaList: {
        'list|3-8': [{
          'id|+1': 1,
          'type': '@pick(["image", "video"])',
          'url': '@image(400x300)',
          'thumbnail': '@image(200x150)',
          'title': '@ctitle(5,15)',
          'size|1000-10000000': 1,
          'duration|10-300': 1 // 视频时长（秒）
        }]
      },
      currentIndex: 0
    })

    switch (scenario) {
      case 'images':
        return {
          ...baseData,
          mediaList: {
            list: baseData.mediaList.list.map(item => ({
              ...item,
              type: 'image'
            }))
          }
        }
      case 'videos':
        return {
          ...baseData,
          mediaList: {
            list: baseData.mediaList.list.map(item => ({
              ...item,
              type: 'video',
              url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
            }))
          }
        }
      case 'empty':
        return {
          ...baseData,
          mediaList: { list: [] }
        }
      default:
        return baseData
    }
  },

  // 媒体缩略图组件
  mediaThumbs: (scenario = 'default') => {
    const baseData = Mock.mock({
      thumbList: {
        'list|4-12': [{
          'id|+1': 1,
          'type': '@pick(["image", "video"])',
          'thumbnail': '@image(100x100)',
          'selected': false
        }]
      },
      maxSelect: 9,
      selectedCount: 0
    })

    switch (scenario) {
      case 'selected':
        return {
          ...baseData,
          thumbList: {
            list: baseData.thumbList.list.map((item, index) => ({
              ...item,
              selected: index < 3
            }))
          },
          selectedCount: 3
        }
      case 'single':
        return {
          ...baseData,
          maxSelect: 1
        }
      default:
        return baseData
    }
  },

  // 导航栏组件
  navigateBar: (scenario = 'default') => {
    const baseData = {
      title: '页面标题',
      leftText: '返回',
      rightText: '',
      showBack: true,
      showHome: false,
      backgroundColor: '#ffffff',
      textColor: '#333333'
    }

    switch (scenario) {
      case 'withActions':
        return {
          ...baseData,
          title: '订单详情',
          rightText: '编辑',
          showHome: true
        }
      case 'dark':
        return {
          ...baseData,
          backgroundColor: '#333333',
          textColor: '#ffffff'
        }
      case 'simple':
        return {
          ...baseData,
          title: '简单页面',
          showBack: false,
          showHome: false
        }
      default:
        return baseData
    }
  },

  // 页面加载组件
  pageLoading: (scenario = 'default') => {
    const baseData = {
      loading: true,
      text: '加载中...',
      type: 'spinner', // spinner, circular, dots
      size: 'normal', // small, normal, large
      color: '#1989fa'
    }

    switch (scenario) {
      case 'success':
        return {
          ...baseData,
          loading: false,
          text: '加载完成'
        }
      case 'error':
        return {
          ...baseData,
          loading: false,
          text: '加载失败',
          color: '#ee0a24'
        }
      case 'custom':
        return {
          ...baseData,
          text: '正在处理订单...',
          type: 'circular',
          size: 'large'
        }
      default:
        return baseData
    }
  },

  // 选择器组件
  selector: (scenario = 'default') => {
    const baseData = Mock.mock({
      options: {
        'list|5-15': [{
          'label': '@ctitle(2,8)',
          'value|+1': 1,
          'disabled': '@boolean(0.1, 0.9, false)',
          'description': '@csentence(10,20)'
        }]
      },
      multiple: false,
      selectedValues: []
    })

    switch (scenario) {
      case 'multiple':
        return {
          ...baseData,
          multiple: true,
          selectedValues: [1, 3, 5]
        }
      case 'withGroups':
        return {
          ...baseData,
          options: {
            list: [
              {
                label: '基础服务',
                value: 'basic',
                children: [
                  { label: '保险服务', value: 'insurance' },
                  { label: '道路救援', value: 'rescue' }
                ]
              },
              {
                label: '增值服务',
                value: 'premium',
                children: [
                  { label: '上门送车', value: 'delivery' },
                  { label: '代驾服务', value: 'driver' }
                ]
              }
            ]
          }
        }
      default:
        return baseData
    }
  },

  // 发送验证码组件
  sendCode: (scenario = 'default') => {
    const baseData = {
      phone: '',
      countdown: 0,
      maxCountdown: 60,
      buttonText: '发送验证码',
      disabled: false
    }

    switch (scenario) {
      case 'countdown':
        return {
          ...baseData,
          phone: '18888888888',
          countdown: 45,
          buttonText: '45s后重发',
          disabled: true
        }
      case 'sent':
        return {
          ...baseData,
          phone: '18888888888',
          buttonText: '重新发送',
          disabled: false
        }
      default:
        return baseData
    }
  },

  // 步骤组件
  steps: (scenario = 'default') => {
    const baseData = {
      current: 1,
      steps: [
        { title: '提交订单', description: '填写租车信息' },
        { title: '确认订单', description: '等待商家确认' },
        { title: '支付订单', description: '完成支付流程' },
        { title: '取车', description: '到店取车' },
        { title: '还车', description: '按时还车' }
      ],
      direction: 'horizontal' // horizontal, vertical
    }

    switch (scenario) {
      case 'completed':
        return {
          ...baseData,
          current: 4
        }
      case 'vertical':
        return {
          ...baseData,
          direction: 'vertical',
          current: 2
        }
      case 'error':
        return {
          ...baseData,
          current: 2,
          steps: baseData.steps.map((step, index) => ({
            ...step,
            status: index === 2 ? 'error' : index < 2 ? 'finish' : 'wait'
          }))
        }
      default:
        return baseData
    }
  }
}

export default commonMocks

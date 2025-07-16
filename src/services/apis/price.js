// 价格相关API
export const getBusiChannelList = (params) => {
  return Promise.resolve([
    {
      channelId: 1,
      channelName: '线下渠道',
      checked: false
    },
    {
      channelId: 2,
      channelName: '携程旅行',
      checked: false
    },
    {
      channelId: 3,
      channelName: '飞猪旅行',
      checked: false
    },
    {
      channelId: 4,
      channelName: '美团',
      checked: false
    },
    {
      channelId: 5,
      channelName: '去哪儿',
      checked: false
    },
    {
      channelId: 6,
      channelName: '同程旅行',
      checked: false
    },
    {
      channelId: 7,
      channelName: '马蜂窝',
      checked: false
    },
    {
      channelId: 8,
      channelName: '途牛旅游',
      checked: false
    }
  ])
}

const PriceAPI = {
  // 获取价格信息
  getPriceInfo: (params) => {
    return Promise.resolve({
      code: 200,
      data: {
        dailyPrice: 200,
        weeklyPrice: 1200,
        monthlyPrice: 4500,
        deposit: 5000
      }
    })
  },

  // 计算订单价格
  calculatePrice: (orderData) => {
    return Promise.resolve({
      code: 200,
      data: {
        basePrice: 1000,
        discount: 100,
        finalPrice: 900,
        deposit: 5000
      }
    })
  }
}

export default PriceAPI

import { ref } from 'vue'

// 模拟订单枚举数据，基于qinglu-h5项目的真实数据结构
const orderEnums = ref({
  identityTypeEnumList: [],
  pickupTypeEnumList: [],
  returnTypeEnumList: [],
  pickupReturnQueryStatusEnumList: [],
  pickupReturnQueryStatusAppEnumList: [],
  reduceTypeEnumList: [],
  sourceEnumList: [],
  statusEnumList: [],
  payModeEnumList: [],
  payKindEnumList: [],
  longOrderPayStatusEnumList: [],
  driverExpensesEnumList: []
})

// 模拟异步加载状态
let isReady = false
const readyCallbacks = []

// 模拟ready函数
const ready = (callback) => {
  if (isReady) {
    callback()
  } else {
    readyCallbacks.push(callback)
  }
}

// 模拟数据加载
const loadMockData = () => {
  // 模拟API返回的枚举数据
  const mockEnumData = {
    sourceEnumList: [
      { name: '线上', value: '1' },
      { name: '线下', value: '2' },
      { name: '企业', value: '3' },
      { name: '代理商', value: '4' }
    ],
    statusEnumList: [
      { name: '待确认', value: '1' },
      { name: '已确认', value: '2' },
      { name: '进行中', value: '3' },
      { name: '已完成', value: '4' },
      { name: '已取消', value: '5' },
      { name: '已退款', value: '6' },
      { name: '异常', value: '8' },
      { name: '已结算', value: '10' }
    ],
    longOrderPayStatusEnumList: [
      { name: '未支付', value: '0' },
      { name: '已支付', value: '1' },
      { name: '部分支付', value: '2' },
      { name: '已退款', value: '3' }
    ],
    pickupReturnQueryStatusAppEnumList: [
      { name: '全部', value: '' },
      { name: '待取车', value: '1' },
      { name: '已取车', value: '2' },
      { name: '待还车', value: '3' },
      { name: '已还车', value: '4' }
    ]
  }

  // 转换数据格式，与qinglu-h5保持一致
  orderEnums.value = Object.keys(mockEnumData).reduce((obj, key) => {
    const value = mockEnumData[key]

    if (Array.isArray(value)) {
      obj[key] = value.map((item) => ({
        text: item.name,
        value: String(item.value),
        rawData: item
      }))
    } else {
      obj[key] = value
    }

    return obj
  }, {})

  // 标记为已准备好
  isReady = true

  // 执行所有等待的回调
  readyCallbacks.forEach(callback => callback())
  readyCallbacks.length = 0
}

export function useOrderEnums(forcedUpdate = false) {
  if (forcedUpdate || !isReady) {
    // 模拟异步加载
    setTimeout(() => {
      loadMockData()
    }, 100)
  }

  // 返回orderEnums引用和ready方法，与qinglu-h5保持一致
  return [orderEnums, ready]
}

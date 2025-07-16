export const showV2Menu = true

export const TELEPORT = '#app-popup'

export const ONE_DAY = 86400000

export const ONE_HOUR = 3600000

export const ONE_MINUTE = 60000

export const ONE_SECOND = 1000
export const METHOD_OF_CHARGEF = [{ text: '线上收费', value: '1' }]
export const METHOD_OF_CHARGE = [
  { text: '线上收费', value: '1' },
  { text: '线下收费', value: '2' },
]

export const METHOD_OF_REFUNDF = [{ text: '线上退费', value: '1' }]

export const METHOD_OF_REFUND = [
  { text: '线上退费', value: '1' },
  { text: '线下退费', value: '2' },
]

export const METHOD_OF_DEDUCTION = [
  { text: '平台代扣', value: '1' },
  { text: '线下扣款', value: '2' },
]

export function getFreeDepositDegreeStr(value) {
  switch (value) {
    case 0:
      return '押金未收'
    case 1:
      return '免租车押金'
    case 2:
      return '押金双免'
    case 3:
      return '免违章押金'
    default:
  }

  return ''
}

export function getOrderStatusStr(value) {
  switch (value) {
    case 0:
      return '未提交'
    case 1:
      return '已提交'
    case 2:
      return '确认中'
    case 3:
      return '已确认'
    case 4:
      return '已排车'
    case 5:
      return '已取车'
    case 6:
      return '已还车'
    case 7:
      return '取消中'
    case 8:
      return '已取消'
    default:
  }

  return ''
}

export function getOrderSourceStr(value) {
  switch (value) {
    case 1:
      return '线下'
    case 2:
      return '携程'
    case 3:
      return '飞猪'
    case 4:
      return '哈啰'
    case 5:
      return '租租车'
    case 6:
      return '悟空'
    case 7:
      return '滴滴'
    case 8:
      return '同程'
    case 10:
      return '携程分销'
    case 11:
      return '铁行'
    case 12:
      return '摩捷'
    default:
  }

  return ''
}

export function getOrderServiceTypeStr(value) {
  switch (value) {
    case 0:
      return '租车订单'
    case 1:
      return '基础服务订单'
    case 2:
      return '附加保险订单'
    case 3:
      return '附加服务订单'
    case 4:
      return '上门送车服务单'
    case 5:
      return '上门取车服务单'
    case 6:
      return '押金单'
    default:
  }

  return ''
}

export function getPickupAddrTypeStr(value) {
  switch (value) {
    case 1:
      return '到店取车'
    case 2:
      return '上门送车'
    case 3:
      return '接至门店'
    default:
  }

  return ''
}

export function getReturnAddrTypeStr(value) {
  switch (value) {
    case 1:
      return '到店还车'
    case 2:
      return '上门取车'
    case 3:
      return '门店送客'
    default:
  }

  return ''
}

export function getTimeTypeStr(value) {
  switch (value) {
    case 1:
      return '免费'
    case 2:
      return '按订单总金额比例'
    case 3:
      return '自定义'
    default:
  }

  return ''
}

export function getSexStr(value) {
  switch (value) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
  }

  return ''
}

export function getDeductionTypeStr(value) {
  switch (value) {
    case 1:
      return '平台代扣'
    case 2:
      return '线下'
    default:
  }

  return ''
}

export function getDeductionStatusStr(value) {
  switch (value) {
    case 1:
      return '扣款失败'
    case 2:
      return '扣款成功'
    case 3:
      return '已退款'
    default:
  }

  return ''
}

export function getPrTypeStr(value) {
  switch (value) {
    case 0:
      return '取车'
    case 1:
      return '还车'
    default:
  }

  return ''
}

export function getPayStatusStr(value) {
  switch (value) {
    case 0:
      return '未支付'
    case 1:
      return '免押'
    case 2:
      return '已支付'
    case 3:
      return '已授权'
    default:
  }

  return ''
}

export function getPayTypeStr(value) {
  switch (value) {
    case 1:
      return '线下支付'
    case 2:
      return '线上授权'
    case 3:
      return '双免'
    default:
  }

  return ''
}


// 收款码定制需求商家-79
export const CUSTOM_PAY_MERCHANT_IDS = [79].concat((localStorage.getItem('customPayMerchantIds') || '').split(',').map(Number))

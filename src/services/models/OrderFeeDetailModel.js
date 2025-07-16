import { DataX } from '@lihzsky/data-x'
import { Figure } from '../../utils'
import { OrderServiceModel } from './OrderServiceModels/OrderServiceModel'

class DailyPriceModel extends DataX {
  partDailyPriceStr = {
    type: String,
    field: (data) => Figure.toYuan(data.partDailyPrice)
  }

  perStr = {
    type: String,
    field: (data) => Figure.toPercent(data.per)
  }

  priceStr = {
    type: String,
    field: (data) => Figure.toYuan(data.price)
  }
}

class OrderCostBillModel extends DataX {
  payAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.payAmount)
  }

  receivableAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.receivableAmount)
  }

  reduceAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.reduceAmount)
  }

  refundAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.refundAmount)
  }

  waitAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.waitAmount)
  }

  detail = {
    type: Array,
    itemType: String
  }
}

export class OrderFeeDetailModel extends DataX {
  dailyPriceList = {
    type: Array,
    itemType: DailyPriceModel
  }

  orderCostBillList = {
    type: Array,
    itemType: OrderCostBillModel
  }

  payAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.payAmount)
  }

  receivableAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.receivableAmount)
  }

  rerentOrderBillList = {
    type: Array,
    itemType: RerentOrderBillModel
  }

  serviceItemAmountList = {
    type: Array,
    itemType: OrderServiceModel
  }
}

class RerentOrderBillModel extends DataX {
  serviceItemAmountList = {
    type: Array,
    itemType: OrderServiceModel
  }
}

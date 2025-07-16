import { DataX } from "@lihzsky/data-x"
import { getOrderServiceTypeStr } from "../../../constants"
import { Figure, Tempo } from "../../../utils"

export class OrderServiceModel extends DataX {
  amountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.amount || 0)
  }

  countStr = {
    type: String,
    field: (data) => {
      if (data.count) {
        return data.count + '份'
      }

      return ''
    }
  }

  includeInTotalAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.includeInTotalAmount)
  }

  priceStr = {
    type: String,
    field: (data) => Figure.toYuan(data.price)
  }

  typeStr = {
    type: String,
    field: (data) => getOrderServiceTypeStr(data.type)
  }

  createTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.createTime,  Tempo.PATTERNS.date)
  }
}

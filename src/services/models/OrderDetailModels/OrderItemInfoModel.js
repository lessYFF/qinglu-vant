import { Tempo } from "../../../utils"
import { OrderBaseInfoModel } from "./OrderBaseInfoModel"

export class OrderItemInfoModel extends OrderBaseInfoModel {
  remainTimeStr = {
    type: String,
    field: (data) => Tempo.toRemain(data.returnDate - data.pickupDate, 'd天h小时')
  }
}

import { DataX } from "@lihzsky/data-x"
import {
  getFreeDepositDegreeStr,
  getOrderSourceStr,
  getOrderStatusStr,
  getPickupAddrTypeStr,
  getReturnAddrTypeStr,
  ONE_DAY
} from "../../../constants"
import { Figure, Tempo } from "../../../utils"

export class OrderBaseInfoModel extends DataX {
  freeDepositDegreeStr = {
    type: String,
    field: (data) => getFreeDepositDegreeStr(data.freeDepositDegree)
  }

  orderSourceStr = {
    type: String,
    field: (data) => getOrderSourceStr(data.orderSource)
  }

  orderStatusStr = {
    type: String,
    field: (data) => getOrderStatusStr(data.orderStatus)
  }

  payAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.payAmount)
  }

  pickupAddrTypeStr = {
    type: String,
    field: (data) => getPickupAddrTypeStr(data.pickupAddrType)
  }

  pickupDateTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.pickupDate, 'MM/dd hh:mm')
  }

  pickupDateStr = {
    type: String,
    field: (data) => Tempo.format(data.pickupDate)
  }

  receivableAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.receivableAmount)
  }

  returnAddrTypeStr = {
    type: String,
    field: (data) => getReturnAddrTypeStr(data.returnAddrType)
  }

  returnDateTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.returnDate, 'MM/dd hh:mm')
  }

  returnDateStr = {
    type: String,
    field: (data) => Tempo.format(data.returnDate)
  }

  totalDay = {
    type: Number,
    field: (data) => Math.floor((data.returnDate - data.pickupDate) / ONE_DAY)
  }

  tagList = {
    type: Array,
    itemType: Object
  }
  vehicleModel = {
    type: Object
  }
}
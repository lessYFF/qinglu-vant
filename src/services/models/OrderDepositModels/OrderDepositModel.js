import { DataX } from "@lihzsky/data-x"
import { getPayStatusStr, getPayTypeStr } from "../../../constants"
import { Figure, Tempo } from "../../../utils"

export class OrderDepositModel extends DataX {
	depositList = {
		type: Array,
		itemType: String
	}

  freedDepositTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.freedDepositTime)
  }

  depositStatusStr = {
    type: String,
    field: (data) => getPayStatusStr(data.depositStatus)
  }

  depositPayTypeStr = {
    type: String,
    field: (data) => getPayTypeStr(data.depositPayType)
  }

  illegalOrderDepositAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.illegalOrderDepositAmount)
  }

  vehicleDepositAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.vehicleDepositAmount)
  }
}
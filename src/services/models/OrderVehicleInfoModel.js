import { DataX } from "@lihzsky/data-x"
import { getPrTypeStr } from "../../constants"
import { Tempo } from "../../utils"

export class OrderVehicleInfoModel extends DataX {
  attList = {
    type: Array,
    itemType: Object
  }

  prTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.prTime)
  }

  prTypeStr = {
    type: String,
    field: (data) => getPrTypeStr(data.prType)
  }
}

import { DataX } from "@lihzsky/data-x"
import { getDeductionTypeStr } from "../../constants"
import { Figure } from "../../utils"

export class OrderVehicleIllegalInfoModel extends DataX {
  contractDamageAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.contractDamageAmount)
  }

  deductionAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.deductionAmount)
  }

  deductionTypeStr = {
    type: String,
    field: (data) => getDeductionTypeStr(data.deductionType)
  }
}
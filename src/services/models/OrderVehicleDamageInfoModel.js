import { DataX } from "@lihzsky/data-x"
import { getDeductionTypeStr } from '../../constants'
import { Figure } from "../../utils"

export class OrderVehicleDamageInfoModel extends DataX {
  damageProofList = {
    type: Array,
    itemType: Object
  }

  deductionTypeStr = {
    type: String,
    field: (data) => getDeductionTypeStr(data.deductionType)
  }

  depreciationFeeStr = {
    type: String,
    field: (data) => Figure.toYuan(data.depreciationFee)
  }

  otherFeeStr = {
    type: String,
    field: (data) => Figure.toYuan(data.otherFee)
  }

  outageFeeStr = {
    type: String,
    field: (data) => Figure.toYuan(data.outageFee)
  }

  repairFeeStr = {
    type: String,
    field: (data) => Figure.toYuan(data.repairFee)
  }
}
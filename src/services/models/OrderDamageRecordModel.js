import { DataX } from "@lihzsky/data-x";
import { getDeductionStatusStr } from "../../constants";
import { Figure, Tempo } from "../../utils";

export class OrderDamageRecordModel extends DataX {
  damageProofList = {
    type: Array,
    itemType: Object
  }

  damageTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.damageTime)
  }

  deductionStatusStr = {
    type: String,
    field: (data) => getDeductionStatusStr(data.deductionStatus)
  }

  deductionAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.deductionAmount)
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

  partnerCreateTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.partnerCreateTime, Tempo.PATTERNS.datetime)
  }

  partnerOpTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.partnerOpTime, Tempo.PATTERNS.datetime)
  }

  repairFeeStr = {
    type: String,
    field: (data) => Figure.toYuan(data.repairFee)
  }

  amountFeeStr = {
    type: String,
    field: (data) => {
      const { repairFee = 0, outageFee = 0, depreciationFee = 0, otherFee = 0 } = data

      return Figure.toYuan(repairFee + outageFee + depreciationFee + otherFee)
    }
  }
}

import { DataX } from "@lihzsky/data-x";
import { getDeductionStatusStr, getDeductionTypeStr } from "../../constants";
import { Figure, Tempo } from "../../utils";

export class OrderIllegalRecordModel extends DataX {
  contractDamageAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.contractDamageAmount)
  }

  deductionStatusStr = {
    type: String,
    field: (data) => getDeductionStatusStr(data.deductionStatus)
  }

  deductionTypeStr = {
    type: String,
    field: (data) => getDeductionTypeStr(data.deductionType)
  }

  illegalTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.illegalTime, Tempo.PATTERNS.datetime)
  }

  penaltyAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.penaltyAmount)
  }

  proofList = {
    type: Array,
    itemType: Object
  }
}

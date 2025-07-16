import { DataX } from "@lihzsky/data-x";
import { Figure, Tempo } from "../../utils";

export class OrderRenewalRecordModel extends DataX{
  payAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.payAmount)
  }

  receivableAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.receivableAmount)
  }

  rerentStartTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.rerentStartTime)
  }

  rerentEndTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.rerentEndTime)
  }

  rerentDaysStr = {
    type: String,
    field: (data) => Tempo.toRemain(data.rerentEndTime - data.rerentStartTime, 'd天h小时')
  }

  createTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.createTime, Tempo.PATTERNS.datetime)
  }
}

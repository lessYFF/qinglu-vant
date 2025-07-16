import { DataX } from "@lihzsky/data-x";
import { Figure, Tempo } from "../../../utils";

export class OrderRenewalModel extends DataX {
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
}

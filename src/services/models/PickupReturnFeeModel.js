import { DataX } from "@lihzsky/data-x";
import { Figure } from "../../utils";

export class PickupReturnFeeModel extends DataX {
  attUrlList = {
    type: Array,
    itemType: String
  }

  expenseAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.expenseAmount)
  }
}

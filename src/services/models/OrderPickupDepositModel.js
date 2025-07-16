import { DataX } from "@lihzsky/data-x";
import { Figure } from "../../utils";

export class OrderPickupDepositModel extends DataX {
  illegalDepositAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.illegalDepositAmount)
  }

  payTypeList = {
    type: Array,
    itemType: Object
  }

  remarkTypeList = {
    type: Array,
    itemType: Object
  }

  rentDepositAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.rentDepositAmount)
  }
}

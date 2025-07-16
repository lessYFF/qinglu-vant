import { DataX } from "@lihzsky/data-x";
import { Figure } from "../../utils";
import { ServiceItemAmountModel } from "./OrderServiceModels/ServiceItemAmountModel";
import { ServiceItemModel } from "./OrderServiceModels/ServiceItemModel";

export class OrderCalculateModel extends DataX {
  addedList = {
    type: Array,
    itemType: ServiceItemModel
  }

  insuranceList = {
    type: Array,
    itemType: ServiceItemModel
  }

  serviceItemAmountList = {
    type: Array,
    itemType: ServiceItemAmountModel
  }

  tagList = {
    type: Array,
    itemType: String
  }

  totalAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.totalAmount)
  }
}

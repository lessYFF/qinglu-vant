import { DataX } from "@lihzsky/data-x";
import { Figure, Tempo } from "../../utils";
import { OrderCancelRuleModel } from "./OrderCancelRuleModel";
import { OrderServiceModel } from "./OrderServiceModels/OrderServiceModel";

class OccupancyOfVehiclesModel extends DataX {
  startTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.startTime)
  }
  endTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.endTime)
  }
}

export class RenewalPrecalculateModel extends DataX {
  oldReturnTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.oldReturnTime)
  }

  orderBuysList = {
    type: Array,
    itemType: OccupancyOfVehiclesModel
  }

  totalAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.totalAmount)
  }

  shuntingBuysList = {
    type: Array,
    itemType: OccupancyOfVehiclesModel
  }

  orderCancelRuleList = {
    type: Array,
    itemType: OrderCancelRuleModel
  }

  serviceItemAmountList = {
    type: Array,
    itemType: OrderServiceModel
  }
}

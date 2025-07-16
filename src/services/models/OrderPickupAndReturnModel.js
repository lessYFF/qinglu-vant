import { DataX } from "@lihzsky/data-x"
import { Figure } from "../../utils"
import { OrderPickupReturnDepositModel } from "./OrderPickupReturnDepositModel"
import { OrderServiceModel } from "./OrderServiceModels/OrderServiceModel"
import { OrderVehicleInfoModel } from "./OrderVehicleInfoModel"

class OrderExpenseModel extends DataX {
  expenseAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.expenseAmount)
  }
}

export class OrderPickupAndReturnModel extends DataX {
  pickupVehicleInfo = {
    type: OrderVehicleInfoModel
  }

  returnVehicleInfo = {
    type: OrderVehicleInfoModel
  }

  addedServiceItemList = {
    type: Array,
    itemType: OrderServiceModel
  }

  deductionExpenseItemList = {
    type: Array,
    itemType: OrderExpenseModel
  }

  depositVO = {
    type: OrderPickupReturnDepositModel
  }

  refundExpenseItemList = {
    type: Array,
    itemType: OrderExpenseModel
  }
}

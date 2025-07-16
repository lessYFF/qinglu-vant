import { DataX } from "@lihzsky/data-x";
import { OrderDepositModel } from "./OrderDepositModels/OrderDepositModel";
import { ServiceItemAmountModel } from "./OrderServiceModels/ServiceItemAmountModel";
import { PickupReturnFeeModel } from "./PickupReturnFeeModel";
import { InteriorItemModel } from "./InteriorItemModel";

export class OrderPickupReturnModel extends DataX {
  addedServiceItemList = {
    type: Array,
    itemType: ServiceItemAmountModel
  }

  pickupInteriorList = {
    type: Array,
    itemType: InteriorItemModel
  }

  deductionExpenseItemList = {
    type: Array,
    itemType: Object
  }

  depositVO = {
    type: OrderDepositModel
  }

  pickupVehicleInfo = {
    type: Object
  }

  returnVehicleInfo = {
    type: Object
  }

  refundExpenseItemList = {
    type: Array,
    itemType: PickupReturnFeeModel
  }
}

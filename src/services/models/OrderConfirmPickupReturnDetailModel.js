import { DataX } from "@lihzsky/data-x";
import { Figure } from "../../utils";
import { OrderDepositModel } from "./OrderDepositModels/OrderDepositModel";
import { OrderDetailInfoModel } from "./OrderDetailModels/OrderDetailInfoModel";
import { OrderPickupAndReturnModel } from "./OrderPickupAndReturnModel";
import { OrderRenewalModel } from "./OrderRenewalModels/OrderRenewalModel";
import { ServiceItemAmountModel } from "./OrderServiceModels/ServiceItemAmountModel";
import { OrderVehicleDamageInfoModel } from './OrderVehicleDamageInfoModel';
import { OrderVehicleIllegalInfoModel } from './OrderVehicleIllegalInfoModel';
import { OrderWaitPayModel } from "./OrderWaitPayModel";
;
export class OrderConfirmPickupReturnDetailModel extends DataX {
  addedServiceList = {
    type: Array,
    itemType: ServiceItemAmountModel
  }

  illegalDepositAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.illegalDepositAmount)
  }

  insuranceServiceList = {
    type: Array,
    itemType: ServiceItemAmountModel
  }

  orderDepositVo = {
    type: OrderDepositModel
  }

  orderInfoVo = {
    type: OrderDetailInfoModel
  }

  orderPickReturnVo = {
    type: OrderPickupAndReturnModel
  }

  payTypeList = {
    type: Array,
    itemType: Object
  }

  remarkTypeList = {
    type: Array,
    itemType: Object
  }

  remarkVoList = {
    type: Array,
    itemType: Object
  }

  rentDepositAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.rentDepositAmount)
  }

  pickDriver = {
    type: Object
  }

  returnDriver = {
    type: Object
  }

  rerentOrderVoList = {
    type: Array,
    itemType: OrderRenewalModel
  }

  vehicleDamageOrderVoList = {
    type: Array,
    itemType: OrderVehicleDamageInfoModel
  }

  vehicleIllegalOrderVoList = {
    type: Array,
    itemType: OrderVehicleIllegalInfoModel
  }

  waitPayList = {
    type: Array,
    itemType: OrderWaitPayModel
  }
}

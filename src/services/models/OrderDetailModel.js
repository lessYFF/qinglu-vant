/*
 * @Author: duhuo
 * @Date: 2022-11-12 11:00:52
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-12 15:17:45
 * @Description: Do not edit
 */
import { DataX } from "@lihzsky/data-x"
import { OrderCancelRuleModel } from "./OrderCancelRuleModel"
import { OrderDepositModel } from "./OrderDepositModels/OrderDepositModel"
import { OrderDetailInfoModel } from "./OrderDetailModels/OrderDetailInfoModel"
import { OrderPickupAndReturnModel } from "./OrderPickupAndReturnModel"
import { OrderRemarkModel } from "./OrderRemarkModel"
import { OrderRenewalModel } from "./OrderRenewalModels/OrderRenewalModel"
import { OrderServiceModel } from "./OrderServiceModels/OrderServiceModel"
import { OrderVehicleDamageInfoModel } from './OrderVehicleDamageInfoModel'
import { OrderVehicleIllegalInfoModel } from './OrderVehicleIllegalInfoModel'
import { OrderWaitPayModel } from "./OrderWaitPayModel"

export class OrderDetailModel extends DataX {
  contractPic = {
    type: Object,
  }

  cancelRuleVoList = {
    type: Array,
    itemType: OrderCancelRuleModel
  }

  pickDriver = {
    type: Object
  }

  returnDriver = {
    type: Object
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

  remarkVoList = {
    type: Array,
    itemType: OrderRemarkModel
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

  insuranceServiceList = {
    type: Array,
    itemType: OrderServiceModel
  }

  addedServiceList = {
    type: Array,
    itemType: OrderServiceModel
  }

  waitPayList = {
    type: Array,
    itemType: OrderWaitPayModel
  }
}

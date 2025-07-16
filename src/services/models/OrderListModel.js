/*
 * @Author: duhuo
 * @Date: 2022-11-27 14:21:19
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-27 16:09:10
 * @Description: Do not edit
 */
import { DataX } from "@lihzsky/data-x"
import { OrderItemInfoModel } from "./OrderDetailModels/OrderItemInfoModel"

export class OrderListModel extends DataX {
  count = {
    type: Number,
    field: 'currentCount'
  }

  list = {
    type: Array,
    itemType: OrderItemInfoModel,
    field: 'currentList'
  }
}

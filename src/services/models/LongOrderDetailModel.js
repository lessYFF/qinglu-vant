/*
 * @Author: mayou
 * @Date: 2023-03-10 23:35
 * @LastEditors: mayou
 * @LastEditTime: 2023-03-10 23:35
 * @Description: Do not edit
 */
import { DataX } from "@lihzsky/data-x"
import { OrderDetailModel } from './OrderDetailModel'

export class LongOrderDetailModel extends DataX {
  illegalDeposit = {
    type: Number
  }

  orderDetailVo = {
    type: OrderDetailModel
  }

  payAmount = {
    type: Number
  }

  payMode = {
    type: Number
  }

  payVoList = {
    type: Array
  }

  rentDeposit = {
    type: Number
  }
}

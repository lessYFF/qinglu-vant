/**
 * 订单押金政策模型
 */
import { DataX } from "@lihzsky/data-x"
import { Figure } from "../../utils"

export class OrderDepositPolicyModel extends DataX {
  /**
   * 违章押金金额字符串（元）
   */
  illegalDepositAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.illegalDepositAmount)
  }

  /**
   * 租车押金金额字符串（元）
   */
  rentDepositAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.rentDepositAmount)
  }
}

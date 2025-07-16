import { DataX } from "@lihzsky/data-x";
import { Figure } from "../../../utils";

export class ServiceItemAmountModel extends DataX {
  amountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.amount)
  }

  totalAmountStr = {
    type: String,
    // 这里原本是前端自己乘出来的，但实际后端返回的 quantity 并不能真的代表数量，改取后端计算的总金额
    // field: (data) => Figure.toYuan(data.price * data.quantity)
    field: (data) => Figure.toYuan(data.amount)
  }

  detailStr = {
    type: String,
    field: (data) => `${!data.select ? '+' : ''} ￥${Figure.toYuan(data.price)}/${data.unit} 共${data.detail}`
  }

  detailAmountStr = {
    type: String,
    field: (data) => `${!data.select ? '+' : ''} ￥${Figure.toYuan(data.amount)}${!data.select ? '（补差价）' : ''}`
  }

  nameStr = {
    type: String,
    field: (data) => !data.select ? `${data.name}（补差价）` : data.name
  }

  priceStr = {
    type: String,
    field: (data) => Figure.toYuan(data.price)
  }

  includeInTotalAmountStr = {
    type: String,
    field: (data) => Figure.toYuan(data.includeInTotalAmount)
  }
}

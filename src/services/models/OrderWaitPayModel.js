import { DataX } from "@lihzsky/data-x"
import { Figure, Tempo } from "../../utils"

export class OrderWaitPayModel extends DataX {
  amountStr = {
    type: Figure.toYuan(data.amount)
  }

  latestPayTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.latestPayTime)
  }
}

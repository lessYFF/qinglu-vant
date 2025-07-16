import { DataX } from "@lihzsky/data-x"
import { Tempo } from '../../utils'

export class OrderRemarkModel extends DataX {
  createTimeStr = {
    type: String,
    field: (data) => Tempo.format(data.createTime)
  }
}

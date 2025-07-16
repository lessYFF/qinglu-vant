import { DataX } from "@lihzsky/data-x";
import { Figure } from "../../../utils";

export class ServiceItemModel extends DataX {
  priceStr = {
    type: String,
    field: (data) => Figure.toYuan(data.price)
  }
}

import { DataX } from "@lihzsky/data-x";

export class InteriorItemModel extends DataX {
  damaged = {
    type: Number, // 损坏：1 未损坏：0 
  }
  
  id = {
    type: Number,
  }

  inspectionId = {
    type: Number,
  }

  name = {
    type: String,
  }
}

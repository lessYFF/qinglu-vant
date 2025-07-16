import { OrderAPI } from "../apis";
import { OrderIllegalRecordModel } from "../models/OrderIllegalRecordModel";

export default {
  getAll(payload) {
    return OrderAPI.fetchIllegalOrderList(payload).then((data) => {
      const model = new OrderIllegalRecordModel();

      return data?.model?.map((item) => {
        model.transform(item);

        return model.valueOf();
      }) ?? [];
    });
  },

  create(payload) {
    return OrderAPI.createAIllegalOrder(payload)
  },

  refund(payload) {
    return OrderAPI.applyIllegalRefund(payload)
  }
}
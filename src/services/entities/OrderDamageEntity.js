import { OrderAPI } from "../apis";
import { OrderDamageRecordModel } from "../models/OrderDamageRecordModel";

export default {
  getAll(payload) {
    return OrderAPI.fetchDamageOrderList(payload).then((data) => {
      const model = new OrderDamageRecordModel();

      return data?.model?.map((item) => {
        model.transform(item);

        return model.valueOf();
      }) ?? [];
    });
  },

  create(payload) {
    return OrderAPI.createADamageOrder(payload)
  },

  refund(payload) {
    return OrderAPI.applyDamageRefund(payload)
  }
}
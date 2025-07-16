import { OrderAPI } from "../apis";
import { OrderRenewalRecordModel } from "../models/OrderRenewalRecordModel";
import { OrderServiceModel } from "../models/OrderServiceModels/OrderServiceModel";
import { RenewalPrecalculateModel } from "../models/RenewalPrecalculateModel";

export default {
  getPreCalculatePrice(payload) {
    return OrderAPI.preCalculatePrice(payload).then((data) => {
      const model = new RenewalPrecalculateModel();

      model.transform(data);

      return model.valueOf();
    });
  },

  getAll(payload) {
    return OrderAPI.fetchRenewalRecord(payload).then((data) => {
      const model = new OrderRenewalRecordModel()

      return data?.map((item) => {
        model.transform(item)

        return model.valueOf()
      }) ?? []
    })
  },

  getRenewalServices(payload) {
    return OrderAPI.fetchRenewalServiceList(payload).then((data) => {
      const model = new OrderServiceModel()

      return data?.map((item) => {
        model.transform(item)

        return model.valueOf()
      }) ?? []
    })
  },

  create(payload) {
    return OrderAPI.createAnLeaseRenewal(payload)
  },

  cancel(payload) {
    return OrderAPI.cancelAnRenewalOrder(payload)
  }
}

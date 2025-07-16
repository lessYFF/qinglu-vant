/*
 * @Author: duhuo
 * @Date: 2022-11-19 10:35:58
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-19 10:53:57
 * @Description: 备注
 */
import { OrderAPI } from '../apis'
import { OrderRemarkModel } from '../models/OrderRemarkModel'

export default {
  get(params) {
    return OrderAPI.fetchAllRemarks(params).then((data) => {
      const model = new OrderRemarkModel()

      return data?.map(item => {
        model.transform(item)

        return model.valueOf()
      }) ?? []
    })
  },

  create(payload) {
    return OrderAPI.createAnRemark(payload)
  }
}

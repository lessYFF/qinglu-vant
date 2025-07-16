import { PersonAPI } from '../apis'
import { UserCertificateModel } from '../models/UserCertificateModel'

export default {
  getPersonModel() {
    const model = new UserCertificateModel()

    model.transform()

    return model.valueOf()
  },

  get(payload) {
    return PersonAPI.get(payload).then((data) => {
      const model = new UserCertificateModel()

      model.transform(data)

      return model.valueOf()
    })
  },

  update(id, payload) {
    return PersonAPI.update({ orderId: id }, payload)
  }
}
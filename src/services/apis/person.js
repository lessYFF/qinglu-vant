import http from '../http.config';

export default {
  update(params, body) {
    return http.post('/api/order/v1/certificate/update', body, { params })
  },

  get(params) {
    return http.post('/api/order/v1/certificate/detail', null, { params })
  }
}

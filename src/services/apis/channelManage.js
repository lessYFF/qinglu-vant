import http from '../http.config'

export function getListChannel() {
  return http.post('/api/apiConn/v1/listChannel')
}

export function saveChannel(data) {
  return http.post('/api/apiConn/v1/save',data)
}
export function feizhuLogin(data) {
  return http.post('/api/feizhu/login/v1/login', data)
}




export function feizhuLoginStatus(data) {
  return http.post('/api/feizhu/login/v1/login/status', data)
}


export function closeUnbind(data) {
  return http.post(`/api/apiConn/v1/unbind?id=${data.id}&channelRegPass=${data.channelRegPass}&status=${data.status}`)
}
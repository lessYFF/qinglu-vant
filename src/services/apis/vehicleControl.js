import { data } from 'autoprefixer'
import http from '../http.config'
export function getDevicePage(data) {
  return http.post('/api/vehicle/deviceSetting/devicePage', data)
}

export function getStoreList() {
  return http.post('/api/store/v1/storeListByAuth')
}

export function getVehicleState(data) {
  return http.post('/api/vehicle/deviceSetting/vehicleState',data)
}

export function setInterceptDevice(data) {
  return http.post('/api/vehicle/deviceSetting/interceptDevice',data)
}

export function setControlDevice(data) {
  return http.post('/api/vehicle/deviceSetting/controlDevice',data)
}


// 查询自助取还记录
export function getPickReturnOperation(data) {
  return http.post('api/order/vehicle/pick_return/v1/pick_return_operation/list',data)
}
// 自助取还-商家验车
export function setScheduledCar(data) {
  return http.post('/api/order/vehicle/pick_return/v1/scheduled_car',data)
}

// 自助取还-商家验车
export function setConfirmReturn(data) {
  return http.post('/api/order/vehicle/pick_return/v1/confirmReturn',data)
}



export function fetchDetail(params) {
  return http.post(`/api/order/v1/detail?orderId=${params}`)
}


export function getSelfExpenseItem(params) {
  return http.post(`/api/order/vehicle/pick_return/v1/self_expense_item?orderId=${params}`)
}

// export function getVehicleByOrder(params) {
//   return http.post(`/api/order/v1/available_vehicle/list?orderId=${params.orderId}&vehicleModelId=${params.vehicleModelId}`)
// }
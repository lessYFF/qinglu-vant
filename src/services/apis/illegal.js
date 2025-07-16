import http from '../http.config'

export const statusDef = [
  { name: '待处理', value: 0 },
  { name: '已处理', value: 1 },
  { name: '无需处理', value: 2 },
]

export function getIllegals(data) {
  return http.post('/api/vehicle/illegal_order/list/v1', data)
}

export function getIllegalUnhandleNum() {
  return http.post('/api/vehicle/illegal_order/unhandle_num/v1', {})
}

export function getIllegalDetail(id) {
  return http.post('/api/vehicle/illegal_order/detail/v1?id=' + id, {})
}

export function getStores() {
  return http.post('/api/store/v1/storeListByAuth', {})
}

export async function createIllegalFromVehicle(data) {
  return http.post('/api/vehicle/illegal_order/save/v1', data)
}

export async function handleIllegal(data) {
  return http.post('/api/vehicle/illegal_order/handle/v1', data)
}

export async function createIllegalFromOrder(data) {
  return http.post('/api/illegal_order/save/v1', data)
}

export async function getOrderDetail(orderId) {
  return http.post('/api/order/v1/detail?orderId=' + orderId, {})
}

export async function getCities() {
  return http.post('/api/area/v1/list?depth=2', {})
}

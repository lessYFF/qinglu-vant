import http from '../http.config'
export function getStockOccupy(data) {
  return http.post('/api/stock/v1/stockOccupy', data)
}

// export function getOffline(data) {
//   return http.post('/api/stock/v1/temporary_offline', data)
// }

export function getStoreList(data) {
  return http.post('/api/store/v1/storeListByAuth', data)
}

// // 释放库存
// export function setRelease(params) {
//   return http.get(`/api/stock/v2/release?id=${params.id}`)
// }

// 释放库存
export function setStockDelete(data) {
  return http.post('/api/stock/v1/stockDelete?id=' + data.id, data)
}

// 释放时间间隔
export function setRelease(data) {
  return http.post('/api/stock/v1/release?id=' + data.id, data)
}

// 临时停售
export function setTemporaryOffline(data) {
  return http.post('/api/stock/v1/temporary_offline', data)
}

// 强制改排
export function getVehicleInfoSelect(data) {
  return http.post('/api/vehicle/info/v1/select', data)
}

// 强制改排
export function setForceUpdate(params) {
  return http.post(`/api/order/v1/plan_vehicle/force_update?orderId=${params.orderId}&vehicleId=${params.vehicleId}`)
}

/**
 * 获取车辆列表
 * @param {object} params
 * @returns
 */
export function getVehicleByOrder(params) {
  return http.post(`/api/order/v1/available_vehicle/list?orderId=${params.orderId}&vehicleModelId=${params.vehicleModelId}`)
}


/**
   * 排车
   * @param {object} params
   * @returns
   */
export function arrangeVehicle (params) {
  return http.post('/api/order/v1/plan_vehicle/update', null, { params })
}

// // 获取车型列表
// export function getModelsOfStore(storeId) {
//   return http.post('/api/price/v1/findRelationModelList', `storeId=${storeId}`)
// }

// 获取车型列表2
export function getModelsOfStore(data) {
  return http.post('/api/vehicle/model/v1/queryListByStoreIds', data)
}


// 获取工单详情
export function getMaintenance(id) {
  return http.post(`/api/vehicle/repair_maintenance/detail/v1?id=${id}`)
}



// 获取工单详情
export function getShunting(id) {
  return http.post(`/api/vehicle/shunting/v1/get_by_id?id=${id}`)
}

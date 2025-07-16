import { data } from 'autoprefixer'
import http from '../http.config'
export function getDailyOverview(data) {
  return http.post('/api/report/v1/getDailyOverview', data)
}


export function getStoreList(data) {
  // /api/store/v1/storeListByMerchant
  return http.post('/api/store/v1/storeListByAuth', data)
}

export function getFindRelationModelList(data) {
  return http.post('/api/vehicle/model/v1/queryListByStoreIds', data)
}
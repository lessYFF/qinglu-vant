import http from '../http.config'

export default {
  getStores(keyword = '') {
    return http.post('/api/store/v1/storeListByAuth', { searchkey: keyword })
  },

  getModelsOfStore(storeId) {
    return http.post('/api/price/v1/findRelationModelList', `searchKey=&storeId=${storeId}`)
  },

  querySummary(storeId, modelId, startTime, endTime) {
    return http.post('/api/stock/v1/stockSummary', {
      storeId,
      vehicleModelId: modelId,
      startTime,
      endTime
    })
  }
}

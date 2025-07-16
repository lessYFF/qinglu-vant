/*
 * @Author: duhuo
 * @Date: 2022-11-06 11:08:10
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-12 11:35:26
 * @Description: Do not edit
 */
import http from '../http.config'

export default {
  doLogin({ userName, password }) {
    return http.post('/api/login/v1/login', {
      userName,
      password,
    })
  },

  access(isPrivate = true) {
    const path = isPrivate ? '/api/upload/v1/accessPrivate' : '/api/upload/v1/access'
    return http.post(path)
  },

  ocr(params) {
    return http.post('/api/upload/v1/ocr', null, { params })
  },

  fetchAreaList(params) {
    return http.post('/api/area/v1/list', null, { params })
  },

  // 小程序登录码
  getLoginQrCode(params) {
    return http.post('/api/mall/traffic/v1/getLoginQrCode', null, {
      params,
    })
  },

  // 小程序登录状态
  getLoginStatus(params) {
    return http.post('/api/mall/traffic/v1/getLoginStatus', null, {
      params,
    })
  },
}

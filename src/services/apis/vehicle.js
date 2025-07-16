import http from '../http.config';

export default {
	/**
	 * 获取车型列表
	 * @returns []
	 */
	getCarTypeList() {
		return http.post("/api/vehicle/model/v1/list/vehicle_model/select");
	},
	/**
	 * 获取车型对应服务和保险
	 * @param {vehicleModelId} 车型ID
	 * @returns {}
	 */
	getServiceByCarType(params) {
		return http.post("/api/vehicle/model/v1/service/list", null, { params });
	},

	fetchAllServices() {
		return http.post("/api/order/v1/service/all")
	}
}
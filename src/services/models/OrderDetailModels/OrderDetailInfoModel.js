/*
 * @Author: duhuo
 * @Date: 2022-11-27 14:21:19
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-27 14:51:31
 * @Description: Do not edit
 */
import { Tempo } from "../../../utils";
import { OrderMemberModel } from "../OrderMemberModels/OrderMemberModel";
import { OrderBaseInfoModel } from './OrderBaseInfoModel';

export class OrderDetailInfoModel extends OrderBaseInfoModel {
	orderMemberVo = {
		type: OrderMemberModel,
	};

	orderTimeStr = {
		type: String,
		field: (data) => Tempo.format(data.orderTime)
	}

	remainTimeStr = {
		type: String,
		field: (data) =>
			Tempo.toRemain(data.returnDate - data.pickupDate, "d天h小时"),
	};
}

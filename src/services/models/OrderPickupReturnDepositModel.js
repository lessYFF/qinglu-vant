/*
 * @Author: duhuo
 * @Date: 2022-11-27 14:21:19
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-27 17:03:57
 * @Description: Do not edit
 */
import { DataX } from "@lihzsky/data-x";
import { getPayStatusStr, getPayTypeStr } from "../../constants";
import { Figure } from "../../utils";

export class OrderPickupReturnDepositModel extends DataX {
	illegalOrderDepositAmountStr = {
		type: String,
		field: (data) => Figure.toYuan(data.illegalOrderDepositAmount),
	};

	depositPayTypeStr = {
		type: String
	}

	depositStatusStr = {
		type: String,
		field: (data) => getPayStatusStr(data.depositStatus),
	};

	depositPayTypeStr = {
		type: String,
		field: (data) => getPayTypeStr(data.depositPayType),
	};

	vehicleDepositAmountStr = {
		type: String,
		field: (data) => Figure.toYuan(data.vehicleDepositAmount),
	};
}

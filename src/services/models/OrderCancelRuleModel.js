/*
 * @Author: duhuo
 * @Date: 2022-11-12 14:39:27
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-12 15:17:49
 * @Description: Do not edit
 */
import { DataX } from "@lihzsky/data-x";
import { getTimeTypeStr } from "../../constants";
import { Figure } from "../../utils";

export class OrderCancelRuleModel extends DataX {
	costAmountStr = {
		type: String,
		field: (data) => Figure.toYuan(data.costAmount),
	};

	timeTypeStr = {
		type: String,
		field: (data) => getTimeTypeStr(data.timeType),
	};
}

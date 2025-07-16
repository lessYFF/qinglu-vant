// 订单实体类
import { OrderDepositPolicyModel } from '../models/OrderDepositPolicyModel'
import { Figure } from '../../utils'

class OrderEntity {
  constructor(data = {}) {
    this.id = data.id || null
    this.orderNo = data.orderNo || ''
    this.customerName = data.customerName || ''
    this.customerPhone = data.customerPhone || ''
    this.vehicleModel = data.vehicleModel || ''
    this.vehiclePlate = data.vehiclePlate || ''
    this.startTime = data.startTime || null
    this.endTime = data.endTime || null
    this.amount = data.amount || 0
    this.deposit = data.deposit || 0
    this.status = data.status || 'pending'
    this.statusText = data.statusText || '待确认'
    this.createTime = data.createTime || new Date()
    this.updateTime = data.updateTime || new Date()
  }

  // 获取订单状态文本
  getStatusText() {
    const statusMap = {
      pending: '待确认',
      confirmed: '已确认',
      ongoing: '进行中',
      completed: '已完成',
      cancelled: '已取消'
    }
    return statusMap[this.status] || '未知状态'
  }

  // 获取订单总金额
  getTotalAmount() {
    return this.amount + this.deposit
  }

  // 检查订单是否可以取消
  canCancel() {
    return ['pending', 'confirmed'].includes(this.status)
  }

  // 检查订单是否可以修改
  canModify() {
    return ['pending'].includes(this.status)
  }

  // 获取订单持续时间（天数）
  getDuration() {
    if (!this.startTime || !this.endTime) return 0
    const start = new Date(this.startTime)
    const end = new Date(this.endTime)
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  }

  // 转换为JSON对象
  toJSON() {
    return {
      id: this.id,
      orderNo: this.orderNo,
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      vehicleModel: this.vehicleModel,
      vehiclePlate: this.vehiclePlate,
      startTime: this.startTime,
      endTime: this.endTime,
      amount: this.amount,
      deposit: this.deposit,
      status: this.status,
      statusText: this.getStatusText(),
      createTime: this.createTime,
      updateTime: this.updateTime
    }
  }

  // 从JSON对象创建实例
  static fromJSON(data) {
    return new OrderEntity(data)
  }

  // 获取取消政策详情 - Mock API
  static getCancelPolicyDetail(params) {
    const { orderId } = params;
    // 模拟取消政策数据
    const mockCancelPolicyData = [
      {
        "cancelTimeText": "2025-07-10 13:00:00前",
        "beforeHourText": "原取车时间8.0小时前",
        "costRule": 0,
        "beforeHourPer": 0,
        "timeType": 1,
        "costAmount": 0,
        "now": false
      },
      {
        "cancelTimeText": "2025-07-10 13:00:00至2025-07-10 21:00:00",
        "beforeHourText": "原取车时间8.0小时前至原取车时间",
        "costRule": 0,
        "beforeHourPer": 2,
        "timeType": 2,
        "costAmount": 300,
        "now": false
      },
      {
        "cancelTimeText": "2025-07-10 21:00:00后",
        "beforeHourText": "原取车时间后",
        "costRule": null,
        "beforeHourPer": 5,
        "timeType": 2,
        "costAmount": 600,
        "now": true
      }
    ];

    // 模拟异步请求
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCancelPolicyData);
      }, 500);
    });
  }

  // 获取押金政策模型 - Mock API
  static getDepositPolicyModel() {
    const model = new OrderDepositPolicyModel()
    model.transform()
    return model.valueOf()
  }

  // 获取押金政策详情 - Mock API
  static getDepositPolicyDetail(params) {
    const { orderId } = params;

    // 模拟API返回的原始数据（分为单位）
    const mockApiData = {
      // 免押状态相关
      freeDeposit: false,  // 是否免押
      freeDepositWay: null,  // 免押方式：null=未免押, 0=到店支付, 1=已享免押
      freeDepositWayStr: '',  // 免押方式描述

      // 租车押金相关（分为单位）
      rentDepositAmount: 50000,  // 租车押金金额（分）= 500元
      freeRentDepositAmount: false,  // 是否免收租车押金

      // 违章押金相关（分为单位）
      illegalDepositAmount: 100000,  // 违章押金金额（分）= 1000元
      freeIllegalDepositAmount: false,  // 是否免收违章押金

      // 其他信息
      depositList: ['租车押金', '违章押金'],  // 押金列表
      paymentMethods: ['信用卡', '支付宝', '微信']  // 支付方式
    };

    // 模拟异步请求
    return new Promise((resolve) => {
      setTimeout(() => {
        // 使用OrderDepositPolicyModel转换数据
        const model = new OrderDepositPolicyModel()
        model.transform(mockApiData)
        const transformedData = model.valueOf()

        resolve(transformedData);
      }, 500);
    });
  }

  // 获取服务详情模型 - Mock API
  static getServiceDetailModel() {
    return {
      model: {
        insuranceServiceSettingName: '基础保险服务',
        vehicleDamageDescribe: '车损险全额赔付，包含碰撞、刮擦、自然灾害等损失',
        thirdInsuranceDescribe: '第三者责任险保额100万元，保障第三方人身财产损失',
        stopShippingDescribe: '因事故导致的停运损失，按日租金50%计算，最高赔付30天',
        depreciationDescribe: '车辆折旧费按车辆实际价值和使用年限计算\\r\\n具体标准：\\r\\n- 1年内新车：按购车价5%计算\\r\\n- 1-3年车辆：按购车价10%计算\\r\\n- 3年以上车辆：按购车价15%计算'
      }
    }
  }

  // 获取服务详情 - Mock API
  static getServiceDetail(params) {
    const { orderId, serviceId } = params;

    // 模拟不同服务的详情数据
    const serviceDetails = {
      1: {
        model: {
          insuranceServiceSettingName: '基础保险',
          vehicleDamageDescribe: '车损险全额赔付，包含碰撞、刮擦、自然灾害等损失',
          thirdInsuranceDescribe: '1000万元',
          stopShippingDescribe: '停运费按日租金50%计算，最高赔付30天',
          depreciationDescribe: '车辆折旧费按实际价值计算\\r\\n- 1年内新车：5%\\r\\n- 1-3年车辆：10%\\r\\n- 3年以上：15%'
        }
      },
      2: {
        model: {
          insuranceServiceSettingName: '高级保险',
          vehicleDamageDescribe: '车损险全额赔付，包含所有意外损失，免赔额为0',
          thirdInsuranceDescribe: '第三者责任险保额200万元，覆盖更高风险',
          stopShippingDescribe: '停运费按日租金80%计算，最高赔付60天',
          depreciationDescribe: '车辆折旧费优惠计算\\r\\n- 1年内新车：3%\\r\\n- 1-3年车辆：7%\\r\\n- 3年以上：12%'
        }
      }
    };

    // 默认返回基础服务详情
    const defaultDetail = serviceDetails[1];
    const selectedDetail = serviceDetails[serviceId] || defaultDetail;

    // 模拟异步请求
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(selectedDetail);
      }, 300);
    });
  }
}

export default OrderEntity

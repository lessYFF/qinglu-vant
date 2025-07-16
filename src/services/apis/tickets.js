// 工单相关API
import http from '../http.config'

// 公共
export function getAllVehicles() {
  return Promise.resolve({
    list: [
      {
        id: 1,
        license: '京A12345',
        vehicleModelName: '奔驰E300L',
        brand: '奔驰',
        model: 'E300L',
        checked: false
      },
      {
        id: 2,
        license: '京B67890',
        vehicleModelName: '宝马X3',
        brand: '宝马',
        model: 'X3',
        checked: false
      },
      {
        id: 3,
        license: '京C11111',
        vehicleModelName: '奥迪A6L',
        brand: '奥迪',
        model: 'A6L',
        checked: false
      },
      {
        id: 4,
        license: '京D22222',
        vehicleModelName: '大众帕萨特',
        brand: '大众',
        model: '帕萨特',
        checked: false
      },
      {
        id: 5,
        license: '京E33333',
        vehicleModelName: '丰田凯美瑞',
        brand: '丰田',
        model: '凯美瑞',
        checked: false
      },
      {
        id: 6,
        license: '京F44444',
        vehicleModelName: '本田雅阁',
        brand: '本田',
        model: '雅阁',
        checked: false
      },
      {
        id: 7,
        license: '京G55555',
        vehicleModelName: '别克君威',
        brand: '别克',
        model: '君威',
        checked: false
      },
      {
        id: 8,
        license: '京H66666',
        vehicleModelName: '雪佛兰迈锐宝',
        brand: '雪佛兰',
        model: '迈锐宝',
        checked: false
      },
      {
        id: 9,
        license: '京J77777',
        vehicleModelName: '日产天籁',
        brand: '日产',
        model: '天籁',
        checked: false
      },
      {
        id: 10,
        license: '京K88888',
        vehicleModelName: '马自达阿特兹',
        brand: '马自达',
        model: '阿特兹',
        checked: false
      }
    ]
  })
}

export function getAllVehiclesLicense(data) {
  return Promise.resolve({
    list: [
      {
        id: 1,
        license: '京A12345',
        vehicleModelName: '奔驰E300L'
      },
      {
        id: 2,
        license: '京B67890',
        vehicleModelName: '宝马X3'
      }
    ]
  })
}

export function getAllStores() {
  return Promise.resolve({
    list: [
      {
        id: 1,
        name: '北京朝阳店',
        address: '北京市朝阳区xxx路xxx号'
      },
      {
        id: 2,
        name: '北京海淀店',
        address: '北京市海淀区xxx路xxx号'
      }
    ]
  })
}

export function getDrivers(storeId) {
  return Promise.resolve({
    list: [
      {
        id: 1,
        name: '张师傅',
        phone: '13800138000',
        storeId: storeId
      },
      {
        id: 2,
        name: '李师傅',
        phone: '13800138001',
        storeId: storeId
      }
    ]
  })
}

// 获取订单信息
export function getOrders(vehicleId) {
  return Promise.resolve({
    list: [
      {
        id: 1,
        orderNo: 'QL202312010001',
        vehicleId: vehicleId,
        customerName: '张三',
        status: 'ongoing'
      }
    ]
  })
}

// 获取车辆详情
export function getVehicleDetail(id) {
  return Promise.resolve({
    id: id,
    license: '京A12345',
    vehicleModelName: '奔驰E300L',
    brand: '奔驰',
    model: 'E300L',
    year: 2022,
    color: '白色'
  })
}

// 调车单相关
export function getShuntings(data) {
  return Promise.resolve({
    list: [
      {
        id: 1,
        workOrderNo: 'DC202312010001',
        vehicleModelName: '奔驰E300L',
        license: '京A12345',
        shuntingStatus: 1,
        fromStore: '北京朝阳店',
        toStore: '北京海淀店',
        createTime: new Date().toISOString()
      }
    ]
  })
}

export function cancelShunting(id, reason) {
  return Promise.resolve({
    code: 200,
    message: '调车单取消成功'
  })
}

export function getShuntingDetail(id) {
  return Promise.resolve({
    id: id,
    workOrderNo: 'DC202312010001',
    vehicleModelName: '奔驰E300L',
    license: '京A12345',
    shuntingStatus: 1,
    fromStore: '北京朝阳店',
    toStore: '北京海淀店',
    reason: '门店调配',
    createTime: new Date().toISOString()
  })
}

export function saveShunting(data, config) {
  return Promise.resolve({
    id: Date.now(),
    ...data
  })
}

export function confirmShunting(id) {
  return Promise.resolve({
    code: 200,
    message: '调车确认成功'
  })
}

// 维保单相关
export async function getRepairDepots() {
  return Promise.resolve({
    list: [
      {
        id: 1,
        depotName: '北京维修厂',
        address: '北京市朝阳区xxx路xxx号'
      },
      {
        id: 2,
        depotName: '上海维修厂',
        address: '上海市浦东新区xxx路xxx号'
      }
    ]
  })
}

export async function addRepairDepot(name) {
  return Promise.resolve({
    id: Date.now(),
    depotName: name
  })
}

export async function removeRepairDepot(id) {
  return Promise.resolve({
    code: 200,
    message: '删除成功'
  })
}

export async function getExpenseItems() {
  return Promise.resolve({
    list: [
      {
        id: 1,
        itemName: '机油更换',
        category: '保养'
      },
      {
        id: 2,
        itemName: '轮胎更换',
        category: '维修'
      }
    ]
  })
}

export async function addExpenseItem(name) {
  return Promise.resolve({
    id: Date.now(),
    itemName: name
  })
}

export async function removeExpenseItem(id) {
  return Promise.resolve({
    code: 200,
    message: '删除成功'
  })
}

export async function createMaintaince(data) {
  return Promise.resolve({
    id: Date.now(),
    ...data
  })
}

export async function handleMaintaince(data) {
  return Promise.resolve({
    code: 200,
    message: '处理成功'
  })
}

export async function cancelMaintaince(id, reason) {
  return Promise.resolve({
    code: 200,
    message: '维保单取消成功'
  })
}

export async function queryMaintaince(query) {
  return Promise.resolve({
    list: [
      {
        id: 1,
        workOrderNo: 'WB202312010001',
        vehicleModelName: '奔驰E300L',
        licenseNo: '京A12345',
        workOrderType: 0,
        status: 1,
        createTime: new Date().toISOString()
      }
    ]
  })
}

export async function getMaintainceDetail(id) {
  return Promise.resolve({
    id: id,
    workOrderNo: 'WB202312010001',
    vehicleModelName: '奔驰E300L',
    licenseNo: '京A12345',
    workOrderType: 0,
    status: 1,
    description: '定期保养',
    createTime: new Date().toISOString()
  })
}

// 年检单相关
export async function createYearly(data) {
  return Promise.resolve({
    id: Date.now(),
    ...data
  })
}

export async function handleYearly(id) {
  return Promise.resolve({
    code: 200,
    message: '处理成功'
  })
}

export async function cancelYearly(id, reason) {
  return Promise.resolve({
    code: 200,
    message: '年检单取消成功'
  })
}

export async function queryYearly(query) {
  return Promise.resolve({
    list: [
      {
        id: 1,
        workOrderNo: 'NJ202312010001',
        vehicleModelName: '奔驰E300L',
        licenseNo: '京A12345',
        status: 0,
        inspectionDate: new Date().toISOString(),
        createTime: new Date().toISOString()
      }
    ]
  })
}

export async function getYearlyDetail(id) {
  return Promise.resolve({
    id: id,
    workOrderNo: 'NJ202312010001',
    vehicleModelName: '奔驰E300L',
    licenseNo: '京A12345',
    status: 0,
    inspectionDate: new Date().toISOString(),
    createTime: new Date().toISOString()
  })
}

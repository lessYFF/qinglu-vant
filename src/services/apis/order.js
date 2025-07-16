// 订单相关API
const OrderAPI = {
  // 获取订单列表
  getOrderList: (params) => {
    return Promise.resolve({
      code: 200,
      data: {
        list: [
          {
            id: 1,
            orderNo: 'QL202312010001',
            customerName: '张三',
            vehicleModel: '奔驰E300L',
            amount: 500,
            status: 'ongoing',
            statusText: '进行中'
          }
        ],
        total: 1
      }
    })
  },

  // 获取订单详情
  getOrderDetail: (orderId) => {
    return Promise.resolve({
      code: 200,
      data: {
        id: orderId,
        orderNo: 'QL202312010001',
        customerName: '张三',
        vehicleModel: '奔驰E300L',
        amount: 500,
        status: 'ongoing',
        statusText: '进行中'
      }
    })
  },

  // 创建订单
  createOrder: (orderData) => {
    return Promise.resolve({
      code: 200,
      data: {
        id: Date.now(),
        ...orderData
      }
    })
  },

  // 更新订单
  updateOrder: (orderId, orderData) => {
    return Promise.resolve({
      code: 200,
      data: {
        id: orderId,
        ...orderData
      }
    })
  },

  // 取消订单
  cancelOrder: (orderId) => {
    return Promise.resolve({
      code: 200,
      message: '订单取消成功'
    })
  },

  /**
   * 获取司机列表 - 模拟原项目API: /api/user/v1/driver/box
   * @param {object} params - 包含storeId等参数
   * @returns {Promise} 返回司机列表数据
   */
  getDriverListByStore: (params) => {
    const { storeId } = params;

    // 根据不同门店ID返回不同的司机数据
    const getDriversByStoreId = (storeId) => {
      const storeDrivers = {
        1: [ // 取车门店司机（pickupStoreId: 1）
          {
            id: 232,
            roleId: 5,
            name: "司机-test4",
            loginName: null,
            mobile: "13800138001",
            email: null,
            simpleName: "test4"
          },
          {
            id: 233,
            roleId: 5,
            name: "店员-测试1",
            loginName: null,
            mobile: "13800138002",
            email: null,
            simpleName: "测试1"
          },
          {
            id: 234,
            roleId: 5,
            name: "内测账号-kmtest",
            loginName: null,
            mobile: "13800138003",
            email: null,
            simpleName: "kmtest"
          },
          {
            id: 235,
            roleId: 5,
            name: "test-supantest",
            loginName: null,
            mobile: "13800138005",
            email: null,
            simpleName: "supantest"
          }
        ],
        2: [ // 还车门店司机（returnStoreId: 2）
          {
            id: 236,
            roleId: 5,
            name: "内测账号-mzytest",
            loginName: null,
            mobile: "13800138004",
            email: null,
            simpleName: "mzytest"
          },
          {
            id: 237,
            roleId: 5,
            name: "管理员-管理员",
            loginName: null,
            mobile: "13800138006",
            email: null,
            simpleName: "管理员"
          },
          {
            id: 238,
            roleId: 5,
            name: "管理员-wukong",
            loginName: null,
            mobile: "13800138007",
            email: null,
            simpleName: "wukong"
          },
          {
            id: 239,
            roleId: 5,
            name: "管理员-test11",
            loginName: null,
            mobile: "13800138008",
            email: null,
            simpleName: "test11"
          }
        ]
      };

      return storeDrivers[storeId] || [];
    };

    const mockDriverList = getDriversByStoreId(storeId);

    // 模拟原项目的响应格式
    const response = {
      code: 200,
      message: 'success',
      model: mockDriverList
    };

    // 立即返回Promise，模拟异步调用
    return new Promise((resolve) => {
      // 添加微小延迟模拟网络请求
      setTimeout(() => {
        resolve(response);
      }, 100);
    });
  },

  // 获取订单司机信息
  getPickDriverInfo: (params) => {
    const { order_id } = params;
    // 返回空数组，表示订单还没有安排司机，需要显示司机选择界面
    // 如果返回有数据，会显示已安排司机的界面
    const driverInfo = [];

    return Promise.resolve(driverInfo);
  },

  // 安排司机
  arrangeDriver: (payload) => {
    const { orderId, pickUpDriverUserId, returnDriverUserId } = payload;
    return Promise.resolve({
      code: 200,
      message: '安排司机成功',
      data: {
        orderId,
        pickUpDriverUserId,
        returnDriverUserId
      }
    });
  }
}

export default OrderAPI

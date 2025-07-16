// 门店相关API
const StoreAPI = {
  // 获取门店列表
  getStoreList: (params) => {
    return Promise.resolve({
      code: 200,
      data: {
        list: [
          {
            id: 1,
            name: '北京朝阳店',
            address: '北京市朝阳区xxx路xxx号',
            phone: '010-12345678',
            distance: 1.2
          },
          {
            id: 2,
            name: '北京海淀店',
            address: '北京市海淀区xxx路xxx号',
            phone: '010-87654321',
            distance: 2.5
          }
        ],
        total: 2
      }
    })
  },

  // 获取门店列表 (兼容fetchStoreList方法名)
  fetchStoreList: (params = {}) => {
    const { searchkey = '' } = params;

    // 模拟门店数据
    const allStores = [
      {
        storeId: 1,
        storeName: '北京朝阳店',
        address: '北京市朝阳区建国路88号',
        phone: '010-12345678',
        distance: 1.2,
        businessHours: '09:00-18:00',
        status: 'open'
      },
      {
        storeId: 2,
        storeName: '北京海淀店',
        address: '北京市海淀区中关村大街1号',
        phone: '010-87654321',
        distance: 2.5,
        businessHours: '09:00-18:00',
        status: 'open'
      },
      {
        storeId: 3,
        storeName: '上海浦东店',
        address: '上海市浦东新区陆家嘴环路1000号',
        phone: '021-12345678',
        distance: 5.8,
        businessHours: '09:00-18:00',
        status: 'open'
      },
      {
        storeId: 4,
        storeName: '广州天河店',
        address: '广州市天河区天河路123号',
        phone: '020-12345678',
        distance: 8.2,
        businessHours: '09:00-18:00',
        status: 'open'
      },
      {
        storeId: 5,
        storeName: '深圳南山店',
        address: '深圳市南山区科技园南区深南大道9999号',
        phone: '0755-12345678',
        distance: 12.5,
        businessHours: '09:00-18:00',
        status: 'open'
      }
    ];

    // 根据搜索关键词过滤门店
    let filteredStores = allStores;
    if (searchkey) {
      filteredStores = allStores.filter(store =>
        store.storeName.includes(searchkey) ||
        store.address.includes(searchkey)
      );
    }

    // 模拟异步请求延迟
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filteredStores);
      }, 300);
    });
  },

  // 获取门店详情
  getStoreDetail: (storeId) => {
    return Promise.resolve({
      code: 200,
      data: {
        id: storeId,
        name: '北京朝阳店',
        address: '北京市朝阳区xxx路xxx号',
        phone: '010-12345678',
        distance: 1.2,
        businessHours: '09:00-18:00',
        services: ['租车', '还车', '维修']
      }
    })
  }
}

export default StoreAPI

// 账户相关API
const AccountAPI = {
  // 获取当前用户信息
  getCurrent: () => {
    return Promise.resolve({
      id: 1,
      username: 'demo_user',
      name: '演示用户',
      email: 'demo@example.com',
      phone: '13800138000',
      avatar: '',
      isAdmin: 0,
      parentId: 1,
      menuAutos: [
        'dashboard',
        'user:view',
        'user:edit',
        'user:add',
        'user:delete',
        'car:view',
        'car:edit',
        'car:ticket',
        'order:view',
        'order:edit',
        'store:view',
        'store:edit'
      ],
      roles: ['user', 'operator'],
      permissions: [
        'dashboard.view',
        'user.view',
        'user.edit',
        'car.view',
        'car.edit',
        'order.view',
        'order.edit'
      ]
    })
  },

  // 用户登录
  login: (credentials) => {
    return Promise.resolve({
      token: 'mock_token_' + Date.now(),
      user: {
        id: 1,
        username: credentials.username,
        name: '演示用户',
        email: 'demo@example.com'
      }
    })
  },

  // 用户登出
  logout: () => {
    return Promise.resolve({
      message: '登出成功'
    })
  },

  // 获取用户列表
  getUsers: (params) => {
    return Promise.resolve({
      list: [
        {
          id: 1,
          username: 'admin',
          name: '管理员',
          email: 'admin@example.com',
          phone: '13800138000',
          status: 'active',
          roles: ['admin']
        },
        {
          id: 2,
          username: 'operator',
          name: '操作员',
          email: 'operator@example.com',
          phone: '13800138001',
          status: 'active',
          roles: ['operator']
        }
      ],
      total: 2,
      pageIndex: params?.pageIndex || 1,
      pageSize: params?.pageSize || 10
    })
  },

  // 获取角色列表
  getRoles: () => {
    return Promise.resolve({
      list: [
        {
          id: 1,
          name: 'admin',
          displayName: '管理员',
          description: '系统管理员，拥有所有权限',
          permissions: ['*']
        },
        {
          id: 2,
          name: 'operator',
          displayName: '操作员',
          description: '业务操作员，拥有基本操作权限',
          permissions: [
            'dashboard.view',
            'user.view',
            'car.view',
            'car.edit',
            'order.view',
            'order.edit'
          ]
        },
        {
          id: 3,
          name: 'viewer',
          displayName: '查看者',
          description: '只读用户，只能查看数据',
          permissions: [
            'dashboard.view',
            'user.view',
            'car.view',
            'order.view'
          ]
        }
      ]
    })
  },

  // 获取菜单列表
  getMenus: () => {
    return Promise.resolve([
      {
        id: 1,
        name: 'dashboard',
        title: '仪表盘',
        icon: 'dashboard',
        path: '/dashboard',
        children: []
      },
      {
        id: 2,
        name: 'user',
        title: '用户管理',
        icon: 'user',
        path: '/user',
        children: [
          {
            id: 21,
            name: 'user:view',
            title: '查看用户',
            path: '/user/list'
          },
          {
            id: 22,
            name: 'user:edit',
            title: '编辑用户',
            path: '/user/edit'
          },
          {
            id: 23,
            name: 'user:add',
            title: '添加用户',
            path: '/user/add'
          },
          {
            id: 24,
            name: 'user:delete',
            title: '删除用户',
            path: '/user/delete'
          }
        ]
      },
      {
        id: 3,
        name: 'car',
        title: '车辆管理',
        icon: 'car',
        path: '/car',
        children: [
          {
            id: 31,
            name: 'car:view',
            title: '查看车辆',
            path: '/car/list'
          },
          {
            id: 32,
            name: 'car:edit',
            title: '编辑车辆',
            path: '/car/edit'
          },
          {
            id: 33,
            name: 'car:ticket',
            title: '车辆工单',
            path: '/car/ticket'
          }
        ]
      },
      {
        id: 4,
        name: 'order',
        title: '订单管理',
        icon: 'order',
        path: '/order',
        children: [
          {
            id: 41,
            name: 'order:view',
            title: '查看订单',
            path: '/order/list'
          },
          {
            id: 42,
            name: 'order:edit',
            title: '编辑订单',
            path: '/order/edit'
          }
        ]
      },
      {
        id: 5,
        name: 'store',
        title: '门店管理',
        icon: 'store',
        path: '/store',
        children: [
          {
            id: 51,
            name: 'store:view',
            title: '查看门店',
            path: '/store/list'
          },
          {
            id: 52,
            name: 'store:edit',
            title: '编辑门店',
            path: '/store/edit'
          }
        ]
      }
    ])
  },

  // 创建用户
  createUser: (userData) => {
    return Promise.resolve({
      id: Date.now(),
      ...userData,
      createTime: new Date().toISOString()
    })
  },

  // 更新用户
  updateUser: (userId, userData) => {
    return Promise.resolve({
      id: userId,
      ...userData,
      updateTime: new Date().toISOString()
    })
  },

  // 删除用户
  deleteUser: (userId) => {
    return Promise.resolve({
      message: '用户删除成功'
    })
  },

  // 修改密码
  changePassword: (passwordData) => {
    return Promise.resolve({
      message: '密码修改成功'
    })
  },

  // 重置密码
  resetPassword: (userId) => {
    return Promise.resolve({
      message: '密码重置成功',
      newPassword: 'temp123456'
    })
  }
}

export { AccountAPI }
export default AccountAPI

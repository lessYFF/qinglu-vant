import Mock from 'mockjs'

// 业务组件Mock数据
const businessMocks = {
  // 订单搜索栏组件
  orderSearchBar: (scenario = 'default') => {
    const baseData = {
      placeholder: '请输入订单号或手机号',
      filters: [
        { label: '全部', value: 'all' },
        { label: '待确认', value: 'pending' },
        { label: '已确认', value: 'confirmed' },
        { label: '进行中', value: 'ongoing' },
        { label: '已完成', value: 'completed' },
        { label: '已取消', value: 'cancelled' }
      ],
      searchHistory: Mock.mock({
        'list|0-5': ['@word(5,15)']
      }).list
    }

    switch (scenario) {
      case 'simple':
        return {
          placeholder: '搜索订单',
          filters: []
        }
      case 'withHistory':
        return {
          ...baseData,
          searchHistory: ['18888888888', 'QL202312010001', '张三', '奔驰E300L']
        }
      default:
        return baseData
    }
  },

  // 车辆外观组件
  vehicleAppearance: (scenario = 'default') => {
    const baseData = {
      list: [
        { appearanceNo: 1, appearanceName: '左前叶子板', damaged: 0 },
        { appearanceNo: 2, appearanceName: '前保', damaged: 0 },
        { appearanceNo: 3, appearanceName: '右前叶子板', damaged: 0 },
        { appearanceNo: 4, appearanceName: '左前轮', damaged: 0 },
        { appearanceNo: 5, appearanceName: '前机盖及前挡风', damaged: 0 },
        { appearanceNo: 6, appearanceName: '右前轮', damaged: 0 },
        { appearanceNo: 7, appearanceName: '左后视镜', damaged: 0 },
        { appearanceNo: 8, appearanceName: '左前门', damaged: 0 },
        { appearanceNo: 9, appearanceName: '左后门', damaged: 0 },
        { appearanceNo: 10, appearanceName: '车顶', damaged: 0 },
        { appearanceNo: 11, appearanceName: '右后视镜', damaged: 0 },
        { appearanceNo: 12, appearanceName: '右前门', damaged: 0 },
        { appearanceNo: 13, appearanceName: '右后门', damaged: 0 },
        { appearanceNo: 14, appearanceName: '左后轮', damaged: 0 },
        { appearanceNo: 15, appearanceName: '后机盖及后挡风', damaged: 0 },
        { appearanceNo: 16, appearanceName: '右后轮', damaged: 0 },
        { appearanceNo: 17, appearanceName: '左后叶子板', damaged: 0 },
        { appearanceNo: 18, appearanceName: '后保', damaged: 0 },
        { appearanceNo: 19, appearanceName: '右后叶子板', damaged: 0 }
      ]
    }

    switch (scenario) {
      case 'new':
        return baseData
      case 'damaged':
        return {
          list: baseData.list.map(item => ({
            ...item,
            damaged: [2, 5, 10, 12, 15].includes(item.appearanceNo) ? 1 : 0
          }))
        }
      case 'heavyDamaged':
        return {
          list: baseData.list.map(item => ({
            ...item,
            damaged: [1, 2, 3, 8, 10, 12, 13, 18].includes(item.appearanceNo) ? 1 : 0
          }))
        }
      default:
        return {
          list: baseData.list.map(item => ({
            ...item,
            damaged: item.appearanceNo === 10 ? 1 : 0 // 默认只有车顶损坏
          }))
        }
    }
  },

  // 订单合同组件
  orderContract: (scenario = 'default') => {
    const baseData = Mock.mock({
      contractInfo: {
        contractNo: /QL\d{12}/,
        signDate: '@datetime',
        effectiveDate: '@datetime',
        expireDate: '@datetime',
        status: '@pick(["draft", "signed", "effective", "expired"])'
      },
      renterInfo: {
        name: '@cname',
        idCard: /^\d{17}[\dX]$/,
        phone: /^1[3-9]\d{9}$/,
        address: '@county(true)'
      },
      vehicleInfo: {
        brand: '@pick(["奔驰", "宝马", "奥迪", "大众", "丰田", "本田"])',
        model: '@word(3,8)',
        plateNumber: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
        vin: /^[A-HJ-NPR-Z0-9]{17}$/
      },
      rentalInfo: {
        startDate: '@datetime',
        endDate: '@datetime',
        'totalDays|1-30': 1,
        'dailyRate|100-1000': 1,
        'totalAmount|1000-30000': 1
      }
    })

    switch (scenario) {
      case 'draft':
        return {
          ...baseData,
          contractInfo: {
            ...baseData.contractInfo,
            status: 'draft'
          }
        }
      case 'signed':
        return {
          ...baseData,
          contractInfo: {
            ...baseData.contractInfo,
            status: 'signed'
          }
        }
      default:
        return baseData
    }
  },

  // 订单合同内容组件
  orderContractContent: (scenario = 'default') => {
    const baseData = {
      contractInfo: {
        rentalAgreement: `
          <h3>租车协议条款</h3>
          <p><strong>第一条 租赁车辆</strong></p>
          <p>1. 出租方同意将车辆租赁给承租方使用，承租方同意按照本协议条款租用该车辆。</p>
          <p>2. 车辆信息：品牌型号、车牌号码、发动机号等详见车辆交接单。</p>

          <p><strong>第二条 租赁期限</strong></p>
          <p>1. 租赁期限自取车之日起至还车之日止。</p>
          <p>2. 如需延长租期，须提前24小时通知出租方并办理相关手续。</p>

          <p><strong>第三条 租金及费用</strong></p>
          <p>1. 租金按日计算，具体金额详见订单信息。</p>
          <p>2. 承租方应按时支付租金及相关费用。</p>

          <p><strong>第四条 车辆使用</strong></p>
          <p>1. 承租方应合法使用车辆，不得用于违法活动。</p>
          <p>2. 承租方应爱护车辆，正常使用和维护。</p>
          <p>3. 未经出租方同意，不得将车辆转租或抵押给第三方。</p>
        `,
        specialItem: `
          <h3>特殊条款</h3>
          <p><strong>违约责任：</strong></p>
          <p>1. 承租方逾期还车的，每日按租金的2%支付违约金。</p>
          <p>2. 车辆发生事故或损坏，承租方应承担相应责任和费用。</p>

          <p><strong>保险条款：</strong></p>
          <p>1. 车辆已投保交强险和商业险。</p>
          <p>2. 发生保险事故时，承租方应配合处理相关事宜。</p>

          <p><strong>其他约定：</strong></p>
          <p>1. 本协议一式两份，双方各执一份，具有同等法律效力。</p>
          <p>2. 本协议未尽事宜，双方可另行协商解决。</p>
          <p>3. 因本协议发生争议，由出租方所在地人民法院管辖。</p>
        `
      }
    }

    switch (scenario) {
      case 'simple':
        return {
          contractInfo: {
            rentalAgreement: `
              <h3>简化租车协议</h3>
              <p>1. 租赁期限：按订单约定时间</p>
              <p>2. 租金费用：按日计算</p>
              <p>3. 使用规范：合法合规使用</p>
            `,
            specialItem: `
              <h3>重要提醒</h3>
              <p>请遵守交通法规，安全驾驶。</p>
            `
          }
        }
      case 'detailed':
        return {
          contractInfo: {
            rentalAgreement: baseData.contractInfo.rentalAgreement + `
              <p><strong>第五条 保险责任</strong></p>
              <p>1. 车辆已投保相关保险，保险范围详见保险单。</p>
              <p>2. 承租方应配合处理保险理赔事宜。</p>

              <p><strong>第六条 违约责任</strong></p>
              <p>1. 任何一方违约，应承担相应法律责任。</p>
              <p>2. 因违约造成损失的，违约方应予以赔偿。</p>
            `,
            specialItem: baseData.contractInfo.specialItem + `
              <p><strong>免责条款：</strong></p>
              <p>1. 因不可抗力造成的损失，双方互不承担责任。</p>
              <p>2. 因承租方违法使用造成的后果，由承租方承担。</p>
            `
          }
        }
      default:
        return baseData
    }
  },

  // 司机安排组件
  arrangeDrivers: (scenario = 'default') => {
    const baseData = Mock.mock({
      availableDrivers: {
        'list|5-10': [{
          'id|+1': 1,
          'name': '@cname',
          'phone': /^1[3-9]\d{9}$/,
          'licenseNo': /^[0-9]{12}$/,
          'experience|1-20': 1,
          'rating|3.0-5.0': 1,
          'status': '@pick(["available", "busy", "offline"])',
          'location': '@county(true)',
          'distance|0.1-50.0': 1
        }]
      },
      selectedDriver: null
    })

    switch (scenario) {
      case 'selected':
        return {
          ...baseData,
          selectedDriver: baseData.availableDrivers.list[0]
        }
      case 'noDrivers':
        return {
          ...baseData,
          availableDrivers: { list: [] }
        }
      default:
        return baseData
    }
  },

  // 取消政策弹窗组件
  cancelPolicyModal: (scenario = 'default') => {
    const baseData = {
      policies: [
        {
          timeRange: '取车前24小时以上',
          feeRate: 0,
          description: '免费取消'
        },
        {
          timeRange: '取车前12-24小时',
          feeRate: 0.2,
          description: '收取20%违约金'
        },
        {
          timeRange: '取车前12小时内',
          feeRate: 0.5,
          description: '收取50%违约金'
        },
        {
          timeRange: '取车后',
          feeRate: 1.0,
          description: '不可取消，收取全额费用'
        }
      ],
      currentPolicy: null
    }

    switch (scenario) {
      case 'strict':
        return {
          ...baseData,
          policies: [
            {
              timeRange: '取车前48小时以上',
              feeRate: 0,
              description: '免费取消'
            },
            {
              timeRange: '取车前48小时内',
              feeRate: 1.0,
              description: '不可取消'
            }
          ]
        }
      case 'flexible':
        return {
          ...baseData,
          policies: [
            {
              timeRange: '取车前6小时以上',
              feeRate: 0,
              description: '免费取消'
            },
            {
              timeRange: '取车前6小时内',
              feeRate: 0.1,
              description: '收取10%违约金'
            }
          ]
        }
      default:
        return baseData
    }
  },

  // 押金政策弹窗组件
  depositPolicyModal: (scenario = 'default') => {
    const baseData = {
      depositAmount: 5000,
      depositType: 'authorization', // authorization, payment
      refundPolicy: '还车后7个工作日内退还',
      freeDepositConditions: [
        '芝麻信用分700以上',
        '驾龄3年以上',
        '无违章记录'
      ],
      currentUserStatus: {
        creditScore: 720,
        drivingYears: 5,
        violationCount: 0,
        qualifiedForFreeDeposit: true
      }
    }

    switch (scenario) {
      case 'notQualified':
        return {
          ...baseData,
          currentUserStatus: {
            creditScore: 650,
            drivingYears: 2,
            violationCount: 2,
            qualifiedForFreeDeposit: false
          }
        }
      case 'highDeposit':
        return {
          ...baseData,
          depositAmount: 10000
        }
      default:
        return baseData
    }
  },

  // 租车押金面板组件
  rentalCarDepositPanel: (scenario = 'default') => {
    const baseData = {
      payStatus: 1, // 1表示已支付，0表示未支付
      payStatusName: '已接收',
      rentDepositAmount: '3000.00',
      deductionMethod: '微信支付',
      disabled: false
    }

    switch (scenario) {
      case 'unpaid':
        return {
          ...baseData,
          payStatus: 0,
          payStatusName: '未支付',
          rentDepositAmount: '5000.00'
        }
      case 'highAmount':
        return {
          ...baseData,
          rentDepositAmount: '8000.00',
          payStatusName: '已接收'
        }
      case 'disabled':
        return {
          ...baseData,
          disabled: true,
          payStatusName: '处理中'
        }
      case 'noDeposit':
        return {
          ...baseData,
          rentDepositAmount: '0.00',
          payStatusName: '免押金'
        }
      default:
        return baseData
    }
  }
}

export default businessMocks

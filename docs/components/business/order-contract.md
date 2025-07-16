# FaceOrderContract

订单合同组件，用于生成和签署租车合同，支持取车和还车两种类型。

## 基础用法

```vue
<template>
  <div>
    <van-button @click="showContract = true">查看合同</van-button>

    <FaceOrderContract
      :show="showContract"
      type="pickup"
      :contract-info="contractData"
      :vehicle-no="vehicleNo"
      @close="handleClose"
      @sign="handleSign"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FaceOrderContract } from 'qinglu-vant'

const showContract = ref(false)
const vehicleNo = ref('京A12345')
const contractData = ref({
  customerName: '张三',
  mobile: '13800138000',
  idCard: '110101199001011234',
  vehicleBrand: '丰田凯美瑞',
  startDate: '2024-01-15',
  endDate: '2024-02-15'
})

const handleClose = () => {
  showContract.value = false
}

const handleSign = (signatureData) => {
  console.log('签名完成:', signatureData)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | 是否显示合同 | Boolean | false |
| type | 合同类型 | String | 'pickup' |
| actualPickupTime | 实际取车时间 | String | - |
| actualReturnTime | 实际还车时间 | String | - |
| pickupMileage | 取车公里数 | String | - |
| pickupOilLiter | 取车油量 | String \| Number | - |
| maxOilLiter | 最大油量 | String \| Number | - |
| oilElectric | 油量/电量百分比 | String \| Number | - |
| oilElectric2 | 还车油量/电量百分比 | String \| Number | - |
| returnMileage | 还车公里数 | String | - |
| returnOilLiter | 还车油量 | String | - |
| signatureUrl | 签名图片URL | String | - |
| vehicleNo | 车牌号 | String | - |
| contractInfo | 合同信息对象 | Object | - |
| interiorList | 内饰照片列表 | Array | [] |
| appearanceList | 外观照片列表 | Array | [] |
| appearanceRemark | 外观备注 | String | - |
| payItems | 支付项目列表 | Array | [] |
| refundItems | 退款项目列表 | Array | [] |
| receivableAmount | 应收金额 | Number | 0 |
| payAmount | 实付金额 | Number | 0 |

#### type 可选值

| 值 | 说明 |
|---|------|
| pickup | 取车合同 |
| return | 还车合同 |

#### contractInfo 对象结构

| 字段 | 说明 | 类型 |
|------|------|------|
| customerName | 客户姓名 | String |
| mobile | 手机号 | String |
| idCard | 身份证号 | String |
| vehicleBrand | 车辆品牌型号 | String |
| startDate | 开始日期 | String |
| endDate | 结束日期 | String |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭合同时触发 | - |
| sign | 签名完成时触发 | signatureData: 签名数据 |
| save | 保存合同时触发 | contractData: 合同数据 |

## 示例

### 取车合同

```vue
<template>
  <div class="pickup-contract-demo">
    <van-cell-group>
      <van-cell title="订单信息" :value="orderInfo.orderNo" />
      <van-cell title="客户姓名" :value="orderInfo.customerName" />
      <van-cell title="车辆信息" :value="orderInfo.vehicleInfo" />
    </van-cell-group>

    <van-button type="primary" block @click="showPickupContract">
      生成取车合同
    </van-button>

    <FaceOrderContract
      :show="showContract"
      type="pickup"
      :actual-pickup-time="pickupTime"
      :pickup-mileage="pickupMileage"
      :pickup-oil-liter="pickupOilLiter"
      :max-oil-liter="maxOilLiter"
      :oil-electric="oilElectricPercent"
      :vehicle-no="orderInfo.vehicleNo"
      :contract-info="contractInfo"
      :interior-list="interiorPhotos"
      :appearance-list="appearancePhotos"
      :appearance-remark="appearanceRemark"
      @close="handleContractClose"
      @sign="handlePickupSign"
      @save="handlePickupSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showContract = ref(false)
const pickupTime = ref(new Date().toISOString())
const pickupMileage = ref('12500')
const pickupOilLiter = ref(45)
const maxOilLiter = ref(60)
const oilElectricPercent = ref(75)
const appearanceRemark = ref('车辆外观良好，无明显划痕')

const orderInfo = ref({
  orderNo: 'ORD20240115001',
  customerName: '张三',
  vehicleInfo: '丰田凯美瑞 京A12345',
  vehicleNo: '京A12345'
})

const contractInfo = ref({
  customerName: '张三',
  mobile: '13800138000',
  idCard: '110101199001011234',
  vehicleBrand: '丰田凯美瑞',
  startDate: '2024-01-15',
  endDate: '2024-02-15'
})

const interiorPhotos = ref([
  'https://example.com/interior1.jpg',
  'https://example.com/interior2.jpg'
])

const appearancePhotos = ref([
  'https://example.com/appearance1.jpg',
  'https://example.com/appearance2.jpg',
  'https://example.com/appearance3.jpg'
])

const showPickupContract = () => {
  showContract.value = true
}

const handleContractClose = () => {
  showContract.value = false
}

const handlePickupSign = (signatureData) => {
  console.log('取车合同签名完成:', signatureData)
}

const handlePickupSave = (contractData) => {
  console.log('取车合同保存:', contractData)
  showContract.value = false
}
</script>
```

### 还车合同

```vue
<template>
  <div class="return-contract-demo">
    <van-cell-group>
      <van-cell title="还车信息" value="准备生成还车合同" />
      <van-cell title="费用结算" :value="`应收: ¥${receivableAmount}`" />
      <van-cell title="实际支付" :value="`实付: ¥${payAmount}`" />
    </van-cell-group>

    <van-button type="primary" block @click="showReturnContract">
      生成还车合同
    </van-button>

    <FaceOrderContract
      :show="showContract"
      type="return"
      :actual-return-time="returnTime"
      :return-mileage="returnMileage"
      :return-oil-liter="returnOilLiter"
      :oil-electric2="returnOilElectricPercent"
      :vehicle-no="orderInfo.vehicleNo"
      :contract-info="contractInfo"
      :pay-items="payItems"
      :refund-items="refundItems"
      :receivable-amount="receivableAmount"
      :pay-amount="payAmount"
      :signature-url="existingSignature"
      @close="handleContractClose"
      @sign="handleReturnSign"
      @save="handleReturnSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showContract = ref(false)
const returnTime = ref(new Date().toISOString())
const returnMileage = ref('12800')
const returnOilLiter = ref(40)
const returnOilElectricPercent = ref(67)
const receivableAmount = ref(350)
const payAmount = ref(350)
const existingSignature = ref('')

const orderInfo = ref({
  vehicleNo: '京A12345'
})

const contractInfo = ref({
  customerName: '张三',
  mobile: '13800138000',
  idCard: '110101199001011234',
  vehicleBrand: '丰田凯美瑞',
  startDate: '2024-01-15',
  endDate: '2024-02-15'
})

const payItems = ref([
  { name: '超时费', amount: 50 },
  { name: '清洁费', amount: 100 },
  { name: '违章押金', amount: 200 }
])

const refundItems = ref([
  { name: '押金退还', amount: 1000 }
])

const showReturnContract = () => {
  showContract.value = true
}

const handleContractClose = () => {
  showContract.value = false
}

const handleReturnSign = (signatureData) => {
  console.log('还车合同签名完成:', signatureData)
  existingSignature.value = signatureData.signatureUrl
}

const handleReturnSave = (contractData) => {
  console.log('还车合同保存:', contractData)
  showContract.value = false
}
</script>
```

### 合同预览

```vue
<template>
  <div class="contract-preview-demo">
    <van-cell-group>
      <van-cell title="合同类型">
        <template #value>
          <van-radio-group v-model="contractType" direction="horizontal">
            <van-radio name="pickup">取车合同</van-radio>
            <van-radio name="return">还车合同</van-radio>
          </van-radio-group>
        </template>
      </van-cell>
    </van-cell-group>

    <van-button type="primary" block @click="previewContract">
      预览合同
    </van-button>

    <FaceOrderContract
      :show="showPreview"
      :type="contractType"
      :actual-pickup-time="contractType === 'pickup' ? pickupTime : undefined"
      :actual-return-time="contractType === 'return' ? returnTime : undefined"
      :pickup-mileage="contractType === 'pickup' ? '12500' : undefined"
      :return-mileage="contractType === 'return' ? '12800' : undefined"
      :pickup-oil-liter="contractType === 'pickup' ? 45 : undefined"
      :return-oil-liter="contractType === 'return' ? 40 : undefined"
      :oil-electric="contractType === 'pickup' ? 75 : undefined"
      :oil-electric2="contractType === 'return' ? 67 : undefined"
      :vehicle-no="'京A12345'"
      :contract-info="previewContractInfo"
      :pay-items="contractType === 'return' ? previewPayItems : []"
      :receivable-amount="contractType === 'return' ? 350 : 0"
      :pay-amount="contractType === 'return' ? 350 : 0"
      @close="handlePreviewClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPreview = ref(false)
const contractType = ref('pickup')
const pickupTime = ref(new Date().toISOString())
const returnTime = ref(new Date().toISOString())

const previewContractInfo = ref({
  customerName: '张三',
  mobile: '13800138000',
  idCard: '110101199001011234',
  vehicleBrand: '丰田凯美瑞',
  startDate: '2024-01-15',
  endDate: '2024-02-15'
})

const previewPayItems = ref([
  { name: '超时费', amount: 50 },
  { name: '清洁费', amount: 100 },
  { name: '违章押金', amount: 200 }
])

const previewContract = () => {
  showPreview.value = true
}

const handlePreviewClose = () => {
  showPreview.value = false
}
</script>
```

## 特性

- 📄 **合同生成**: 自动生成标准化的租车合同
- ✍️ **电子签名**: 集成签名板，支持手写签名
- 📷 **照片集成**: 自动集成车辆内外观照片
- 💰 **费用明细**: 清晰展示支付和退款明细
- 📱 **移动端优化**: 全屏合同显示，适合移动端查看和签署
- 💾 **数据保存**: 支持合同数据的保存和导出
- 🖼️ **截图功能**: 支持合同截图保存
- 🔄 **双向合同**: 支持取车和还车两种合同类型

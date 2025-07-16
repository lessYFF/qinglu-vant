# FacePayAli

支付宝支付组件，提供支付宝扫码支付功能，支持多种支付场景。

## 基础用法

```vue
<template>
  <div>
    <van-button @click="showPayment = true">支付宝支付</van-button>

    <FacePayAli
      :is-show="showPayment"
      :type="1"
      :order-id="orderId"
      @on-pay-finish="handlePayFinish"
      @on-pay-cancel="handlePayCancel"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FacePayAli } from 'qinglu-vant'

const showPayment = ref(false)
const orderId = ref(12345)

const handlePayFinish = () => {
  console.log('支付完成')
  showPayment.value = false
}

const handlePayCancel = () => {
  console.log('支付取消')
  showPayment.value = false
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| isShow | 是否显示支付弹窗 | Boolean | false |
| type | 支付场景类型 | Number | - |
| orderId | 订单ID | Number | - |
| payParams | 支付参数对象 | Object | - |
| okTxt | 确认按钮文字 | String | '支付完成' |
| cancelTxt | 取消按钮文字 | String | '取消支付' |
| cancelMsg | 取消确认提示 | String | '取消支付将自动取消订单，您真的要取消吗？' |

#### type 支付场景类型

| 值 | 说明 |
|---|------|
| 1 | 创建订单 |
| 2 | 取车加购 |
| 3 | 续租 |
| 4 | 还车 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| onPayFinish | 支付完成时触发 | - |
| onPayCancel | 支付取消时触发 | - |

## 示例

### 创建订单支付

```vue
<template>
  <div class="order-payment">
    <van-cell-group>
      <van-cell title="订单金额" :value="`¥${orderAmount}`" />
      <van-cell title="支付方式" value="支付宝" is-link @click="startPayment" />
    </van-cell-group>

    <FacePayAli
      :is-show="showPayModal"
      :type="1"
      :order-id="newOrderId"
      ok-txt="支付完成"
      cancel-txt="取消支付"
      @on-pay-finish="handleOrderPayFinish"
      @on-pay-cancel="handleOrderPayCancel"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const showPayModal = ref(false)
const newOrderId = ref(null)
const orderAmount = ref('299.00')

const startPayment = () => {
  // 创建订单
  newOrderId.value = Date.now() // 模拟订单ID
  showPayModal.value = true
}

const handleOrderPayFinish = () => {
  Toast.success('订单支付成功')
  showPayModal.value = false
  // 跳转到订单详情页
}

const handleOrderPayCancel = () => {
  Toast.fail('支付已取消')
  showPayModal.value = false
  // 取消订单
}
</script>
```

### 取车加购支付

```vue
<template>
  <div class="pickup-payment">
    <van-cell-group>
      <van-cell title="加购服务" value="保险升级" />
      <van-cell title="加购金额" :value="`¥${additionalAmount}`" />
    </van-cell-group>

    <van-button type="primary" block @click="payForAdditional">
      支付加购费用
    </van-button>

    <FacePayAli
      :is-show="showAdditionalPay"
      :type="2"
      :order-id="currentOrderId"
      :pay-params="additionalParams"
      ok-txt="支付完成"
      @on-pay-finish="handleAdditionalPayFinish"
      @on-pay-cancel="handleAdditionalPayCancel"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showAdditionalPay = ref(false)
const currentOrderId = ref(12345)
const additionalAmount = ref('50.00')

const additionalParams = ref({
  payFeeItemsVo: {
    insuranceUpgrade: 50.00
  }
})

const payForAdditional = () => {
  showAdditionalPay.value = true
}

const handleAdditionalPayFinish = () => {
  console.log('加购支付完成')
  showAdditionalPay.value = false
}

const handleAdditionalPayCancel = () => {
  console.log('加购支付取消')
  showAdditionalPay.value = false
}
</script>
```

### 续租支付

```vue
<template>
  <div class="renewal-payment">
    <van-cell-group>
      <van-cell title="续租天数" value="3天" />
      <van-cell title="续租金额" :value="`¥${renewalAmount}`" />
    </van-cell-group>

    <van-button type="primary" block @click="payForRenewal">
      支付续租费用
    </van-button>

    <FacePayAli
      :is-show="showRenewalPay"
      :type="3"
      :order-id="renewalOrderId"
      ok-txt="续租支付完成"
      cancel-txt="取消续租"
      cancel-msg="取消续租将无法延长使用时间，确定要取消吗？"
      @on-pay-finish="handleRenewalPayFinish"
      @on-pay-cancel="handleRenewalPayCancel"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showRenewalPay = ref(false)
const renewalOrderId = ref(12345)
const renewalAmount = ref('180.00')

const payForRenewal = () => {
  showRenewalPay.value = true
}

const handleRenewalPayFinish = () => {
  console.log('续租支付完成')
  showRenewalPay.value = false
}

const handleRenewalPayCancel = () => {
  console.log('续租支付取消')
  showRenewalPay.value = false
}
</script>
```

### 还车支付

```vue
<template>
  <div class="return-payment">
    <van-cell-group>
      <van-cell title="超时费用" :value="`¥${overtimeFee}`" />
      <van-cell title="违章押金" :value="`¥${violationDeposit}`" />
      <van-cell title="总计" :value="`¥${totalAmount}`" />
    </van-cell-group>

    <van-button type="primary" block @click="payForReturn">
      支付还车费用
    </van-button>

    <FacePayAli
      :is-show="showReturnPay"
      :type="4"
      :order-id="returnOrderId"
      :pay-params="returnParams"
      ok-txt="还车支付完成"
      @on-pay-finish="handleReturnPayFinish"
      @on-pay-cancel="handleReturnPayCancel"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showReturnPay = ref(false)
const returnOrderId = ref(12345)
const overtimeFee = ref('30.00')
const violationDeposit = ref('500.00')

const totalAmount = computed(() => {
  return (parseFloat(overtimeFee.value) + parseFloat(violationDeposit.value)).toFixed(2)
})

const returnParams = ref({
  payFeeItemsVo: {
    overtimeFee: 30.00,
    violationDeposit: 500.00
  }
})

const payForReturn = () => {
  showReturnPay.value = true
}

const handleReturnPayFinish = () => {
  console.log('还车支付完成')
  showReturnPay.value = false
}

const handleReturnPayCancel = () => {
  console.log('还车支付取消')
  showReturnPay.value = false
}
</script>
```

## 特性

- 📱 **扫码支付**: 生成支付宝二维码，用户扫码完成支付
- 🔄 **实时状态**: 实时监控支付状态，自动更新界面
- 💰 **多场景**: 支持创建订单、取车加购、续租、还车等多种支付场景
- ⏱️ **超时处理**: 二维码超时自动刷新
- 🎯 **状态反馈**: 清晰的支付状态提示和图标反馈
- 🔒 **安全可靠**: 集成官方支付宝支付接口，安全可靠
- 📊 **费用展示**: 清晰展示支付金额和费用明细

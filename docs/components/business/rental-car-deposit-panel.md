# FaceRentalCarDepositPanel

租车押金面板组件，用于显示和管理租车押金信息。

## 基础用法

```vue
<template>
  <FaceRentalCarDepositPanel
    :deposit-amount="depositAmount"
    :violation-deposit="violationDeposit"
    :deposit-status="depositStatus"
    @deposit-action="handleDepositAction"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceRentalCarDepositPanel } from 'qinglu-vant'

const depositAmount = ref(1000)
const violationDeposit = ref(500)
const depositStatus = ref('paid')

const handleDepositAction = (action) => {
  console.log('押金操作:', action)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| depositAmount | 租车押金金额 | Number | 0 |
| violationDeposit | 违章押金金额 | Number | 0 |
| depositStatus | 押金状态 | String | 'unpaid' |
| exemptionType | 免押类型 | String | - |
| exemptionReason | 免押原因 | String | - |

#### depositStatus 可选值

| 值 | 说明 |
|---|------|
| unpaid | 未支付 |
| paid | 已支付 |
| frozen | 已冻结 |
| refunded | 已退还 |
| exempt | 免押 |

#### exemptionType 可选值

| 值 | 说明 |
|---|------|
| credit | 信用免押 |
| vip | VIP免押 |
| promotion | 活动免押 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| deposit-action | 押金操作时触发 | action: 操作类型 |

## 示例

### 基础押金面板

```vue
<template>
  <div class="deposit-panel-demo">
    <FaceRentalCarDepositPanel
      :deposit-amount="depositInfo.amount"
      :violation-deposit="depositInfo.violationAmount"
      :deposit-status="depositInfo.status"
      @deposit-action="handleDepositAction"
    />

    <div class="deposit-info">
      <h3>押金信息</h3>
      <p>租车押金: ¥{{ depositInfo.amount }}</p>
      <p>违章押金: ¥{{ depositInfo.violationAmount }}</p>
      <p>押金状态: {{ getStatusText(depositInfo.status) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const depositInfo = ref({
  amount: 1000,
  violationAmount: 500,
  status: 'paid'
})

const statusMap = {
  unpaid: '未支付',
  paid: '已支付',
  frozen: '已冻结',
  refunded: '已退还',
  exempt: '免押'
}

const handleDepositAction = (action) => {
  console.log('押金操作:', action)
}

const getStatusText = (status) => {
  return statusMap[status] || status
}
</script>

<style scoped>
.deposit-panel-demo {
  padding: 16px;
}

.deposit-info {
  margin-top: 16px;
  padding: 16px;
  background: #f7f8fa;
  border-radius: 8px;
}
</style>
```

### 免押状态

```vue
<template>
  <div class="exempt-demo">
    <FaceRentalCarDepositPanel
      :deposit-amount="0"
      :violation-deposit="0"
      deposit-status="exempt"
      exemption-type="credit"
      exemption-reason="芝麻信用分650分以上"
      @deposit-action="handleExemptAction"
    />

    <div class="exempt-info">
      <van-notice-bar
        text="恭喜您享受信用免押服务，无需支付押金"
        left-icon="success"
        color="#52c41a"
        background="#f6ffed"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const handleExemptAction = (action) => {
  console.log('免押操作:', action)
}
</script>

<style scoped>
.exempt-demo {
  padding: 16px;
}

.exempt-info {
  margin-top: 16px;
}
</style>
```

## 特性

- 💰 **押金管理**: 显示租车押金和违章押金信息
- 🏷️ **状态标识**: 清晰显示押金支付状态
- 🎯 **免押支持**: 支持多种免押类型和原因显示
- 📊 **金额展示**: 清晰展示各项押金金额
- 🔄 **状态更新**: 支持押金状态的实时更新
- 📱 **移动端优化**: 适合移动端的押金信息展示

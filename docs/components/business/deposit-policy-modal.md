# FaceDepositPolicyModal

押金政策弹窗组件，用于显示订单的押金政策详情和免押状态。

## 基础用法

```vue
<template>
  <div>
    <van-button @click="showDepositPolicy = true">查看押金政策</van-button>

    <FaceDepositPolicyModal
      v-model:show="showDepositPolicy"
      :order-id="orderId"
      @close="handleClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FaceDepositPolicyModal } from 'qinglu-vant'

const showDepositPolicy = ref(false)
const orderId = ref('12345')

const handleClose = () => {
  console.log('押金政策弹窗关闭')
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model:show | 控制弹窗显示/隐藏 | Boolean | false |
| orderId | 订单ID | String \| Number | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 弹窗显示状态变化 | show: Boolean |
| close | 弹窗关闭时触发 | - |

## 示例

### 基础押金政策

```vue
<template>
  <div class="deposit-policy-demo">
    <van-cell-group>
      <van-cell
        title="查看押金政策"
        is-link
        @click="openDepositPolicy"
      />
    </van-cell-group>

    <FaceDepositPolicyModal
      v-model:show="visible"
      :order-id="currentOrderId"
      @close="handleClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const currentOrderId = ref('ORD20240115001')

const openDepositPolicy = () => {
  visible.value = true
}

const handleClose = () => {
  visible.value = false
}
</script>
```

### 不同免押状态

```vue
<template>
  <div class="deposit-status-demo">
    <van-cell-group>
      <van-cell
        v-for="order in orderList"
        :key="order.id"
        :title="`订单 ${order.id}`"
        :label="order.depositStatusText"
        is-link
        @click="() => showPolicy(order)"
      />
    </van-cell-group>

    <FaceDepositPolicyModal
      v-model:show="showModal"
      :order-id="selectedOrder?.id"
      @close="handleClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const selectedOrder = ref(null)

const orderList = ref([
  {
    id: 'ORD001',
    depositStatusText: '未免押 - 需支付押金'
  },
  {
    id: 'ORD002',
    depositStatusText: '已享免押 - 芝麻信用'
  },
  {
    id: 'ORD003',
    depositStatusText: '已享免押 - 信用卡预授权'
  },
  {
    id: 'ORD004',
    depositStatusText: '到店支付押金'
  }
])

const showPolicy = (order) => {
  selectedOrder.value = order
  showModal.value = true
}

const handleClose = () => {
  showModal.value = false
}
</script>
```

### 订单详情集成

```vue
<template>
  <div class="order-detail">
    <van-cell-group>
      <van-cell title="订单信息">
        <template #value>
          <van-tag type="success">已完成</van-tag>
        </template>
      </van-cell>
      <van-cell title="订单号" :value="orderInfo.id" />
      <van-cell title="订单金额" :value="`¥${orderInfo.amount}`" />
      <van-cell
        title="押金政策"
        :value="orderInfo.depositStatus"
        is-link
        @click="showDepositModal = true"
      />
    </van-cell-group>

    <FaceDepositPolicyModal
      v-model:show="showDepositModal"
      :order-id="orderInfo.id"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showDepositModal = ref(false)
const orderInfo = ref({
  id: 'ORD20240115001',
  amount: '299.00',
  depositStatus: '已享免押'
})
</script>
```

### 押金政策说明

```vue
<template>
  <div class="policy-explanation">
    <van-cell-group>
      <van-cell title="押金政策说明" is-link @click="showExplanation = true" />
    </van-cell-group>

    <!-- 政策说明弹窗 -->
    <van-popup
      v-model:show="showExplanation"
      position="bottom"
      style="height: 60%"
      round
      closeable
    >
      <div class="explanation-content">
        <h3>押金政策说明</h3>

        <div class="policy-section">
          <h4>租车押金</h4>
          <p>取车时冻结，用于保障车辆安全。若无车损，还车时自动解冻。</p>
        </div>

        <div class="policy-section">
          <h4>违章押金</h4>
          <p>还车时冻结，用于保障违章处理。若无违章，银行会在还车后30天左右退还。</p>
        </div>

        <div class="policy-section">
          <h4>免押服务</h4>
          <ul>
            <li>芝麻信用：芝麻信用分650分以上可享受免押服务</li>
            <li>信用卡预授权：使用信用卡预授权代替现金押金</li>
            <li>会员免押：VIP会员可享受免押优惠</li>
          </ul>
        </div>

        <div class="policy-section">
          <h4>支付方式</h4>
          <p>支持信用卡、支付宝、微信等多种支付方式。</p>
        </div>
      </div>
    </van-popup>

    <!-- 实际的押金政策弹窗 -->
    <FaceDepositPolicyModal
      v-model:show="showPolicy"
      :order-id="demoOrderId"
    />

    <van-button
      type="primary"
      block
      style="margin-top: 16px;"
      @click="showPolicy = true"
    >
      查看具体政策
    </van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showExplanation = ref(false)
const showPolicy = ref(false)
const demoOrderId = ref('DEMO001')
</script>

<style scoped>
.explanation-content {
  padding: 20px;
}

.explanation-content h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #323233;
}

.policy-section {
  margin-bottom: 20px;
}

.policy-section h4 {
  color: #1989fa;
  margin-bottom: 8px;
  font-size: 16px;
}

.policy-section p {
  color: #646566;
  line-height: 1.6;
  margin-bottom: 8px;
}

.policy-section ul {
  color: #646566;
  line-height: 1.6;
  padding-left: 20px;
}

.policy-section li {
  margin-bottom: 4px;
}
</style>
```

### 动态加载示例

```vue
<template>
  <div class="dynamic-loading-demo">
    <van-cell-group>
      <van-field
        v-model="inputOrderId"
        label="订单ID"
        placeholder="请输入订单ID"
      />
    </van-cell-group>

    <div class="action-buttons">
      <van-button
        type="primary"
        @click="loadDepositPolicy"
        :disabled="!inputOrderId"
      >
        查看押金政策
      </van-button>
    </div>

    <FaceDepositPolicyModal
      v-model:show="showDynamicModal"
      :order-id="inputOrderId"
      @close="handleDynamicClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputOrderId = ref('')
const showDynamicModal = ref(false)

const loadDepositPolicy = () => {
  if (inputOrderId.value) {
    showDynamicModal.value = true
  }
}

const handleDynamicClose = () => {
  showDynamicModal.value = false
}
</script>

<style scoped>
.dynamic-loading-demo {
  padding: 16px;
}

.action-buttons {
  margin-top: 16px;
}
</style>
```

## 特性

- 💰 **押金详情**: 显示租车押金和违章押金的详细信息
- 🎯 **免押状态**: 清晰展示免押状态和免押方式
- 📊 **政策表格**: 表格形式展示押金政策，信息清晰
- 🔄 **动态加载**: 根据订单ID动态获取押金政策详情
- 📱 **底部弹窗**: 60%-80%高度的底部弹窗，适合移动端
- 🏷️ **状态标签**: 使用标签区分可退/不可退状态
- ⚡ **加载状态**: 内置加载状态，提升用户体验

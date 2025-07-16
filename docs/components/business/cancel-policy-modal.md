# FaceCancelPolicyModal

取消政策弹窗组件，用于显示订单取消政策和费用标准。

## 基础用法

```vue
<template>
  <div>
    <van-button @click="showCancelPolicy = true">查看取消政策</van-button>

    <FaceCancelPolicyModal
      v-model:show="showCancelPolicy"
      :order-id="orderId"
      :order-status="orderStatus"
      :order-source="orderSource"
      @cancel-order="handleCancelOrder"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FaceCancelPolicyModal } from 'qinglu-vant'

const showCancelPolicy = ref(false)
const orderId = ref('12345')
const orderStatus = ref(1)
const orderSource = ref(1)

const handleCancelOrder = () => {
  console.log('确认取消订单')
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model:show | 控制弹窗显示/隐藏 | Boolean | false |
| orderId | 订单ID | String \| Number | - |
| orderStatus | 订单状态 | Number | - |
| orderSource | 订单来源 | Number | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 弹窗显示状态变化 | show: Boolean |
| cancel-order | 确认取消订单时触发 | - |

## 示例

### 基础取消政策

```vue
<template>
  <div class="cancel-policy-demo">
    <van-cell-group>
      <van-cell
        title="订单取消政策"
        is-link
        @click="openCancelPolicy"
      />
    </van-cell-group>

    <FaceCancelPolicyModal
      v-model:show="visible"
      :order-id="currentOrderId"
      :order-status="currentOrderStatus"
      :order-source="currentOrderSource"
      @cancel-order="handleOrderCancel"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const visible = ref(false)
const currentOrderId = ref('ORD20240115001')
const currentOrderStatus = ref(1) // 1: 待取车
const currentOrderSource = ref(1) // 1: 小程序

const openCancelPolicy = () => {
  visible.value = true
}

const handleOrderCancel = () => {
  Toast.success('订单取消成功')
  visible.value = false
  // 处理订单取消逻辑
}
</script>
```

### 不同订单状态的取消政策

```vue
<template>
  <div class="order-status-demo">
    <van-cell-group>
      <van-cell
        v-for="order in orderList"
        :key="order.id"
        :title="`订单 ${order.id}`"
        :label="order.statusText"
        is-link
        @click="() => showPolicy(order)"
      />
    </van-cell-group>

    <FaceCancelPolicyModal
      v-model:show="showModal"
      :order-id="selectedOrder?.id"
      :order-status="selectedOrder?.status"
      :order-source="selectedOrder?.source"
      @cancel-order="handleCancel"
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
    status: 1,
    source: 1,
    statusText: '待取车 - 可免费取消'
  },
  {
    id: 'ORD002',
    status: 2,
    source: 1,
    statusText: '已取车 - 按政策扣费'
  },
  {
    id: 'ORD003',
    status: 3,
    source: 2,
    statusText: '使用中 - 按政策扣费'
  },
  {
    id: 'ORD004',
    status: 4,
    source: 1,
    statusText: '已完成 - 不可取消'
  }
])

const showPolicy = (order) => {
  selectedOrder.value = order
  showModal.value = true
}

const handleCancel = () => {
  console.log(`取消订单: ${selectedOrder.value.id}`)
  showModal.value = false
}
</script>
```

### 带确认流程的取消

```vue
<template>
  <div class="cancel-flow-demo">
    <div class="order-info">
      <van-cell-group>
        <van-cell title="订单号" :value="orderInfo.id" />
        <van-cell title="订单状态" :value="orderInfo.statusText" />
        <van-cell title="订单金额" :value="`¥${orderInfo.amount}`" />
      </van-cell-group>
    </div>

    <div class="action-buttons">
      <van-button
        type="danger"
        block
        @click="startCancelFlow"
      >
        取消订单
      </van-button>
    </div>

    <!-- 取消政策弹窗 -->
    <FaceCancelPolicyModal
      v-model:show="showCancelPolicy"
      :order-id="orderInfo.id"
      :order-status="orderInfo.status"
      :order-source="orderInfo.source"
      @cancel-order="confirmCancel"
    />

    <!-- 确认取消弹窗 -->
    <van-dialog
      v-model:show="showConfirmDialog"
      title="确认取消订单"
      :message="confirmMessage"
      show-cancel-button
      @confirm="executeCancelOrder"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Toast } from 'vant'

const showCancelPolicy = ref(false)
const showConfirmDialog = ref(false)
const cancelFee = ref(0)

const orderInfo = ref({
  id: 'ORD20240115001',
  status: 2,
  source: 1,
  statusText: '已取车',
  amount: 299.00
})

const confirmMessage = computed(() => {
  if (cancelFee.value > 0) {
    return `根据取消政策，需要扣除 ¥${cancelFee.value} 的取消费用。确认要取消订单吗？`
  }
  return '确认要取消订单吗？此操作不可撤销。'
})

const startCancelFlow = () => {
  showCancelPolicy.value = true
}

const confirmCancel = () => {
  // 这里可以从取消政策组件获取当前的扣费金额
  // 实际应用中可能需要通过事件传递或API获取
  cancelFee.value = 50 // 示例扣费金额

  showCancelPolicy.value = false
  showConfirmDialog.value = true
}

const executeCancelOrder = () => {
  // 执行实际的取消订单操作
  Toast.loading('正在取消订单...')

  setTimeout(() => {
    Toast.success('订单取消成功')
    orderInfo.value.statusText = '已取消'
    showConfirmDialog.value = false
  }, 2000)
}
</script>

<style scoped>
.cancel-flow-demo {
  padding: 16px;
}

.order-info {
  margin-bottom: 24px;
}

.action-buttons {
  margin-bottom: 16px;
}
</style>
```

### 取消政策说明

```vue
<template>
  <div class="policy-explanation">
    <van-cell-group>
      <van-cell title="取消政策说明" is-link @click="showExplanation = true" />
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
        <h3>取消政策说明</h3>

        <div class="policy-section">
          <h4>免费取消期</h4>
          <p>订单确认后至取车前24小时，可免费取消订单。</p>
        </div>

        <div class="policy-section">
          <h4>收费取消期</h4>
          <p>取车前24小时内至取车前2小时，收取订单金额的20%作为取消费。</p>
        </div>

        <div class="policy-section">
          <h4>不可取消期</h4>
          <p>取车前2小时内及已取车后，不支持取消，如需退订请联系客服。</p>
        </div>

        <div class="policy-section">
          <h4>特殊情况</h4>
          <ul>
            <li>因不可抗力因素（如自然灾害、政府管制等）导致的取消，不收取费用</li>
            <li>车辆故障导致无法正常使用的，不收取取消费用</li>
            <li>其他特殊情况请联系客服处理</li>
          </ul>
        </div>
      </div>
    </van-popup>

    <!-- 实际的取消政策弹窗 -->
    <FaceCancelPolicyModal
      v-model:show="showPolicy"
      :order-id="demoOrderId"
      :order-status="1"
      :order-source="1"
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

## 特性

- 📋 **政策展示**: 清晰展示不同时间段的取消费用标准
- ⏰ **时间标识**: 自动标识当前所处的取消政策时间段
- 💰 **费用计算**: 实时显示取消费用和扣费比例
- 📱 **底部弹窗**: 60%-80%高度的底部弹窗，适合移动端
- 🔄 **动态加载**: 根据订单ID动态获取取消政策详情
- ✅ **操作确认**: 支持取消订单的确认操作
- 🎨 **状态区分**: 当前时间段高亮显示，免费取消特殊标识

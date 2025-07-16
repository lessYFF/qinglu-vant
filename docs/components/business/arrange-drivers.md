# FaceArrangeDrivers

司机安排组件，用于为订单安排取车和还车司机的弹窗组件。

## 基础用法

```vue
<template>
  <div>
    <van-button @click="showArrangeDriver = true">安排司机</van-button>

    <FaceArrangeDrivers
      v-model:show="showArrangeDriver"
      :order-info="orderInfo"
      @close="handleClose"
      @on-ok="handleSuccess"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FaceArrangeDrivers } from 'qinglu-vant'

const showArrangeDriver = ref(false)
const orderInfo = ref({
  id: '12345',
  pickupStoreId: 1,
  returnStoreId: 2,
  pickupStoreName: '北京朝阳店',
  returnStoreName: '北京海淀店',
  pickupAddr: '北京市朝阳区xxx路xxx号',
  returnAddr: '北京市海淀区xxx路xxx号',
  pickupDateStr: '2024-01-15 10:00',
  returnDateStr: '2024-01-20 18:00',
  pickupDriver: '待排司机',
  returnDriver: '待排司机',
  orderStatusStr: '待取车'
})

const handleClose = () => {
  console.log('关闭司机安排弹窗')
}

const handleSuccess = () => {
  console.log('司机安排成功')
  // 刷新订单数据
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model:show | 控制弹窗显示/隐藏 | Boolean | false |
| orderInfo | 订单信息对象 | Object | - |

#### orderInfo 对象结构

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| id/orderId | 订单ID | String/Number | 是 |
| pickupStoreId | 取车门店ID | Number | 是 |
| returnStoreId | 还车门店ID | Number | 否 |
| pickupStoreName | 取车门店名称 | String | 是 |
| returnStoreName | 还车门店名称 | String | 否 |
| pickupAddr | 取车地址 | String | 是 |
| returnAddr | 还车地址 | String | 否 |
| pickupDateStr | 取车时间字符串 | String | 是 |
| returnDateStr | 还车时间字符串 | String | 否 |
| pickupDriver | 取车司机状态 | String | 否 |
| returnDriver | 还车司机状态 | String | 否 |
| orderStatusStr | 订单状态字符串 | String | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 弹窗显示状态变化 | show: Boolean |
| close | 弹窗关闭时触发 | - |
| on-ok | 司机安排成功时触发 | - |

## 示例

### 完整示例

```vue
<template>
  <div class="driver-arrange-demo">
    <van-cell-group>
      <van-cell
        title="订单司机安排"
        is-link
        @click="openArrangeDriver"
      />
    </van-cell-group>

    <FaceArrangeDrivers
      v-model:show="visible"
      :order-info="currentOrder"
      @close="handleClose"
      @on-ok="handleArrangeSuccess"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const visible = ref(false)
const currentOrder = ref({
  orderId: 'ORD20240115001',
  pickupStoreId: 101,
  returnStoreId: 102,
  pickupStoreName: '北京朝阳门店',
  returnStoreName: '北京西单门店',
  pickupAddr: '北京市朝阳区建国门外大街1号',
  returnAddr: '北京市西城区西单北大街1号',
  pickupDateStr: '2024-01-15 09:00',
  returnDateStr: '2024-01-20 18:00',
  pickupDriver: '待排司机',
  returnDriver: '待排司机',
  orderStatusStr: '待取车'
})

const openArrangeDriver = () => {
  visible.value = true
}

const handleClose = () => {
  visible.value = false
}

const handleArrangeSuccess = () => {
  Toast.success('司机安排成功')
  visible.value = false
  // 重新获取订单数据
  refreshOrderData()
}

const refreshOrderData = () => {
  // 刷新订单数据的逻辑
  console.log('刷新订单数据')
}
</script>
```

### 已安排司机的订单

```vue
<template>
  <FaceArrangeDrivers
    v-model:show="showModal"
    :order-info="arrangedOrder"
    @close="handleClose"
    @on-ok="handleUpdate"
  />
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const arrangedOrder = ref({
  orderId: 'ORD20240115002',
  pickupStoreId: 101,
  returnStoreId: 102,
  pickupStoreName: '北京朝阳门店',
  returnStoreName: '北京西单门店',
  pickupAddr: '北京市朝阳区建国门外大街1号',
  returnAddr: '北京市西城区西单北大街1号',
  pickupDateStr: '2024-01-15 09:00',
  returnDateStr: '2024-01-20 18:00',
  pickupDriver: '张师傅 13800138001',
  returnDriver: '待排司机',
  orderStatusStr: '已取车'
})

const handleClose = () => {
  showModal.value = false
}

const handleUpdate = () => {
  console.log('司机信息更新成功')
  showModal.value = false
}
</script>
```

## 特性

- 🚗 **双司机管理**: 支持取车司机和还车司机的分别安排
- 📱 **底部弹窗**: 60%高度的底部弹窗，适合移动端操作
- 🔄 **状态管理**: 自动根据订单状态切换标签页
- 👥 **司机选择**: 集成FaceSelector组件进行司机选择
- ✅ **编辑模式**: 已安排司机可查看信息并支持更换
- 🎯 **智能切换**: 根据司机安排状态自动切换到对应标签页

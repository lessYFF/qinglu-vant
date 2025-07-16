# FaceComboFeePanel

组合费用面板组件，用于动态添加和管理多种费用项目。

## 基础用法

```vue
<template>
  <FaceComboFeePanel
    title="附加费用"
    :actions="feeActions"
    :radios="feeRadios"
    @change="handleFeeChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceComboFeePanel } from 'qinglu-vant'

const feeActions = ref([
  { name: '保险费', value: { id: 1, itemType: 'insurance' } },
  { name: '服务费', value: { id: 2, itemType: 'service' } },
  { name: '清洁费', value: { id: 3, itemType: 'cleaning' } }
])

const feeRadios = ref([
  { text: '收费', value: '1' },
  { text: '退费', value: '2' }
])

const handleFeeChange = (data) => {
  console.log('费用变更:', data)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 面板标题 | String | - |
| addButtonText | 添加按钮文字 | String | '添加费用项' |
| label | 字段标签 | String | - |
| actionTitle | 选择器标题 | String | '选择费用类目' |
| radios | 单选项配置 | Array | [] |
| actions | 可选费用项目 | Array | [] |
| zzqhTf | 租转购换退费数据 | Array | [] |
| disabled | 是否禁用 | Boolean | false |
| initValue | 初始值 | Array | [] |
| defaultRadio | 默认单选值 | String | - |

#### radios 数组项结构

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| text | 显示文本 | String | 是 |
| value | 选项值 | String | 是 |

#### actions 数组项结构

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| name | 费用项名称 | String | 是 |
| value | 费用项配置对象 | Object | 是 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 费用变化时触发 | data: 费用数据对象 |

#### change 事件回调参数结构

| 字段 | 说明 | 类型 |
|------|------|------|
| radioValue | 当前选中的单选值 | String |
| group | 费用项目列表 | Array |

## 示例

### 基础费用管理

```vue
<template>
  <div class="fee-management">
    <FaceComboFeePanel
      title="订单费用"
      :actions="availableFees"
      :radios="feeTypes"
      @change="handleFeeUpdate"
    />

    <div class="fee-summary" v-if="currentFees.group?.length">
      <h3>费用汇总</h3>
      <div class="fee-list">
        <div
          v-for="fee in currentFees.group"
          :key="fee.name"
          class="fee-item"
        >
          <span class="fee-name">{{ fee.name }}</span>
          <span class="fee-amount">¥{{ fee.value }}</span>
        </div>
      </div>
      <div class="total-amount">
        <strong>总计: ¥{{ totalAmount }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentFees = ref({ radioValue: '1', group: [] })

const feeTypes = ref([
  { text: '收费', value: '1' },
  { text: '退费', value: '2' }
])

const availableFees = ref([
  {
    name: '保险费',
    value: {
      id: 1,
      itemType: 'insurance',
      description: '车辆保险费用'
    }
  },
  {
    name: '服务费',
    value: {
      id: 2,
      itemType: 'service',
      description: '额外服务费用'
    }
  },
  {
    name: '清洁费',
    value: {
      id: 3,
      itemType: 'cleaning',
      description: '车辆清洁费用'
    }
  },
  {
    name: '违章押金',
    value: {
      id: 4,
      itemType: 'violation',
      description: '违章保证金'
    }
  },
  {
    name: '燃油费',
    value: {
      id: 5,
      itemType: 'fuel',
      description: '燃油补充费用'
    }
  }
])

const totalAmount = computed(() => {
  if (!currentFees.value.group?.length) return 0
  return currentFees.value.group.reduce((sum, fee) => {
    const amount = parseFloat(fee.value) || 0
    return sum + amount
  }, 0).toFixed(2)
})

const handleFeeUpdate = (data) => {
  currentFees.value = data
  console.log('费用更新:', data)
}
</script>

<style scoped>
.fee-management {
  padding: 16px;
}

.fee-summary {
  margin-top: 24px;
  padding: 16px;
  background: #f7f8fa;
  border-radius: 8px;
}

.fee-summary h3 {
  margin: 0 0 16px 0;
  color: #323233;
}

.fee-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ebedf0;
}

.fee-item:last-child {
  border-bottom: none;
}

.fee-name {
  color: #646566;
}

.fee-amount {
  color: #323233;
  font-weight: 500;
}

.total-amount {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid #1989fa;
  text-align: right;
  color: #1989fa;
}
</style>
```

### 退费管理

```vue
<template>
  <div class="refund-management">
    <FaceComboFeePanel
      title="退费管理"
      add-button-text="添加退费项"
      action-title="选择退费类目"
      :actions="refundActions"
      :radios="refundTypes"
      :init-value="initialRefunds"
      default-radio="2"
      @change="handleRefundChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const initialRefunds = ref([
  {
    name: '押金退还',
    value: '500.00',
    fieldInfo: { id: 1, itemType: 'deposit' }
  }
])

const refundTypes = ref([
  { text: '全额退费', value: '1' },
  { text: '部分退费', value: '2' },
  { text: '扣费退还', value: '3' }
])

const refundActions = ref([
  {
    name: '押金退还',
    value: {
      id: 1,
      itemType: 'deposit',
      maxAmount: 1000
    }
  },
  {
    name: '预付费退还',
    value: {
      id: 2,
      itemType: 'prepaid',
      maxAmount: 500
    }
  },
  {
    name: '保险费退还',
    value: {
      id: 3,
      itemType: 'insurance',
      maxAmount: 200
    }
  }
])

const handleRefundChange = (data) => {
  console.log('退费变更:', data)
}
</script>
```

### 禁用状态

```vue
<template>
  <div class="disabled-demo">
    <van-cell-group>
      <van-cell title="费用状态" :value="feeStatus" />
    </van-cell-group>

    <FaceComboFeePanel
      title="已锁定费用"
      :actions="lockedActions"
      :radios="lockedRadios"
      :disabled="true"
      :init-value="lockedFees"
    />

    <div class="status-note">
      <van-notice-bar
        text="费用已锁定，无法修改。如需调整请联系管理员。"
        left-icon="info-o"
        color="#1989fa"
        background="#ecf9ff"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const feeStatus = ref('已锁定')

const lockedFees = ref([
  {
    name: '保险费',
    value: '200.00',
    fieldInfo: { id: 1, itemType: 'insurance' }
  },
  {
    name: '服务费',
    value: '100.00',
    fieldInfo: { id: 2, itemType: 'service' }
  }
])

const lockedRadios = ref([
  { text: '收费', value: '1' },
  { text: '退费', value: '2' }
])

const lockedActions = ref([
  { name: '保险费', value: { id: 1, itemType: 'insurance' } },
  { name: '服务费', value: { id: 2, itemType: 'service' } }
])
</script>

<style scoped>
.disabled-demo {
  padding: 16px;
}

.status-note {
  margin-top: 16px;
}
</style>
```

## 特性

- 💰 **动态费用**: 支持动态添加和删除费用项目
- 🔄 **收退切换**: 内置收费/退费切换功能
- 📝 **实时编辑**: 支持实时编辑费用金额
- 🎯 **智能过滤**: 已添加的费用项自动从可选列表中移除
- 🔒 **禁用状态**: 支持整体禁用，适用于已锁定的费用
- 📊 **数据结构**: 完整的费用数据结构，包含类型和配置信息
- 🎨 **自定义文本**: 支持自定义按钮文字和标题文本

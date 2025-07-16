# FaceLongOrderLeachBar

长订单筛选栏组件，提供长租订单的多维度筛选功能。

## 基础用法

```vue
<template>
  <FaceLongOrderLeachBar
    @change="handleFilterChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceLongOrderLeachBar } from 'qinglu-vant'

const handleFilterChange = (filterData) => {
  console.log('筛选条件变化:', filterData)
}
</script>
```

## API

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 筛选条件变化时触发 | filterData: 筛选数据对象 |

#### filterData 对象结构

| 字段 | 说明 | 类型 |
|------|------|------|
| status | 订单状态筛选 | Array |
| payStatus | 支付状态筛选 | Array |
| store | 门店筛选 | Array |
| time | 时间筛选 | Object |

#### time 对象结构

| 字段 | 说明 | 类型 |
|------|------|------|
| createTime | 创建时间 | Array |
| dueGetCarTime | 预计取车时间 | Array |
| dueReturnCarTime | 预计还车时间 | Array |
| getCarTime | 实际取车时间 | Array |
| returnCarTime | 实际还车时间 | Array |

### Methods

通过ref可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| reset | 重置所有筛选条件 | - |

## 示例

### 基础筛选

```vue
<template>
  <div class="long-order-filter">
    <FaceLongOrderLeachBar
      ref="filterBarRef"
      @change="handleFilterChange"
    />

    <div class="filter-result" v-if="currentFilter">
      <h3>当前筛选条件</h3>
      <div class="filter-item" v-if="currentFilter.status?.length">
        <span class="label">订单状态:</span>
        <van-tag
          v-for="status in currentFilter.status"
          :key="status.value"
          type="primary"
          size="small"
        >
          {{ status.text }}
        </van-tag>
      </div>

      <div class="filter-item" v-if="currentFilter.payStatus?.length">
        <span class="label">支付状态:</span>
        <van-tag
          v-for="payStatus in currentFilter.payStatus"
          :key="payStatus.value"
          type="success"
          size="small"
        >
          {{ payStatus.text }}
        </van-tag>
      </div>

      <div class="filter-item" v-if="currentFilter.store?.length">
        <span class="label">门店:</span>
        <van-tag
          v-for="store in currentFilter.store"
          :key="store.value"
          type="warning"
          size="small"
        >
          {{ store.text }}
        </van-tag>
      </div>

      <div class="filter-actions">
        <van-button size="small" @click="resetFilter">
          重置筛选
        </van-button>
        <van-button size="small" type="primary" @click="applyFilter">
          应用筛选
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const filterBarRef = ref(null)
const currentFilter = ref(null)

const handleFilterChange = (filterData) => {
  currentFilter.value = filterData
  console.log('筛选条件变化:', filterData)
}

const resetFilter = () => {
  filterBarRef.value?.reset()
  currentFilter.value = null
}

const applyFilter = () => {
  // 应用筛选条件，通常是调用API获取数据
  console.log('应用筛选条件:', currentFilter.value)
}
</script>

<style scoped>
.long-order-filter {
  background: #f7f8fa;
}

.filter-result {
  padding: 16px;
  background: white;
  margin-top: 8px;
}

.filter-result h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #323233;
}

.filter-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
}

.filter-item .label {
  font-size: 14px;
  color: #646566;
  min-width: 80px;
}

.filter-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}
</style>
```

## 特性

- 🔍 **多维度筛选**: 支持订单状态、支付状态、门店、时间等多维度筛选
- 📅 **时间范围**: 支持多种时间维度的范围选择
- 🏪 **门店筛选**: 支持按门店筛选长租订单
- 🔄 **实时更新**: 筛选条件变化时实时触发事件
- 🧹 **一键重置**: 支持一键重置所有筛选条件
- 📱 **移动端优化**: 下拉菜单式的筛选界面，适合移动端操作
- ⚡ **性能优化**: 智能的数据更新机制，避免不必要的重渲染

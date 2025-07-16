# FaceOrderSearchBar

订单搜索栏组件，提供短租订单的多种搜索条件快速搜索功能。

## 基础用法

```vue
<template>
  <FaceOrderSearchBar
    placeholder="请输入搜索内容"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceOrderSearchBar } from 'qinglu-vant'

const handleSearch = (searchData) => {
  console.log('搜索:', searchData)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| placeholder | 搜索框占位符 | String | '' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| search | 搜索时触发 | searchData: 搜索数据对象 |

#### searchData 对象结构

| 字段 | 说明 | 类型 |
|------|------|------|
| type | 搜索类型 | String |
| keyword | 搜索关键词 | String |

#### 搜索类型说明

| 值 | 说明 |
|---|------|
| orderId | 订单号 |
| mobile | 手机号 |
| vehicleNo | 车牌号 |
| name | 客户姓名 |

## 示例

### 基础搜索

```vue
<template>
  <div class="search-demo">
    <FaceOrderSearchBar
      placeholder="请输入搜索内容"
      @search="handleSearch"
    />

    <div class="search-result" v-if="searchResult">
      <h3>搜索结果</h3>
      <p><strong>搜索类型:</strong> {{ getSearchTypeText(searchResult.type) }}</p>
      <p><strong>搜索关键词:</strong> {{ searchResult.keyword }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchResult = ref(null)

const searchTypeMap = {
  orderId: '订单号',
  mobile: '手机号',
  vehicleNo: '车牌号',
  name: '客户姓名'
}

const handleSearch = (searchData) => {
  searchResult.value = searchData
  console.log('搜索:', searchData)
}

const getSearchTypeText = (type) => {
  return searchTypeMap[type] || type
}
</script>

<style scoped>
.search-demo {
  background: #f7f8fa;
  min-height: 100vh;
}

.search-result {
  padding: 16px;
  background: white;
  margin: 8px 16px;
  border-radius: 8px;
}
</style>
```

## 特性

- 🔍 **多类型搜索**: 支持订单号、手机号、车牌号、客户姓名等搜索
- 📝 **搜索历史**: 自动保存搜索历史
- 🎯 **智能切换**: 下拉菜单快速切换搜索类型
- 📱 **移动端优化**: 适合移动端的搜索界面
- ⚡ **实时搜索**: 支持实时搜索和结果展示

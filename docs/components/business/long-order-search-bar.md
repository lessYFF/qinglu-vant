# FaceLongOrderSearchBar

长租订单搜索栏组件，提供多种搜索条件的快速搜索功能。

## 基础用法

```vue
<template>
  <FaceLongOrderSearchBar
    placeholder="请输入搜索内容"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceLongOrderSearchBar } from 'qinglu-vant'

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
    <FaceLongOrderSearchBar
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

  // 这里通常会调用API进行搜索
  performSearch(searchData)
}

const getSearchTypeText = (type) => {
  return searchTypeMap[type] || type
}

const performSearch = (searchData) => {
  // 模拟API调用
  console.log(`按${getSearchTypeText(searchData.type)}搜索: ${searchData.keyword}`)
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

.search-result h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #323233;
}

.search-result p {
  margin: 8px 0;
  font-size: 14px;
  color: #646566;
}
</style>
```

### 搜索历史

```vue
<template>
  <div class="search-history-demo">
    <FaceLongOrderSearchBar
      placeholder="请输入搜索内容"
      @search="handleSearchWithHistory"
    />

    <div class="search-history" v-if="searchHistory.length">
      <h3>搜索历史</h3>
      <div class="history-list">
        <van-tag
          v-for="(item, index) in searchHistory"
          :key="index"
          type="primary"
          plain
          closeable
          @click="searchFromHistory(item)"
          @close="removeFromHistory(index)"
        >
          {{ getSearchTypeText(item.type) }}: {{ item.keyword }}
        </van-tag>
      </div>

      <van-button size="small" @click="clearHistory">
        清空历史
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const searchHistory = ref([])

const searchTypeMap = {
  orderId: '订单号',
  mobile: '手机号',
  vehicleNo: '车牌号',
  name: '客户姓名'
}

onMounted(() => {
  loadSearchHistory()
})

const handleSearchWithHistory = (searchData) => {
  console.log('搜索:', searchData)

  // 添加到搜索历史
  addToHistory(searchData)

  // 执行搜索
  performSearch(searchData)
}

const addToHistory = (searchData) => {
  // 检查是否已存在
  const existIndex = searchHistory.value.findIndex(
    item => item.type === searchData.type && item.keyword === searchData.keyword
  )

  if (existIndex > -1) {
    // 移动到最前面
    searchHistory.value.splice(existIndex, 1)
  }

  // 添加到最前面
  searchHistory.value.unshift(searchData)

  // 限制历史记录数量
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10)
  }

  // 保存到本地存储
  saveSearchHistory()
}

const searchFromHistory = (historyItem) => {
  console.log('从历史记录搜索:', historyItem)
  performSearch(historyItem)
}

const removeFromHistory = (index) => {
  searchHistory.value.splice(index, 1)
  saveSearchHistory()
}

const clearHistory = () => {
  searchHistory.value = []
  saveSearchHistory()
}

const saveSearchHistory = () => {
  localStorage.setItem('longOrderSearchHistory', JSON.stringify(searchHistory.value))
}

const loadSearchHistory = () => {
  const saved = localStorage.getItem('longOrderSearchHistory')
  if (saved) {
    searchHistory.value = JSON.parse(saved)
  }
}

const getSearchTypeText = (type) => {
  return searchTypeMap[type] || type
}

const performSearch = (searchData) => {
  console.log(`执行搜索: ${getSearchTypeText(searchData.type)} - ${searchData.keyword}`)
}
</script>

<style scoped>
.search-history-demo {
  background: #f7f8fa;
  min-height: 100vh;
}

.search-history {
  padding: 16px;
  background: white;
  margin: 8px 16px;
  border-radius: 8px;
}

.search-history h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #323233;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
</style>
```

### 订单列表集成

```vue
<template>
  <div class="order-search-page">
    <FaceLongOrderSearchBar
      placeholder="搜索订单号、手机号、车牌号或客户姓名"
      @search="handleOrderSearch"
    />

    <div class="search-results" v-if="searchResults.length">
      <h3>搜索结果 ({{ searchResults.length }})</h3>

      <div
        v-for="order in searchResults"
        :key="order.id"
        class="order-item"
      >
        <van-cell-group>
          <van-cell
            :title="`订单 ${order.orderNo}`"
            :value="order.statusText"
          />
          <van-cell
            title="客户信息"
            :value="`${order.customerName} ${order.mobile}`"
          />
          <van-cell
            title="车辆信息"
            :value="`${order.vehicleBrand} ${order.vehicleNo}`"
          />
          <van-cell
            title="租期"
            :value="`${order.startDate} 至 ${order.endDate}`"
          />
        </van-cell-group>
      </div>
    </div>

    <div class="no-results" v-else-if="hasSearched">
      <van-empty description="未找到相关订单" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchResults = ref([])
const hasSearched = ref(false)

const handleOrderSearch = (searchData) => {
  hasSearched.value = true

  // 模拟API搜索
  searchResults.value = mockSearchOrders(searchData)
}

const mockSearchOrders = (searchData) => {
  // 模拟搜索结果
  const mockOrders = [
    {
      id: 1,
      orderNo: 'LO20240115001',
      statusText: '进行中',
      customerName: '张三',
      mobile: '13800138000',
      vehicleBrand: '丰田凯美瑞',
      vehicleNo: '京A12345',
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    },
    {
      id: 2,
      orderNo: 'LO20240115002',
      statusText: '已完成',
      customerName: '李四',
      mobile: '13800138001',
      vehicleBrand: '本田雅阁',
      vehicleNo: '京B67890',
      startDate: '2024-01-10',
      endDate: '2024-02-10'
    }
  ]

  // 根据搜索类型和关键词过滤
  return mockOrders.filter(order => {
    const keyword = searchData.keyword.toLowerCase()
    switch (searchData.type) {
      case 'orderId':
        return order.orderNo.toLowerCase().includes(keyword)
      case 'mobile':
        return order.mobile.includes(keyword)
      case 'vehicleNo':
        return order.vehicleNo.toLowerCase().includes(keyword)
      case 'name':
        return order.customerName.includes(keyword)
      default:
        return false
    }
  })
}
</script>

<style scoped>
.order-search-page {
  background: #f7f8fa;
  min-height: 100vh;
}

.search-results {
  padding: 16px;
}

.search-results h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #323233;
}

.order-item {
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
}

.no-results {
  padding: 40px 16px;
}
</style>
```

## 特性

- 🔍 **多类型搜索**: 支持订单号、手机号、车牌号、客户姓名等多种搜索类型
- 📝 **搜索历史**: 自动保存搜索历史，支持快速重复搜索
- 🎯 **智能切换**: 下拉菜单快速切换搜索类型
- 💾 **本地存储**: 搜索条件和历史记录本地持久化
- 📱 **移动端优化**: 适合移动端的搜索界面设计
- ⚡ **实时搜索**: 支持实时搜索和结果展示
- 🧹 **历史管理**: 支持删除单条历史和清空所有历史

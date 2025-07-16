# FaceServiceDetailModal

服务详情弹窗组件，用于显示服务项目的详细信息和说明。

## 基础用法

```vue
<template>
  <div>
    <van-button @click="showServiceDetail = true">查看服务详情</van-button>

    <FaceServiceDetailModal
      v-model:show="showServiceDetail"
      :service-info="serviceInfo"
      @close="handleClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FaceServiceDetailModal } from 'qinglu-vant'

const showServiceDetail = ref(false)
const serviceInfo = ref({
  name: '保险升级服务',
  description: '提供更全面的保险保障',
  price: 50,
  features: ['全险保障', '零免赔', '24小时救援']
})

const handleClose = () => {
  showServiceDetail.value = false
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model:show | 控制弹窗显示/隐藏 | Boolean | false |
| serviceInfo | 服务信息对象 | Object | - |

#### serviceInfo 对象结构

| 字段 | 说明 | 类型 |
|------|------|------|
| name | 服务名称 | String |
| description | 服务描述 | String |
| price | 服务价格 | Number |
| features | 服务特性列表 | Array |
| images | 服务图片列表 | Array |
| terms | 服务条款 | String |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 弹窗显示状态变化 | show: Boolean |
| close | 弹窗关闭时触发 | - |
| select | 选择服务时触发 | serviceInfo: 服务信息 |

## 示例

### 基础服务详情

```vue
<template>
  <div class="service-detail-demo">
    <van-cell-group>
      <van-cell
        title="保险升级服务"
        label="提供更全面的保险保障"
        :value="`¥${basicService.price}`"
        is-link
        @click="showBasicService"
      />
    </van-cell-group>

    <FaceServiceDetailModal
      v-model:show="showModal"
      :service-info="basicService"
      @close="handleClose"
      @select="handleSelectService"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const basicService = ref({
  name: '保险升级服务',
  description: '为您的租车之旅提供更全面的保险保障，让您出行更安心。',
  price: 50,
  features: [
    '全险保障，覆盖车损、三者、盗抢等',
    '零免赔额，无需承担维修费用',
    '24小时道路救援服务',
    '异地出险快速理赔',
    '代步车服务'
  ],
  images: [
    'https://example.com/insurance1.jpg',
    'https://example.com/insurance2.jpg'
  ],
  terms: '本服务适用于所有车型，服务期间为整个租车周期。如遇特殊情况，请联系客服处理。'
})

const showBasicService = () => {
  showModal.value = true
}

const handleClose = () => {
  showModal.value = false
}

const handleSelectService = (serviceInfo) => {
  console.log('选择服务:', serviceInfo)
  showModal.value = false
}
</script>
```

### 多种服务类型

```vue
<template>
  <div class="multiple-services-demo">
    <van-cell-group>
      <van-cell
        v-for="service in serviceList"
        :key="service.id"
        :title="service.name"
        :label="service.description"
        :value="`¥${service.price}`"
        is-link
        @click="() => showServiceDetail(service)"
      />
    </van-cell-group>

    <FaceServiceDetailModal
      v-model:show="showModal"
      :service-info="selectedService"
      @close="handleClose"
      @select="handleSelectService"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const selectedService = ref(null)

const serviceList = ref([
  {
    id: 1,
    name: '保险升级服务',
    description: '全险保障，零免赔',
    price: 50,
    features: ['全险保障', '零免赔', '24小时救援'],
    terms: '适用于所有车型，整个租车周期有效。'
  },
  {
    id: 2,
    name: '上门取还车',
    description: '专人上门取还车服务',
    price: 30,
    features: ['专人上门', '免费等待30分钟', '市区范围内'],
    terms: '仅限市区范围内，超出范围需额外收费。'
  },
  {
    id: 3,
    name: '代驾服务',
    description: '专业代驾，安全到达',
    price: 80,
    features: ['专业代驾', '安全保障', '24小时服务'],
    terms: '按小时计费，最低消费2小时。'
  },
  {
    id: 4,
    name: '洗车服务',
    description: '专业洗车，焕然一新',
    price: 25,
    features: ['内外清洁', '专业设备', '环保用品'],
    terms: '还车时提供，需提前预约。'
  }
])

const showServiceDetail = (service) => {
  selectedService.value = service
  showModal.value = true
}

const handleClose = () => {
  showModal.value = false
}

const handleSelectService = (serviceInfo) => {
  console.log('选择服务:', serviceInfo)
  showModal.value = false
}
</script>
```

### 服务对比

```vue
<template>
  <div class="service-comparison-demo">
    <h3>服务对比</h3>

    <van-grid :column-num="2" :border="false">
      <van-grid-item
        v-for="service in comparisonServices"
        :key="service.id"
        @click="() => showComparison(service)"
      >
        <div class="service-card">
          <h4>{{ service.name }}</h4>
          <p class="price">¥{{ service.price }}</p>
          <van-button size="small" type="primary">查看详情</van-button>
        </div>
      </van-grid-item>
    </van-grid>

    <FaceServiceDetailModal
      v-model:show="showModal"
      :service-info="selectedService"
      @close="handleClose"
      @select="handleSelectService"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const selectedService = ref(null)

const comparisonServices = ref([
  {
    id: 1,
    name: '基础保险',
    price: 0,
    features: ['基本车损险', '第三者责任险'],
    description: '基础保障，满足基本需求'
  },
  {
    id: 2,
    name: '全险保障',
    price: 50,
    features: ['全险保障', '零免赔', '24小时救援', '代步车服务'],
    description: '全面保障，出行无忧'
  }
])

const showComparison = (service) => {
  selectedService.value = service
  showModal.value = true
}

const handleClose = () => {
  showModal.value = false
}

const handleSelectService = (serviceInfo) => {
  console.log('选择服务:', serviceInfo)
  showModal.value = false
}
</script>

<style scoped>
.service-comparison-demo {
  padding: 16px;
}

.service-comparison-demo h3 {
  margin: 0 0 16px 0;
  text-align: center;
}

.service-card {
  padding: 16px;
  text-align: center;
  border: 1px solid #ebedf0;
  border-radius: 8px;
  margin: 8px;
}

.service-card h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.service-card .price {
  font-size: 20px;
  font-weight: 600;
  color: #ff6b35;
  margin: 8px 0;
}
</style>
```

## 特性

- 📋 **详细信息**: 展示服务的完整信息和特性
- 🖼️ **图片展示**: 支持服务相关图片的展示
- 💰 **价格显示**: 清晰展示服务价格
- 📜 **服务条款**: 显示服务的使用条款和说明
- 🎯 **选择功能**: 支持直接选择服务
- 📱 **底部弹窗**: 60%-80%高度的底部弹窗，适合移动端
- 🔄 **动态内容**: 支持动态加载不同服务的详情

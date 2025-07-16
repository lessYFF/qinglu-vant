# FaceTagsField

标签字段组件，支持多选标签，带搜索和全选功能。

## 基础用法

```vue
<template>
  <FaceTagsField
    v-model="selectedTags"
    title="选择标签"
    :columns="tagOptions"
    placeholder="请选择标签"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceTagsField } from 'qinglu-vant'

const selectedTags = ref([])
const tagOptions = ref([
  { label: '热门', value: 'hot' },
  { label: '推荐', value: 'recommend' },
  { label: '新品', value: 'new' },
  { label: '限时', value: 'limited' }
])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定的标签数组 | Array | [] |
| columns | 可选标签列表 | Array | [] |
| title | 选择器标题 | String | - |
| disabled | 是否禁用 | Boolean | false |
| openSelectAll | 是否开启全选功能 | Boolean | false |
| search | 是否开启搜索功能 | Boolean | false |
| isKCST | 是否为KCST模式 | Boolean | false |
| kcstVehicleModelId | KCST车型ID | Number | - |
| placeholder | 占位符文本 | String | - |

#### columns 数组项结构

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| label | 标签显示文本 | String | 是 |
| value | 标签值 | String \| Number | 是 |
| required | 是否必选 | Boolean | 否 |
| disabled | 是否禁用 | Boolean | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选择变化时触发 | tags: 选中的标签数组 |
| show | 显示选择器时触发 | - |

## 示例

### 基础多选标签

```vue
<template>
  <van-cell-group>
    <FaceTagsField
      v-model="basicTags"
      title="选择标签"
      :columns="basicColumns"
      placeholder="请选择标签"
    />
  </van-cell-group>

  <div class="selected-tags" v-if="basicTags.length">
    <h3>已选标签</h3>
    <van-tag
      v-for="tag in basicTags"
      :key="tag.value"
      type="primary"
      style="margin-right: 8px; margin-bottom: 8px;"
    >
      {{ tag.label }}
    </van-tag>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const basicTags = ref([])
const basicColumns = ref([
  { label: '热门商品', value: 'hot' },
  { label: '新品上市', value: 'new' },
  { label: '限时优惠', value: 'limited' },
  { label: '推荐商品', value: 'recommend' },
  { label: '精选好物', value: 'featured' },
  { label: '品质保证', value: 'quality' }
])
</script>

<style scoped>
.selected-tags {
  margin-top: 16px;
  padding: 16px;
  background: #f7f8fa;
}

.selected-tags h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #323233;
}
</style>
```

### 带搜索功能

```vue
<template>
  <van-cell-group>
    <FaceTagsField
      v-model="searchTags"
      title="搜索标签"
      :columns="searchColumns"
      :search="true"
      placeholder="请选择或搜索标签"
    />
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const searchTags = ref([])
const searchColumns = ref([
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Node.js', value: 'node' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'Go', value: 'go' }
])
</script>
```

### 带全选功能

```vue
<template>
  <van-cell-group>
    <FaceTagsField
      v-model="allSelectTags"
      title="选择服务"
      :columns="serviceColumns"
      :open-select-all="true"
      placeholder="请选择服务项目"
    />
  </van-cell-group>

  <div class="service-summary">
    <p>已选择 {{ allSelectTags.length }} 项服务</p>
    <p>总价: ¥{{ totalPrice }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const allSelectTags = ref([])
const serviceColumns = ref([
  { label: '基础清洁', value: 'basic_clean', price: 50 },
  { label: '深度清洁', value: 'deep_clean', price: 100 },
  { label: '内饰保养', value: 'interior_care', price: 80 },
  { label: '外观打蜡', value: 'waxing', price: 120 },
  { label: '轮胎保养', value: 'tire_care', price: 60 },
  { label: '发动机清洁', value: 'engine_clean', price: 150 }
])

const totalPrice = computed(() => {
  return allSelectTags.value.reduce((sum, tag) => {
    const service = serviceColumns.value.find(s => s.value === tag.value)
    return sum + (service?.price || 0)
  }, 0)
})
</script>

<style scoped>
.service-summary {
  margin-top: 16px;
  padding: 16px;
  background: #f0f9ff;
  border-radius: 8px;
}
</style>
```

### 必选和禁用项

```vue
<template>
  <van-cell-group>
    <FaceTagsField
      v-model="requiredTags"
      title="选择保险"
      :columns="insuranceColumns"
      placeholder="请选择保险类型"
    />
  </van-cell-group>

  <div class="insurance-notice">
    <van-notice-bar
      text="基础保险为必选项，优享保险和尊享保险不能同时选择"
      left-icon="info-o"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const requiredTags = ref([
  { label: '基础保险', value: 'basic' } // 预选必选项
])

const insuranceColumns = ref([
  {
    label: '基础保险',
    value: 'basic',
    required: true // 必选项
  },
  {
    label: '优享保险',
    value: 'better'
  },
  {
    label: '尊享保险',
    value: 'best'
  },
  {
    label: '临时保险',
    value: 'temp',
    disabled: true // 禁用项
  }
])
</script>

<style scoped>
.insurance-notice {
  margin-top: 16px;
}
</style>
```

### KCST模式

```vue
<template>
  <div class="kcst-demo">
    <van-cell-group>
      <van-cell title="KCST模式">
        <template #right-icon>
          <van-switch v-model="kcstMode" size="24" />
        </template>
      </van-cell>

      <FaceTagsField
        v-model="kcstTags"
        title="选择服务"
        :columns="kcstColumns"
        :is-k-c-s-t="kcstMode"
        :kcst-vehicle-model-id="vehicleModelId"
        placeholder="请选择服务项目"
      />
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const kcstMode = ref(false)
const vehicleModelId = ref(1)
const kcstTags = ref([])

const kcstColumns = ref([
  { label: '上门取车', value: 'pickup_service' },
  { label: '上门还车', value: 'return_service' },
  { label: '代驾服务', value: 'driver_service' },
  { label: '洗车服务', value: 'wash_service' },
  { label: '加油服务', value: 'fuel_service' }
])
</script>
```

### 表单集成

```vue
<template>
  <van-form @submit="onSubmit">
    <van-cell-group>
      <van-field
        v-model="formData.title"
        label="商品标题"
        placeholder="请输入商品标题"
        :rules="[{ required: true, message: '请填写商品标题' }]"
      />

      <FaceTagsField
        v-model="formData.tags"
        title="商品标签"
        :columns="productTags"
        :search="true"
        :open-select-all="true"
        placeholder="请选择商品标签"
        :rules="[{ required: true, message: '请选择至少一个标签' }]"
      />

      <FaceTagsField
        v-model="formData.categories"
        title="商品分类"
        :columns="categoryTags"
        placeholder="请选择商品分类"
        :rules="[{ required: true, message: '请选择商品分类' }]"
      />
    </van-cell-group>

    <div class="submit-area">
      <van-button type="primary" native-type="submit" block>
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const formData = ref({
  title: '',
  tags: [],
  categories: []
})

const productTags = ref([
  { label: '热销', value: 'hot_sale' },
  { label: '新品', value: 'new_product' },
  { label: '限量', value: 'limited' },
  { label: '包邮', value: 'free_shipping' },
  { label: '正品', value: 'authentic' },
  { label: '特价', value: 'special_price' }
])

const categoryTags = ref([
  { label: '电子产品', value: 'electronics' },
  { label: '服装鞋帽', value: 'clothing' },
  { label: '家居用品', value: 'home' },
  { label: '美妆护肤', value: 'beauty' },
  { label: '运动户外', value: 'sports' }
])

const onSubmit = (values) => {
  console.log('表单提交:', formData.value)
  Toast.success('提交成功')
}
</script>

<style scoped>
.submit-area {
  padding: 16px;
}
</style>
```

## 特性

- 🏷️ **多选标签**: 支持多个标签的选择和取消
- 🔍 **搜索功能**: 支持按标签名称搜索过滤
- ✅ **全选功能**: 支持一键全选/取消全选
- 🔒 **必选项**: 支持设置必选标签，不可取消
- 🚫 **禁用项**: 支持禁用特定标签选项
- 🎯 **智能互斥**: 支持特定标签间的互斥逻辑（如保险类型）
- 📱 **移动端优化**: 底部弹出的多选界面，适合移动端操作
- 🔧 **表单集成**: 完全兼容van-form的验证和提交机制

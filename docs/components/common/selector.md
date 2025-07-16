# FaceSelector

选择器组件，用于多选项选择功能，支持网格布局和选中状态显示。

## 基础用法

```vue
<template>
  <FaceSelector
    :value="selectedValue"
    :options="options"
    :field-names="fieldNames"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceSelector } from 'qinglu-vant'

const selectedValue = ref('b')
const fieldNames = { value: 'id', label: 'name' }
const options = ref([
  { id: 'a', name: '选项A' },
  { id: 'b', name: '选项B' },
  { id: 'c', name: '选项C' }
])

const handleChange = (value) => {
  selectedValue.value = value
  console.log('选中值:', value)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前选中的值 | string \| number | - |
| options | 选项数据 | Array | [] |
| field-names | 自定义字段名 | Object | 见下方说明 |

#### field-names 对象结构

| 字段 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 指定选项值的字段名 | String | 'value' |
| label | 指定选项文本的字段名 | String | 'label' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选项变化时触发 | value: 当前选中的值 |

## 示例

### 基础选择器

```vue
<template>
  <FaceSelector
    :value="value"
    :options="basicOptions"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('option1')
const basicOptions = ref([
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
  { value: 'option4', label: '选项4' }
])

const handleChange = (val) => {
  value.value = val
}
</script>
```

### 自定义字段名

```vue
<template>
  <FaceSelector
    :value="selectedId"
    :options="customOptions"
    :field-names="customFieldNames"
    @change="handleCustomChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedId = ref(2)
const customFieldNames = { value: 'id', label: 'title' }
const customOptions = ref([
  { id: 1, title: '管理员' },
  { id: 2, title: '操作员' },
  { id: 3, title: '查看员' }
])

const handleCustomChange = (id) => {
  selectedId.value = id
}
</script>
```

## 特性

- 🎨 **网格布局**: 自动2列网格布局，适配移动端
- ✅ **选中标识**: 选中项显示蓝色边框和右下角对钩标识
- 📱 **响应式**: 支持不同屏幕尺寸的适配
- 🎯 **易用性**: 简单的API设计，支持自定义字段名
- 🎪 **视觉反馈**: 清晰的选中状态和hover效果

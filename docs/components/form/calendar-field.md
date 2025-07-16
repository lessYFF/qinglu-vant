# FaceCalendarField

日历字段组件，基于FaceCalendarPicker的表单字段，支持日期范围选择。

## 基础用法

```vue
<template>
  <FaceCalendarField
    v-model="dateRange"
    placeholder="请选择日期范围"
    label="租车时间"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceCalendarField } from 'qinglu-vant'

const dateRange = ref([])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定的日期范围数组 | Array | [] |
| format | 日期格式化模式 | String | 'yyyy-MM-dd HH:mm' |
| placeholder | 占位符文本 | String | - |
| label | 字段标签 | String | - |
| disabled | 是否禁用 | Boolean | false |
| clearable | 是否可清空 | Boolean | true |

#### v-model 数组结构

数组包含两个元素：[开始时间, 结束时间]
- 元素类型可以是：Number (时间戳) 或 String (日期字符串)

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 日期范围变化时触发 | dateRange: [start, end] |

## 示例

### 基础日期范围选择

```vue
<template>
  <van-cell-group>
    <FaceCalendarField
      v-model="basicRange"
      label="选择日期"
      placeholder="请选择开始和结束日期"
    />
  </van-cell-group>

  <div class="result">
    <p v-if="basicRange.length">
      选择的日期范围: {{ formatDateRange(basicRange) }}
    </p>
    <p v-else>未选择日期</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const basicRange = ref([])

const formatDateRange = (range) => {
  if (!range.length) return ''
  const [start, end] = range
  const startDate = new Date(start).toLocaleString()
  const endDate = new Date(end).toLocaleString()
  return `${startDate} 至 ${endDate}`
}
</script>

<style scoped>
.result {
  padding: 16px;
  background: #f7f8fa;
  margin-top: 16px;
}
</style>
```

### 自定义日期格式

```vue
<template>
  <van-cell-group>
    <FaceCalendarField
      v-model="customFormatRange"
      label="自定义格式"
      placeholder="选择日期（自定义格式）"
      format="yyyy年MM月dd日"
    />

    <FaceCalendarField
      v-model="timeFormatRange"
      label="包含时间"
      placeholder="选择日期时间"
      format="yyyy-MM-dd HH:mm:ss"
    />

    <FaceCalendarField
      v-model="dateOnlyRange"
      label="仅日期"
      placeholder="选择日期（不含时间）"
      format="yyyy-MM-dd"
    />
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const customFormatRange = ref([])
const timeFormatRange = ref([])
const dateOnlyRange = ref([])
</script>
```

### 租车时间选择

```vue
<template>
  <div class="rental-form">
    <van-cell-group>
      <FaceCalendarField
        v-model="rentalPeriod"
        label="租车时间"
        placeholder="请选择取车和还车时间"
        @update:model-value="handleRentalChange"
      />

      <van-cell title="租车天数" :value="rentalDays + ' 天'" />
      <van-cell title="预估费用" :value="'¥' + estimatedCost" />
    </van-cell-group>

    <div class="rental-summary" v-if="rentalPeriod.length">
      <h3>租车详情</h3>
      <p><strong>取车时间:</strong> {{ formatTime(rentalPeriod[0]) }}</p>
      <p><strong>还车时间:</strong> {{ formatTime(rentalPeriod[1]) }}</p>
      <p><strong>租车时长:</strong> {{ rentalDays }} 天 {{ rentalHours }} 小时</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const rentalPeriod = ref([])
const dailyRate = 200 // 每日租金

const rentalDays = computed(() => {
  if (!rentalPeriod.value.length) return 0
  const [start, end] = rentalPeriod.value
  return Math.ceil((end - start) / (24 * 60 * 60 * 1000))
})

const rentalHours = computed(() => {
  if (!rentalPeriod.value.length) return 0
  const [start, end] = rentalPeriod.value
  const totalHours = (end - start) / (60 * 60 * 1000)
  return Math.round(totalHours % 24)
})

const estimatedCost = computed(() => {
  return rentalDays.value * dailyRate
})

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

const handleRentalChange = (range) => {
  console.log('租车时间变更:', range)
}
</script>

<style scoped>
.rental-form {
  padding: 16px;
}

.rental-summary {
  margin-top: 20px;
  padding: 16px;
  background: #f0f9ff;
  border-radius: 8px;
}

.rental-summary h3 {
  margin: 0 0 12px 0;
  color: #1989fa;
}

.rental-summary p {
  margin: 8px 0;
  color: #323233;
}
</style>
```

### 预设日期范围

```vue
<template>
  <div class="preset-demo">
    <van-cell-group>
      <FaceCalendarField
        v-model="presetRange"
        label="预设范围"
        placeholder="选择日期范围"
      />
    </van-cell-group>

    <div class="preset-buttons">
      <van-button
        v-for="preset in presetOptions"
        :key="preset.label"
        size="small"
        type="primary"
        plain
        @click="() => setPreset(preset)"
      >
        {{ preset.label }}
      </van-button>

      <van-button size="small" @click="clearRange">
        清空
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const presetRange = ref([])

const presetOptions = [
  {
    label: '今天',
    getValue: () => {
      const today = new Date()
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1)
      return [start.getTime(), end.getTime()]
    }
  },
  {
    label: '明天',
    getValue: () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const start = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1)
      return [start.getTime(), end.getTime()]
    }
  },
  {
    label: '本周末',
    getValue: () => {
      const today = new Date()
      const saturday = new Date(today)
      saturday.setDate(today.getDate() + (6 - today.getDay()))
      const sunday = new Date(saturday)
      sunday.setDate(saturday.getDate() + 1)

      const start = new Date(saturday.getFullYear(), saturday.getMonth(), saturday.getDate())
      const end = new Date(sunday.getTime() + 24 * 60 * 60 * 1000 - 1)
      return [start.getTime(), end.getTime()]
    }
  },
  {
    label: '下周',
    getValue: () => {
      const today = new Date()
      const nextMonday = new Date(today)
      nextMonday.setDate(today.getDate() + (8 - today.getDay()))
      const nextSunday = new Date(nextMonday)
      nextSunday.setDate(nextMonday.getDate() + 6)

      const start = new Date(nextMonday.getFullYear(), nextMonday.getMonth(), nextMonday.getDate())
      const end = new Date(nextSunday.getTime() + 24 * 60 * 60 * 1000 - 1)
      return [start.getTime(), end.getTime()]
    }
  }
]

const setPreset = (preset) => {
  presetRange.value = preset.getValue()
}

const clearRange = () => {
  presetRange.value = []
}
</script>

<style scoped>
.preset-demo {
  padding: 16px;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}
</style>
```

### 表单验证

```vue
<template>
  <van-form @submit="handleSubmit">
    <van-cell-group>
      <FaceCalendarField
        v-model="formData.dateRange"
        label="活动时间"
        placeholder="请选择活动开始和结束时间"
        :rules="dateRangeRules"
      />

      <van-field
        v-model="formData.title"
        label="活动标题"
        placeholder="请输入活动标题"
        :rules="[{ required: true, message: '请输入活动标题' }]"
      />
    </van-cell-group>

    <div class="submit-button">
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
  dateRange: [],
  title: ''
})

const dateRangeRules = [
  {
    required: true,
    message: '请选择活动时间',
    validator: (value) => value && value.length === 2
  },
  {
    message: '活动时间不能早于当前时间',
    validator: (value) => {
      if (!value || !value.length) return true
      return value[0] >= Date.now()
    }
  },
  {
    message: '活动时长不能少于1小时',
    validator: (value) => {
      if (!value || value.length !== 2) return true
      return (value[1] - value[0]) >= 60 * 60 * 1000
    }
  }
]

const handleSubmit = (values) => {
  console.log('表单提交:', values)
  Toast.success('提交成功')
}
</script>

<style scoped>
.submit-button {
  padding: 16px;
}
</style>
```

## 特性

- 📅 **日期范围**: 支持开始和结束日期的范围选择
- 🎨 **格式化**: 支持自定义日期显示格式
- 🔗 **路由集成**: 与Vue Router集成，支持URL状态管理
- 📱 **全屏体验**: 点击后打开全屏日历选择器
- 🧹 **可清空**: 支持清空已选择的日期范围
- ⚡ **实时更新**: 选择后立即更新表单值
- 🎯 **表单兼容**: 完全兼容van-form的验证和提交机制

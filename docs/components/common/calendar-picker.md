# FaceCalendarPicker

日历选择器组件，支持日期范围选择和时间选择的全屏日历组件。

## 基础用法

```vue
<template>
  <div>
    <van-button @click="showCalendar = true">选择日期时间</van-button>

    <FaceCalendarPicker
      v-model:show="showCalendar"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FaceCalendarPicker } from 'qinglu-vant'

const showCalendar = ref(false)

const handleConfirm = (dateRange) => {
  console.log('选择的日期范围:', dateRange)
  // dateRange: [startDate, endDate]
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model:show | 控制日历显示/隐藏 | Boolean | false |
| closeOnPopstate | 是否在页面回退时关闭 | Boolean | true |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 显示状态变化时触发 | show: Boolean |
| confirm | 确认选择时触发 | dateRange: [Date, Date] |

### Methods

通过ref可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| reset | 重置日历到指定日期 | date: Date \| Date[] |
| scrollToDate | 滚动到指定日期 | date: Date |
| getSelectedDate | 获取当前选中的日期 | - |

## 示例

### 完整示例

```vue
<template>
  <div class="calendar-demo">
    <van-cell-group>
      <van-cell
        title="选择时间范围"
        :value="displayValue"
        is-link
        @click="openCalendar"
      />
    </van-cell-group>

    <FaceCalendarPicker
      ref="calendarRef"
      v-model:show="visible"
      @confirm="handleDateConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FaceCalendarPicker } from 'qinglu-vant'

const visible = ref(false)
const calendarRef = ref(null)
const selectedRange = ref([])

const displayValue = computed(() => {
  if (selectedRange.value.length === 2) {
    const [start, end] = selectedRange.value
    return `${formatDate(start)} 至 ${formatDate(end)}`
  }
  return '请选择'
})

const openCalendar = () => {
  visible.value = true
}

const handleDateConfirm = (dateRange) => {
  selectedRange.value = dateRange
  console.log('选择的时间范围:', dateRange)
}

const formatDate = (date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 重置日历到今天
const resetToToday = () => {
  const today = new Date()
  calendarRef.value?.reset([today, today])
}
</script>
```

### 预设日期范围

```vue
<template>
  <div>
    <van-button @click="openWithPreset">打开预设日期</van-button>

    <FaceCalendarPicker
      ref="presetCalendar"
      v-model:show="showPreset"
      @confirm="handlePresetConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPreset = ref(false)
const presetCalendar = ref(null)

const openWithPreset = () => {
  showPreset.value = true
  // 预设为未来7天
  const today = new Date()
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  presetCalendar.value?.reset([today, nextWeek])
}

const handlePresetConfirm = (dateRange) => {
  console.log('预设日期确认:', dateRange)
}
</script>
```

### 禁用历史回退关闭

```vue
<template>
  <FaceCalendarPicker
    v-model:show="showCalendar"
    :close-on-popstate="false"
    @confirm="handleConfirm"
  />
</template>

<script setup>
import { ref } from 'vue'

const showCalendar = ref(false)

const handleConfirm = (dateRange) => {
  console.log('选择完成:', dateRange)
}
</script>
```

## 特性

- 📅 **日期范围选择**: 支持选择开始和结束日期
- ⏰ **时间选择**: 集成时间选择器，可选择具体时间
- 🎯 **全屏显示**: 右侧滑入的全屏日历界面
- 🔄 **智能重置**: 支持重置到指定日期或日期范围
- 📱 **移动端优化**: 专为移动端设计的交互体验
- 🎨 **自定义样式**: 支持主题色定制
- 🚀 **方法调用**: 提供丰富的实例方法用于程序控制

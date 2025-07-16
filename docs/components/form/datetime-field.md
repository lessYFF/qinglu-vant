# FaceDatetimeField

日期时间字段组件，基于van-datetime-picker实现的日期时间选择器。

## 基础用法

```vue
<template>
  <FaceDatetimeField
    v-model="datetime"
    title="选择日期时间"
    placeholder="请选择日期时间"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceDatetimeField } from 'qinglu-vant'

const datetime = ref(Date.now())
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定值 | String \| Number | - |
| dateType | 日期类型 | String | 'datetime' |
| title | 选择器标题 | String | - |
| formatter | 自定义格式化函数 | Function | - |
| filter | 选项过滤函数 | Function | - |
| minDate | 最小日期 | Date \| Number | - |
| maxDate | 最大日期 | Date \| Number | - |
| callback | 确认回调函数 | Function | - |
| isKCST | 是否为KCST模式 | Boolean | false |
| isEndTime | 是否为结束时间 | Boolean | false |
| placeholder | 占位符文本 | String | - |
| disabled | 是否禁用 | Boolean | false |

#### dateType 可选值

| 值 | 说明 | 格式示例 |
|---|------|----------|
| datetime | 日期时间 | 2024-01-15 14:30 |
| date | 日期 | 2024-01-15 |
| time | 时间 | 14:30 |
| year-month | 年月 | 2024-01 |
| month-day | 月日 | 01-15 |
| datehour | 日期小时 | 2024-01-15 14 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | value: 时间戳或字符串 |
| open | 打开选择器时触发 | - |
| cancel | 取消选择时触发 | - |

## 示例

### 不同日期类型

```vue
<template>
  <van-cell-group>
    <van-cell title="日期时间">
      <template #value>
        <FaceDatetimeField
          v-model="datetimeValue"
          date-type="datetime"
          placeholder="选择日期时间"
        />
      </template>
    </van-cell>

    <van-cell title="仅日期">
      <template #value>
        <FaceDatetimeField
          v-model="dateValue"
          date-type="date"
          placeholder="选择日期"
        />
      </template>
    </van-cell>

    <van-cell title="仅时间">
      <template #value>
        <FaceDatetimeField
          v-model="timeValue"
          date-type="time"
          placeholder="选择时间"
        />
      </template>
    </van-cell>

    <van-cell title="年月">
      <template #value>
        <FaceDatetimeField
          v-model="yearMonthValue"
          date-type="year-month"
          placeholder="选择年月"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const datetimeValue = ref(Date.now())
const dateValue = ref(Date.now())
const timeValue = ref(Date.now())
const yearMonthValue = ref(Date.now())
</script>
```

### 限制日期范围

```vue
<template>
  <van-cell-group>
    <van-cell title="选择生日">
      <template #value>
        <FaceDatetimeField
          v-model="birthday"
          date-type="date"
          :max-date="maxBirthday"
          :min-date="minBirthday"
          placeholder="选择生日"
        />
      </template>
    </van-cell>

    <van-cell title="预约时间">
      <template #value>
        <FaceDatetimeField
          v-model="appointmentTime"
          date-type="datetime"
          :min-date="minAppointment"
          :max-date="maxAppointment"
          placeholder="选择预约时间"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const birthday = ref(null)
const appointmentTime = ref(null)

// 生日限制：1900年到今天
const minBirthday = new Date(1900, 0, 1)
const maxBirthday = new Date()

// 预约时间限制：今天到30天后
const minAppointment = new Date()
const maxAppointment = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
</script>
```

### 自定义格式化

```vue
<template>
  <van-cell-group>
    <van-cell title="自定义格式">
      <template #value>
        <FaceDatetimeField
          v-model="customFormatValue"
          date-type="datetime"
          :formatter="customFormatter"
          placeholder="选择时间"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const customFormatValue = ref(Date.now())

const customFormatter = (type) => {
  switch (type) {
    case 'datetime':
      return 'yyyy年MM月dd日 HH:mm'
    case 'date':
      return 'yyyy年MM月dd日'
    case 'time':
      return 'HH时mm分'
    default:
      return 'yyyy-MM-dd HH:mm'
  }
}
</script>
```

### 选项过滤

```vue
<template>
  <van-cell-group>
    <van-cell title="工作时间">
      <template #value>
        <FaceDatetimeField
          v-model="workTime"
          date-type="datetime"
          :filter="workTimeFilter"
          placeholder="选择工作时间"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const workTime = ref(null)

// 过滤器：只允许工作日的9-18点
const workTimeFilter = (type, options) => {
  if (type === 'hour') {
    return options.filter(option => {
      const hour = parseInt(option.value)
      return hour >= 9 && hour <= 18
    })
  }

  if (type === 'day') {
    return options.filter(option => {
      const date = new Date(option.value)
      const day = date.getDay()
      return day >= 1 && day <= 5 // 周一到周五
    })
  }

  return options
}
</script>
```

### 带回调函数

```vue
<template>
  <van-cell-group>
    <van-cell title="预约时间">
      <template #value>
        <FaceDatetimeField
          v-model="appointmentDateTime"
          date-type="datetime"
          title="选择预约时间"
          :callback="handleAppointmentConfirm"
          placeholder="选择预约时间"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const appointmentDateTime = ref(null)

const handleAppointmentConfirm = (value) => {
  console.log('预约时间确认:', value)

  // 检查是否在营业时间内
  const date = new Date(value)
  const hour = date.getHours()

  if (hour < 9 || hour > 18) {
    Toast.fail('请选择营业时间内的预约时间（9:00-18:00）')
    return false // 阻止确认
  }

  Toast.success('预约时间设置成功')
  return true
}
</script>
```

### 特殊模式

```vue
<template>
  <van-cell-group>
    <van-cell title="KCST取车时间">
      <template #value>
        <FaceDatetimeField
          v-model="kcstPickupTime"
          date-type="datetime"
          :is-k-c-s-t="true"
          placeholder="选择取车时间"
        />
      </template>
    </van-cell>

    <van-cell title="还车时间">
      <template #value>
        <FaceDatetimeField
          v-model="returnTime"
          date-type="datetime"
          :is-end-time="true"
          placeholder="选择还车时间"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const kcstPickupTime = ref(null)
const returnTime = ref(null)
</script>
```

## 特性

- 📅 **多种类型**: 支持日期时间、日期、时间、年月等多种选择类型
- 🎯 **范围限制**: 支持最小/最大日期限制
- 🎨 **自定义格式**: 支持自定义日期时间显示格式
- 🔍 **选项过滤**: 支持自定义选项过滤器
- 📱 **移动端优化**: 基于van-datetime-picker的移动端体验
- ⚡ **回调验证**: 支持确认时的自定义验证逻辑
- 🚀 **特殊模式**: 支持KCST和结束时间等特殊业务模式

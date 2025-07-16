<script setup>
import TypeChecker from '@lihzsky/type-checker'
import { computed, ref, useAttrs, onMounted } from 'vue'
import { FaceCustomFieldValue } from '..'
import { TELEPORT } from '../../constants'
import { Tempo } from '../../utils'

const attrs = useAttrs()
const props = defineProps({
  modelValue: {
    type: [String, Number]
  },
  dateType: {
    type: String,
    default: 'datetime'
  },
  formatter: {
    type: Function
  },
  title: {
    type: String
  },
  filter: {
    type: Function
  },
  minDate: {
    type: [Date, Number]
  },
  maxDate: {
    type: [Date, Number]
  },
  callback: {
    type: Function
  },
  isKCST: {
    type: Boolean
  },
  isEndTime: {
    type: Boolean
  }
  
})
const emits = defineEmits(['open', 'cancel', 'update:modelValue'])
const show = ref(false)
const format = computed(() => {
  if (TypeChecker.isFunction(props.formatter)) {
    const formatValue = props.formatter(props.dateType)

    if (TypeChecker.isString(formatValue) && /[yMdhm]/.test(formatValue)) {
      return formatValue
    }
  }

  switch (props.dateType) {
    case 'datetime':
      return Tempo.PATTERNS.default
    case 'date':
      return Tempo.PATTERNS.date
    case 'time':
      return Tempo.PATTERNS.hourMinute
    case 'year-month':
      return Tempo.PATTERNS.yearMonth
    case 'month-day':
      return Tempo.PATTERNS.monthDay
    case 'datehour':
      return Tempo.PATTERNS.dateHour
    default:
  }

  return Tempo.PATTERNS.default
})
const displayValue = computed(() => {
  if (typeof props.modelValue === 'string') {
    return props.modelValue
  }

  if (typeof props.modelValue === 'number') {
    return Tempo.format(props.modelValue, format.value)
  }

  return ''
})
const formValue = computed(() => {
  if (typeof props.modelValue === 'string' && /\d+/.test(props.modelValue)) {
    return new Date(...props.modelValue.match(/\d+/g).map(item => +item)).getTime()
  }

  if (typeof props.modelValue === 'number') {
    return props.modelValue
  }

  return null
})
const dateValue = computed(() => {
  if (typeof props.modelValue === 'string' && /\d+/.test(props.modelValue)) {
    return new Date(...props.modelValue.match(/\d+/g).map(item => +item))
  }

  if (typeof props.modelValue === 'number') {
    return new Date(props.modelValue)
  }

  return new Date()
})
const minDate = computed(() => {
  if (props.minDate instanceof Date) {
    return props.minDate
  }

  if (TypeChecker.isNumber(props.minDate)) {
    return new Date(props.minDate)
  }
})
const maxDate = computed(() => {
  if (props.maxDate instanceof Date) {
    return props.maxDate
  }

  if (TypeChecker.isNumber(props.maxDate)) {
    return new Date(props.maxDate)
  }
})
const formatter = (type, val) => {
  switch (type) {
    case 'year':
      return `${val}年`
    case 'month':
      return `${val}月`
    case 'day':
      return `${val}日`
    case 'hour':
      return `${val}时`
    case 'minute':
      return `${val}分`
    default:
  }

  return val;
}
const EventHandler = {
  onHandleOpen() {
    emits('open')
    show.value = true
  },
  onHandleConfirm(values) {
    emits('update:modelValue', values.getTime())
    show.value = false
    // 执行回调
    if (props.callback) { props.callback(values) }
  },
  onHandleCancel() {
    emits('cancel')
    show.value = false
  }
}
onMounted(() => {
  if (props.isKCST == true) {
    if (props.isEndTime == true) {
      let newDataValue = new Date().setHours(new Date().getHours() + 24)
      EventHandler.onHandleConfirm(new Date(newDataValue))
    } else {
      EventHandler.onHandleConfirm(dateValue.value)
    }
  }
})
</script>

<template>
  <van-field v-bind="attrs" class="custom-form-field" @click="EventHandler.onHandleOpen" is-link>
    <template #input>
      <face-custom-field-value :value="formValue" :display-value="displayValue"
        :placeholder="attrs.placeholder"></face-custom-field-value>
    </template>
  </van-field>

  <van-popup v-model:show="show" :teleport="TELEPORT" position="bottom" round safe-area-inset-bottom>
    <van-datetime-picker :model-value="dateValue" :title="props.title" :type="props.dateType" :filter="props.filter"
      :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="EventHandler.onHandleConfirm"
      @cancel="EventHandler.onHandleCancel"></van-datetime-picker>
  </van-popup>
</template>

<style lang="less" scoped></style>

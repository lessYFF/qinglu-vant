<script setup>
import { computed, ref, watch } from 'vue'
import { TELEPORT } from '../constants'
import { Tempo } from '../utils'

const props = defineProps({
  show: {
    type: Boolean,
  },
  closeOnPopstate: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits(['update:show', 'confirm'])
const calendar = ref(null)
const calendarValue = ref([])
const startTime = ref('00:00')
const endTime = ref('23:59')
const startDisplayTime = computed(() => {
  if (calendarValue.value[0]) {
    const date = new Date(
      calendarValue.value[0].getFullYear(),
      calendarValue.value[0].getMonth(),
      calendarValue.value[0].getDate(),
      ...startTime.value.split(':'),
      '00'
    )

    return Tempo.format(date)
  }

  return ''
})
const endDisplayTime = computed(() => {
  if (calendarValue.value[1]) {
    const date = new Date(
      calendarValue.value[1].getFullYear(),
      calendarValue.value[1].getMonth(),
      calendarValue.value[1].getDate(),
      ...endTime.value.split(':'),
      '00'
    )

    return Tempo.format(date)
  }

  return ''
})
const EventHandler = {
  onHandleCalendarChange(values) {
    calendarValue.value = values
  },

  onHandleStartTimeChange(value) {
    startTime.value = value
  },

  onHandleEndTimeChange(value) {
    endTime.value = value
  },

  onHandleConfirm() {
    if (calendarValue.value.length === 2) {
      emits('confirm', [Tempo.toDate(startDisplayTime.value), Tempo.toDate(endDisplayTime.value)])
      emits('update:show', false)
    }
  },
}

defineExpose({
  reset(date) {
    calendar.value?.reset(date)
  },

  scrollToDate(date) {
    calendar.value?.scrollToDate(date)
  },

  getSelectedDate() {
    return calendar.value?.getSelectedDate()
  },
})

watch(
  () => props.show,
  () => {
    if (props.show) {
      if (!calendarValue.value.length) {
        calendarValue.value = [new Date(), new Date()]
      } else {
        calendar.value.reset(calendarValue.value)
      }
    }
  }
)
</script>

<template>
  <van-calendar
    ref="calendar"
    :show="props.show"
    type="range"
    color="var(--face-blue-dark)"
    :round="false"
    position="right"
    :teleport="TELEPORT"
    :min-date="new Date('2022-01-01')"
    @update:show="value => emits('update:show', value)"
    @select="EventHandler.onHandleCalendarChange"
    :allow-same-day="true"
    :close-on-popstate="props.closeOnPopstate"
  >
    <template #footer>
      <van-grid :column-num="2" :border="false" class="border-top-base">
        <van-grid-item>
          <van-datetime-picker
            v-model="startTime"
            type="time"
            style="width: 100%"
            :visible-item-count="3"
            @change="EventHandler.onHandleStartTimeChange"
          >
            <template #toolbar>
              <header class="flex-auto font-md font-bold text-center">开始时间</header>
            </template>
          </van-datetime-picker>
        </van-grid-item>
        <van-grid-item>
          <van-datetime-picker
            v-model="endTime"
            type="time"
            style="width: 100%"
            :visible-item-count="3"
            @change="EventHandler.onHandleEndTimeChange"
          >
            <template #toolbar>
              <header class="flex-auto font-md font-bold text-center">结束时间</header>
            </template>
          </van-datetime-picker>
        </van-grid-item>
      </van-grid>
      <footer class="flex-row items-center py-md bg-pure">
        <div class="flex-auto mr-sm font-md color-base">
          <div>开始：{{ startDisplayTime || '-' }}</div>
          <div>结束：{{ endDisplayTime || '-' }}</div>
        </div>
        <van-button
          type="primary"
          size="small"
          style="min-width: 2.4rem"
          :disabled="calendarValue.length !== 2"
          @click="EventHandler.onHandleConfirm"
          >确定</van-button
        >
      </footer>
    </template>
  </van-calendar>
</template>

<style lang="less" scoped></style>

<script setup>
import moment from "moment"
import { watch, ref, computed } from "vue"

const props = defineProps({
  show: Boolean,
  modelValue: {
    type: Object
  }
})

const emits = defineEmits(["cancel", "confirm"])

const activeKey = ref(0)
const startTime = ref(new Date())
const endTime = ref(new Date())

const onConfirm = () => {
  emits("confirm", {
    startTime: moment(startTime.value).startOf("day").valueOf(),
    endTime: moment(endTime.value).endOf("day").valueOf()
  })
}

const needUpdate = computed(() => props.show)

watch(needUpdate, () => {
  if (props.show) {
    startTime.value = new Date(props.modelValue.startTime)
    endTime.value = new Date(props.modelValue.endTime)
    activeKey.value = 0
  }
})
</script>

<template>
  <van-popup
    class="popup-container"
    v-model:show="props.show"
    position="bottom"
    safe-area-inset-bottom
  >
    <header class="popup-header flex justify-space-between">
      <span class="font-md color-gray-6" @click="emits('cancel')">取消</span>
      <div class="popup-title-tab">
        <van-tabs v-model:active="activeKey">
          <van-tab title="开始时间" />
          <van-tab title="结束时间" />
        </van-tabs>
      </div>
      <span class="font-md color-link" @click="onConfirm">确认</span>
    </header>
    <van-datetime-picker
      v-if="activeKey === 0"
      v-model="startTime"
      type="date"
      :show-toolbar="false"
    />
    <van-datetime-picker
      v-else
      v-model="endTime"
      type="date"
      :show-toolbar="false"
    />
  </van-popup>
</template>

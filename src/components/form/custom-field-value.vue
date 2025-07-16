<script setup>
import { useCustomFieldValue } from '@vant/use';

const props = defineProps({
  value: {},
  displayValue: {
    type: [String, Number]
  },
  placeholder: {
    type: String
  },
  clearable: {
    type: Boolean,
    default: false
  },
  ellipsis: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['clear'])

useCustomFieldValue(() => props.value)
</script>

<template>
  <div v-if="props.displayValue" class="flex-auto flex-row font-md color-base">
    <div class="mr-base flex-auto" :class="{ 'van-ellipsis': props.ellipsis }">
      <slot>{{ props.displayValue }}</slot>
    </div>
    <van-icon v-if="props.clearable" name="clear" class="font-md color-light" @click.stop="emits('clear')"></van-icon>
  </div>
  <div v-else class="overflow-hidden font-md color-gray-5">{{ props.placeholder }}</div>
</template>

<style lang="less" scoped>

</style>
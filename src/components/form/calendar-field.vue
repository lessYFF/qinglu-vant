<!--
 * @Author: duhuo
 * @Date: 2022-11-21 10:28:07
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-27 18:45:25
 * @Description: Do not edit
-->
<script setup>
import TypeChecker from '@lihzsky/type-checker';
import { computed, ref, useAttrs, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { FaceCalendarPicker, FaceCustomFieldValue } from '..';
import { Tempo } from '../../utils';

// 获取路由对象
const router = useRouter();
const route = useRoute();

const attrs = useAttrs()
const props = defineProps({
  modelValue: {
    type: Array
  },
  format: {
    type: String,
    default: Tempo.PATTERNS.default
  }
})
const emits = defineEmits(['update:modelValue'])
const calendar = ref(null)
const show = ref(false)
const displayValue = computed(() => {
  return props.modelValue
    ?.map((item) => {
      if (typeof item === 'string') {
        return item;
      }

      if (typeof item === 'number') {
        return Tempo.format(item, props.format);
      }

      return '';
    })
    ?.filter(item => !TypeChecker.isVoid(item))
    ?.join('~') ?? '';
})
const formValue = computed(() => {
  if (TypeChecker.isArray(props.modelValue)) {
    return props.modelValue.map((item) => {
      if (typeof item === 'string') {
        return new Date(...item.match(/\d+/g).map(t => +t)).getTime();
      }

      if (typeof item === 'number') {
        return item;
      }
    });
  }

  return null;
})
const EventHandler = {
  onHandleOpen() {
    router.push({ path: route.path, query: { picking: 1 } })
    show.value = true;
  },
  onHandleConfirm(values) {
    const s = Tempo.toTimestamp(values[0]);
    const e = Tempo.toTimestamp(values[1]);
    emits('update:modelValue', [s, e]);
    show.value = false;
  },
  onHandleClose() {
    const picking = route.query.picking === '1'
    if (picking) router.back()
    show.value = false;
  },

  onHandleClear() {
    emits('update:modelValue', [])
    calendar.value?.reset()
  },
}

watch(() => props.modelValue, () => {
  if (TypeChecker.isArray(props.modelValue) && !props.modelValue.length) {
    calendar.value?.reset()
  }
})
</script>

<template>
  <van-field v-bind="attrs" class="custom-form-field" is-link @click="EventHandler.onHandleOpen">
    <template #input>
      <face-custom-field-value
        :value="formValue"
        :display-value="displayValue"
        :placeholder="attrs.placeholder"
        clearable
        @clear="EventHandler.onHandleClear"
      ></face-custom-field-value>
    </template>
  </van-field>

  <face-calendar-picker
    ref="calendar"
    v-model:show="show"
    @confirm="EventHandler.onHandleConfirm"
    @close="EventHandler.onHandleClose"
  ></face-calendar-picker>
</template>

<style lang="less" scoped>

</style>

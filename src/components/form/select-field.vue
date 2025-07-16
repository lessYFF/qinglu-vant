<!--
 * @Author: duhuo
 * @Date: 2022-11-06 13:26:38
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-06 16:29:44
 * @Description: Do not edit
-->
<script setup>
import { computed, ref, useAttrs, onMounted } from "vue";
import { FaceCustomFieldValue } from "..";
import { TELEPORT } from '../../constants';

function parseModelValueItem(value, property) {
  if (typeof value === "string") {
    const column = props.columns.find((item) => item.value === value)

    if (column) {
      return column[property]
    }

    return value;
  } else if (value !== null && typeof value === "object") {
    return value[property];
  }

  return null;
}

const attrs = useAttrs();
const props = defineProps({
  modelValue: {
    type: [Array, Object, String],
  },
  title: {
    type: String,
  },
  separator: {
    type: String,
    default: " "
  },
  columns: {
    type: Array,
  },
  callback: {
    type: Function
  },
  isKCST: {
    type: Boolean
  },
  isRenewal: {
    type: Boolean
  }
});
const emits = defineEmits(["update:modelValue", "show", "change"]);
const show = ref(false);
const displayValue = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue
      .map((item) => parseModelValueItem(item, "text"))
      .join(props.separator);
  }

  return parseModelValueItem(props.modelValue, "text");
});
const formValue = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.map((item) => parseModelValueItem(item, "value"));
  }

  return parseModelValueItem(props.modelValue, "value");
});
const EventHandler = {
  onHandleOpen() {
    if (attrs.disabled) return
    if (props.columns.length > 0) {
      show.value = true;
    }
    emits("show");
  },
  onHandleConfirm(values) {
    console.log(values)
    emits("update:modelValue", values);
    emits("change", values);
    show.value = false;
    // 执行回调
    if (props.callback) { props.callback(values) }
  },

  onHandleCancel() {
    show.value = false;
  },
};
onMounted(() => {
  if (props.isKCST == true) {
    EventHandler.onHandleConfirm({
      rawData: { name: '到店取车', value: 1, key: null },
      text: "到店取车",
      value: "1"
    })
  }

  if (props.isRenewal == true) {
    EventHandler.onHandleConfirm({
      rawData: { name: '无优惠', value: 0, key: null },
      text: "无优惠",
      value: "0"
    })
  }
})
</script>

<template>
  <van-field v-bind="attrs" class="custom-form-field" readonly is-link @click="EventHandler.onHandleOpen">
    <template #input>
      <face-custom-field-value :value="formValue" :display-value="displayValue"
        :placeholder="attrs.placeholder"></face-custom-field-value>
    </template>
  </van-field>

  <van-popup v-model:show="show" :teleport="TELEPORT" position="bottom" round safe-area-inset-bottom>
    <van-picker :title="props.title" :columns="props.columns" @confirm="EventHandler.onHandleConfirm"
      @cancel="EventHandler.onHandleCancel" :default-index="attrs.defaultIndex"></van-picker>
  </van-popup>
</template>

<style lang="less" scoped></style>
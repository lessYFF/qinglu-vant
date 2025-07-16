<!--
 * @Author: duhuo
 * @Date: 2022-11-06 13:26:38
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-06 16:29:44
 * @Description: Do not edit
-->
<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  columns: {
    type: Array,
  },
  iconSize: {
    type: String
  },
  justify: {
    type: String,
    default: 'flex-start'
  }
});
const emits = defineEmits(["update:modelValue", "change"]);
const EventHandler = {
  onHandleConfirm(name) {
    emits("update:modelValue", name);
    emits("change", name);
  },
};
</script>

<template>
  <van-field v-bind="attrs" class="custom-form-field">
    <template #input>
      <div class="field-custom-container flex-row items-center" :style="{ 'justify-content': props.justify }">
        <van-radio-group
          :model-value="props.modelValue"
          direction="horizontal"
          :icon-size="props.iconSize"
          :disabled="attrs.readonly || attrs.disabled"
          @update:model-value="EventHandler.onHandleConfirm"
        >
          <van-radio v-for="item in props.columns" :key="item.value" :name="item.value">{{ item.text }}</van-radio>
        </van-radio-group>
      </div>
    </template>
  </van-field>
</template>

<style lang="less" scoped>
.field-custom-container {
  width: 100%;
}
</style>
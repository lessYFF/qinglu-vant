<!--
 * @Author: duhuo
 * @Date: 2022-11-06 13:26:38
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-06 16:29:44
 * @Description: Do not edit
-->
<script setup>
import { computed, ref, useAttrs } from "vue";
import { FaceCustomFieldValue } from "..";
import { TELEPORT } from '../../constants';

const attrs = useAttrs();
const props = defineProps({
  modelValue: {
    type: Object,
  },
  title: {
    type: String,
  },
  actions: {
    type: Array,
  },
});
const emits = defineEmits(["update:modelValue", "show", "change"]);
const show = ref(false);
const displayValue = computed(() => props.modelValue?.text ?? '');
const formValue = computed(() => props.modelValue?.value ?? null);
const EventHandler = {
  onHandleOpen() {
    if (props.actions.length > 0) {
      show.value = true;
    }
    emits("show");
  },
  onHandleConfirm(action) {
    const values = {
      text: action.name,
      value: action.value || action.name
    }

    emits("update:modelValue", values);
    emits("change", values);
  },

  onHandleCancel() {
    show.value = false;
  },
};
</script>

<template>
  <van-field v-bind="attrs" class="custom-form-field" is-link @click="EventHandler.onHandleOpen">
    <template #input>
      <face-custom-field-value
        :value="formValue"
        :display-value="displayValue"
        :placeholder="attrs.placeholder"
      ></face-custom-field-value>
    </template>
  </van-field>

  <van-action-sheet
    v-model:show="show"
    :title="props.title"
    :actions="props.actions"
    :teleport="TELEPORT"
    close-on-click-action
    closeable
    @select="EventHandler.onHandleConfirm"
  ></van-action-sheet>
</template>

<style lang="less" scoped>
</style>
<script setup>
import { computed } from "vue"

const props = defineProps({
  value: {
    type: [Number, String]
  },
  options: {
    type: Array
  },
  fieldNames: {
    type: Object
  }
})

const valueKey = computed(() => props?.fieldNames?.value || "value")
const labelKey = computed(() => props?.fieldNames?.label || "label")

const emits = defineEmits(["change"])

</script>

<template>
  <van-grid v-if="props?.options?.length > 0" :border="false" :column-num="2" :gutter="8" class="selector">
    <van-grid-item v-for="item in props.options" :key="item[valueKey]">
      <div
        :class="{'selector-item-selected':props.value === item[valueKey]}"
        class="border-base radius-md px-md py-xs text-center selector-item"
        @click="() => emits('change', item[valueKey])"
      >
        {{ item[labelKey] }}
        <div v-if="props.value === item[valueKey]" class="selector-check-wrapper">
          <van-icon class="selector-selected-icon" color="#ffffff" name="success"/>
        </div>
      </div>
    </van-grid-item>
  </van-grid>
</template>


<style lang="less" scoped>
.selector {
  width: 100%;

  // 穿透van-grid-item的默认样式
  :deep(.van-grid-item) {
    padding: 0;

    .van-grid-item__content {
      padding: 0;
      background: transparent;
      width: 100%;
      height: 100%;
    }

    .van-grid-item__icon {
      display: none;
    }
  }
}

.selector-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100% !important;
  height: 50px;
  padding: 0 16px;
  border: 1px solid #ebedf0 !important;
  border-radius: 8px !important;
  background: #fff !important;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  font-size: 14px;
  color: #323233;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;

  &:hover {
    border-color: #c8c9cc !important;
  }
}

.selector-item-selected {
  border-color: #1989fa !important;
  background: #f0f9ff !important;
  color: #1989fa !important;
  font-weight: 500;
}

.selector-check-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 24px 30px;
  border-color: transparent transparent #1989fa transparent;
  border-bottom-right-radius: 8px;
}

.selector-selected-icon {
  position: absolute;
  right: 2px;
  bottom: -24px;
  font-size: 14px;
  z-index: 1;
}
</style>
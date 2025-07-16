<script setup>
import { computed, useAttrs } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  step: {
    type: Number,
    default: 5
  },
  max: {
    type: Number,
    default: 20
  }
});
const emits = defineEmits(['update:modelValue'])
const points = computed(() => {
  const p = []

  for (let i = 0; i <= props.max; i += props.step) {
    p.push(i)
  }

  return p
})
const attrs = useAttrs();
</script>

<template>
  <van-field v-bind="attrs" class="custom-form-field">
    <template #input>
      <div class="slider-container flex-auto pl-xs mr-xs">
        <div class="slider-ruler">
          <div v-for="p in points" :style="{ left: (p / props.max * 100) + '%' }" :key="p"
            :class="{ 'slider-active': p <= props.modelValue }" class="slider-calibration">
            <div class="slider-calibration-num font-xs color-light nowrap">{{ p }}</div>
          </div>
        </div>
        <van-slider button-size="14px" bar-height="4px" class="slider-line" :model-value="props.modelValue"
          :min="props.min" :max="props.max"
          @update:model-value="(value) => emits('update:modelValue', value)"></van-slider>

        <div v-if="String(props.max /10).indexOf('.')>-1"
          style="position: absolute; top: -10px; right: -16px; color: #999999; font-size: 12px;">{{ props.max }}</div>
      </div>
      <div v-if="props.max == ''" class="slide-description nowrap">{{ props.modelValue }}({{ 0 + "%" }})</div>
      <div v-else class="slide-description nowrap">
        {{ props.modelValue }}({{ Math.floor((props.modelValue / (props.max - props.min)) * 100) + "%" }})
      </div>
    </template>
  </van-field>
</template>

<style lang="less" scoped>
.slider-container,
.slide-description {
  margin-bottom: 20px;
}

.slider-container {
  position: relative;
}

.slider-line {
  z-index: 4;
}

.slider-ruler {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}

.slider-calibration {
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: var(--van-slider-inactive-background-color);
  border-radius: var(--van-slider-button-border-radius);
  border: 2px solid var(--face-background-color-primary-light);

  &.slider-active {
    background: var(--van-slider-active-background-color);
  }

  &:first-child {
    transform: translate(25%, -50%);
  }

  &:last-child {
    transform: translate(-25%, -50%);
  }
}

.slider-calibration-num {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
}

.slide-description {
  min-width: 65px;
  margin-left: 5px;
  text-align: right;
}
</style>

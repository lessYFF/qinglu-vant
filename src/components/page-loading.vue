<script setup>
import { computed } from 'vue';
import { usePageLoading } from '../use';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String
  },
  fullScreen: {
    type: Boolean,
    default: false
  }
})
const { loading: globalLoading } = usePageLoading()
const loading = computed(() => {
  if (props.fullScreen) {
    return globalLoading.value
  }

  return props.loading
})
const text = computed(() => {
  return props.text || '加载中...'
})
</script>

<template>
  <div :class="{ relative: !props.fullScreen }">
    <div v-show="loading" class="box-loading-container" :class="{ 'page-loading-container': props.fullScreen }">
      <div class="box-loading-icon-container">
        <div class="box-loading-icon"></div>
        <div class="loading-text">{{ text }}</div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
@keyframes satellite {
  from {
    transform: rotate(0) translateZ(0);
  }

  to {
    transform: rotate(360deg) translateZ(0);
  }
}

.box-loading-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  min-width: 100px;
  // min-height: 200px;
  background: rgba(255, 255, 255, 0.7);

  .box-loading-icon-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
  }

  .loading-text {
    margin-top: 16px;
    font-size: 16px;
    color: #4286F3;
    text-align: center;
    font-weight: 500;
  }

  .box-loading-icon {
    position: relative;
    width: 48px;
    height: 48px;
    margin: 0 auto;
    animation: satellite 3s infinite linear;
    border: 1px solid #4286F3;
    border-radius: 100%;

    &::before, &::after {
      position: absolute;
      left: 1px;
      top: 1px;
      width: 12px;
      height: 12px;
      content: "";
      border-radius: 100%;
      background-color: #4286F3;
      box-shadow: 0 0 10px #4286F3;
    }

    &::after {
      right: 0;
      width: 20px;
      height: 20px;
      margin: 13px;
    }
  }
}

.page-loading-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  width: 100vw;
  height: 100vh;
}
</style>
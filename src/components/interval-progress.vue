<template>
  <div class="interval-Progress">
    <div class="progress">
      <div class="boxGreyblock">
        <div class="greyblock" v-for="(index, i) in 10" :key="i"></div>
        <div
          class="greyblock2"
          :style="{
            width: greyblock2Width + '%',
            background: props.isOilElectricity == 0 ? '#FF9900' : '#03B915'
          }"
        ></div>
        <div class="greyblock3">
          <div v-for="(index, i) in 9" :key="i"></div>
        </div>
      </div>
      <div style="margin-left: 0.16rem;">
        {{ props.isOilElectricity == 0 ? props.OilLiter : props.OilElectricity }}
        {{props.isOilElectricity == 0 ? 'L':'%'}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed, defineComponent, onUpdated, nextTick } from "vue"

const props = defineProps({
  OilElectricity: {
    type: Number,
  },
  isOilElectricity: {
    type: Number,
  },
  OilLiter: {
    type: Number,
  }
})
const amount = ref(0)
const success = ref(0)
const failed = ref(20)
const greyblock2Width = ref(0)

// 启动进度条动画的函数
const startProgressAnimation = () => {
  // 强制重置进度条宽度为0
  greyblock2Width.value = 0

  // 使用nextTick确保DOM更新后再开始动画
  nextTick(() => {
    // 稍微延迟一下确保重置生效
    setTimeout(() => {
      greyblock2Width.value = props.OilElectricity
    }, 150)
  })
}

// 重置组件状态的函数
const resetProgress = () => {
  greyblock2Width.value = 0
}

// 监听props变化，每次都重新开始动画
watch(() => props.OilElectricity, (newValue, oldValue) => {
  if (newValue !== undefined && newValue !== null) {
    // 如果是新的值或者从0变化，重新开始动画
    if (oldValue !== newValue) {
      resetProgress()
      nextTick(() => {
        startProgressAnimation()
      })
    }
  }
}, { immediate: true })

// 组件挂载时启动动画
onMounted(() => {
  resetProgress()
  nextTick(() => {
    startProgressAnimation()
  })
})

// 组件更新时检查是否需要重新启动动画
onUpdated(() => {
  // 如果props有值但进度条宽度不匹配，重新启动动画
  if (props.OilElectricity > 0 && greyblock2Width.value !== props.OilElectricity) {
    resetProgress()
    nextTick(() => {
      startProgressAnimation()
    })
  }
})

// 暴露重置方法给父组件使用
defineExpose({
  resetProgress,
  startProgressAnimation
})
</script>

<style lang="less" scoped>
.interval-Progress {}

.progress {
  width: auto;
  height: 18px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}

.greenblock {
  width: 4px;
  height: 18px;
  margin-left: 2px;
  float: left;
}

.boxGreyblock {
  position: relative;
  .greyblock:nth-child(1){
    margin-left: 0px;
  }
  .greyblock {
    width: 4px;
    height: 18px;
    margin-left: 2px;
    float: left;
    background-color: gainsboro;
  }
 

  .greyblock2 {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 18px;
    z-index: 2;
    transition: all 1s;
  }
  .greyblock3 {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    >div{
      width: 2px;
      height: 18px;
      margin-left: 4px;
      float: left;
      background-color: #fff;
    }
  }
}
</style>
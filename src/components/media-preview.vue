<script setup>
import { ref, computed, useAttrs, onMounted, onUpdated, onUnmounted } from 'vue'
import { Media } from '../utils'

const attrs = useAttrs()
const props = defineProps({
  show: {
    type: Boolean,
  },
  medias: {
    type: Array,
  },
  source: {
    type: String,
  },
})

const emits = defineEmits(['update:show'])
const medias = computed(() => {
  if (!props.medias || !Array.isArray(props.medias)) {
    return []
  }
  return props.medias.map(item => item.split('?')[0])
})

onUpdated(() => {
  console.log(props.medias, '008')
})
</script>

<template>
  <div v-if="props.source == 'pickupReturnRecord'">
    <van-image-preview
      v-bind="attrs"
      :show="props.show"
      :images="medias"
      @update:show="value => emits('update:show', value)"
    >
      <template #image="{ src }">
        <div v-if="Media.getMediaDefinition(src) === 'video'" @touchstart.stop.capture="() => {}">
          <video :src="src" class="media-full-screen" controls autoplay />
        </div>
        <div v-else>
          <van-image :src="src"></van-image>
        </div>
      </template>
    </van-image-preview>
  </div>
  <div v-else>
    <div v-for="(item, index) in props.medias" :key="index">
      <div v-if="Media.getMediaDefinition(item) === 'video'">
        <van-image-preview
          v-bind="attrs"
          v-model:show="props.show"
          :images="medias"
          @update:show="value => emits('update:show', value)"
        >
          <template #image="{ src }">
            <div @touchstart.stop.capture="() => {}">
              <video :src="src" class="media-full-screen" controls autoplay />
            </div>
          </template>
        </van-image-preview>
      </div>
      <div v-else>
        <van-image-preview
          v-bind="attrs"
          v-model:show="props.show"
          :images="medias"
          @update:show="value => emits('update:show', value)"
        >
        </van-image-preview>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.media-preview-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  width: 100%;
}

.media-full-screen {
  width: 100%;
  height: 211px;
}
</style>

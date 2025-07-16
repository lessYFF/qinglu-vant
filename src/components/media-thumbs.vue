<script setup>
import { computed, ref, useAttrs } from 'vue'
import { FaceMediaPreview } from '.'
import { Media } from '../utils'

const attrs = useAttrs()
const props = defineProps({
  thumbs: {
    type: Array,
  },
  columnNum: {
    type: Number,
    default: 4,
  },
  width: {
    type: [String, Number],
    default: '1.9rem',
  },
  height: {
    type: [String, Number],
    default: '1.9rem',
  },
})
const show = ref(false)
const startPosition = ref(0)
const thumbs = computed(() => props.thumbs.map(src => Media.generateMediaThumbPath(src, { width: 80, height: 80 })))
const EventHandler = {
  onHandlePreview(index) {
    startPosition.value = index
    show.value = true
  },
  onPreviewUpdateShow(_show) {
    console.log(_show)
    show.value = _show
  },
}
</script>

<template>
  <van-grid :column-num="props.columnNum" :border="false" class="media-thumbs">
    <van-grid-item v-for="(item, index) in thumbs" :key="item">
      <van-image
        v-bind="attrs"
        :src="item"
        :width="props.width"
        :height="props.height"
        @click="() => EventHandler.onHandlePreview(index)"
      ></van-image>
    </van-grid-item>
  </van-grid>

  <face-media-preview :show="show" :start-position="startPosition" :medias="props.thumbs" :loop="false"
    @update:show="EventHandler.onPreviewUpdateShow" ></face-media-preview>
  
</template>

<style lang="less" scoped>
.media-thumbs {
  :deep(.van-grid-item__content) {
    margin: 0 var(--van-padding-xs) var(--van-padding-xs) 0;
    padding: 0;
  }
}
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

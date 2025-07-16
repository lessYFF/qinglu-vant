# FaceMediaPreview

媒体预览组件，支持图片和视频的全屏预览功能。

## 基础用法

```vue
<template>
  <div>
    <van-button @click="showPreview = true">预览媒体</van-button>

    <FaceMediaPreview
      v-model:show="showPreview"
      :medias="mediaList"
      source="normal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FaceMediaPreview } from 'qinglu-vant'

const showPreview = ref(false)
const mediaList = ref([
  'https://example.com/image1.jpg',
  'https://example.com/video1.mp4',
  'https://example.com/image2.png'
])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model:show | 控制预览显示/隐藏 | Boolean | false |
| medias | 媒体文件列表 | Array | [] |
| source | 媒体来源类型 | String | - |

#### source 可选值

- `'pickupReturnRecord'`: 取还车记录模式
- 其他值或不传: 普通预览模式

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 预览状态变化时触发 | show: Boolean |

## 示例

### 图片预览

```vue
<template>
  <div class="image-gallery">
    <van-grid :column-num="3" :gutter="8">
      <van-grid-item
        v-for="(image, index) in imageList"
        :key="index"
        @click="previewImage(index)"
      >
        <van-image
          :src="image"
          fit="cover"
          width="100px"
          height="100px"
        />
      </van-grid-item>
    </van-grid>

    <FaceMediaPreview
      v-model:show="showImagePreview"
      :medias="imageList"
      :start-position="currentIndex"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showImagePreview = ref(false)
const currentIndex = ref(0)
const imageList = ref([
  'https://example.com/photo1.jpg',
  'https://example.com/photo2.jpg',
  'https://example.com/photo3.jpg',
  'https://example.com/photo4.jpg'
])

const previewImage = (index) => {
  currentIndex.value = index
  showImagePreview.value = true
}
</script>
```

### 混合媒体预览

```vue
<template>
  <div class="media-gallery">
    <div
      v-for="(media, index) in mixedMediaList"
      :key="index"
      class="media-item"
      @click="previewMedia(index)"
    >
      <van-image
        v-if="isImage(media)"
        :src="media"
        fit="cover"
        width="120px"
        height="120px"
      />
      <div v-else class="video-thumbnail">
        <video :src="media" width="120" height="120" />
        <van-icon name="play-circle-o" class="play-icon" />
      </div>
    </div>

    <FaceMediaPreview
      v-model:show="showMixedPreview"
      :medias="mixedMediaList"
      :start-position="currentMediaIndex"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showMixedPreview = ref(false)
const currentMediaIndex = ref(0)
const mixedMediaList = ref([
  'https://example.com/image1.jpg',
  'https://example.com/video1.mp4',
  'https://example.com/image2.png',
  'https://example.com/video2.mp4'
])

const isImage = (url) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
}

const previewMedia = (index) => {
  currentMediaIndex.value = index
  showMixedPreview.value = true
}
</script>

<style scoped>
.media-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 16px;
}

.media-item {
  position: relative;
  cursor: pointer;
}

.video-thumbnail {
  position: relative;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
```

### 取还车记录预览

```vue
<template>
  <div class="pickup-return-record">
    <van-cell-group>
      <van-cell
        title="查看取车记录"
        is-link
        @click="showPickupRecord"
      />
      <van-cell
        title="查看还车记录"
        is-link
        @click="showReturnRecord"
      />
    </van-cell-group>

    <FaceMediaPreview
      v-model:show="showRecordPreview"
      :medias="recordMedias"
      source="pickupReturnRecord"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showRecordPreview = ref(false)
const recordMedias = ref([])

const pickupRecordMedias = [
  'https://example.com/pickup-photo1.jpg',
  'https://example.com/pickup-video1.mp4',
  'https://example.com/pickup-photo2.jpg'
]

const returnRecordMedias = [
  'https://example.com/return-photo1.jpg',
  'https://example.com/return-video1.mp4',
  'https://example.com/return-photo2.jpg'
]

const showPickupRecord = () => {
  recordMedias.value = pickupRecordMedias
  showRecordPreview.value = true
}

const showReturnRecord = () => {
  recordMedias.value = returnRecordMedias
  showRecordPreview.value = true
}
</script>
```

### 自定义预览配置

```vue
<template>
  <FaceMediaPreview
    v-model:show="showCustomPreview"
    :medias="customMedias"
    :start-position="0"
    :show-index="true"
    :closeable="true"
    @update:show="handlePreviewClose"
  />
</template>

<script setup>
import { ref } from 'vue'

const showCustomPreview = ref(false)
const customMedias = ref([
  'https://example.com/custom1.jpg',
  'https://example.com/custom2.mp4',
  'https://example.com/custom3.png'
])

const handlePreviewClose = (show) => {
  if (!show) {
    console.log('预览已关闭')
  }
}
</script>
```

## 特性

- 🖼️ **图片预览**: 支持多种图片格式的全屏预览
- 🎬 **视频播放**: 支持视频文件的全屏播放，带播放控制
- 🔄 **混合媒体**: 智能识别图片和视频，提供不同的预览方式
- 📱 **移动端优化**: 支持手势操作，缩放、滑动切换
- 🎯 **多种模式**: 支持普通预览和取还车记录专用预览模式
- ⚡ **性能优化**: 自动处理媒体URL参数，优化加载性能

# FaceMediaThumbs

媒体缩略图组件，用于展示媒体文件的缩略图网格，支持点击预览。

## 基础用法

```vue
<template>
  <FaceMediaThumbs
    :thumbs="mediaList"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceMediaThumbs } from 'qinglu-vant'

const mediaList = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/video1.mp4',
  'https://example.com/image3.png'
])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| thumbs | 媒体文件URL数组 | Array | [] |
| columnNum | 每行显示的列数 | Number | 4 |
| width | 缩略图宽度 | String \| Number | '1.9rem' |
| height | 缩略图高度 | String \| Number | '1.9rem' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击缩略图时触发 | index: 点击的索引 |

## 示例

### 基础缩略图网格

```vue
<template>
  <div class="thumbs-demo">
    <h3>照片集</h3>
    <FaceMediaThumbs
      :thumbs="photoList"
      :column-num="3"
      width="120px"
      height="120px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const photoList = ref([
  'https://example.com/photo1.jpg',
  'https://example.com/photo2.jpg',
  'https://example.com/photo3.jpg',
  'https://example.com/photo4.jpg',
  'https://example.com/photo5.jpg',
  'https://example.com/photo6.jpg'
])
</script>

<style scoped>
.thumbs-demo {
  padding: 16px;
}

.thumbs-demo h3 {
  margin-bottom: 16px;
  color: #323233;
}
</style>
```

### 不同列数布局

```vue
<template>
  <div class="layout-demo">
    <div class="section">
      <h4>2列布局</h4>
      <FaceMediaThumbs
        :thumbs="demoImages"
        :column-num="2"
        width="160px"
        height="160px"
      />
    </div>

    <div class="section">
      <h4>3列布局</h4>
      <FaceMediaThumbs
        :thumbs="demoImages"
        :column-num="3"
        width="100px"
        height="100px"
      />
    </div>

    <div class="section">
      <h4>4列布局（默认）</h4>
      <FaceMediaThumbs
        :thumbs="demoImages"
        :column-num="4"
        width="80px"
        height="80px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const demoImages = ref([
  'https://example.com/demo1.jpg',
  'https://example.com/demo2.jpg',
  'https://example.com/demo3.jpg',
  'https://example.com/demo4.jpg',
  'https://example.com/demo5.jpg',
  'https://example.com/demo6.jpg',
  'https://example.com/demo7.jpg',
  'https://example.com/demo8.jpg'
])
</script>

<style scoped>
.layout-demo {
  padding: 16px;
}

.section {
  margin-bottom: 32px;
}

.section h4 {
  margin-bottom: 12px;
  color: #1989fa;
  font-size: 16px;
}
</style>
```

### 车辆检查照片

```vue
<template>
  <div class="vehicle-inspection">
    <van-cell-group>
      <van-cell title="车辆外观照片" :value="`${exteriorPhotos.length}张`" />
    </van-cell-group>

    <div class="photos-section">
      <FaceMediaThumbs
        :thumbs="exteriorPhotos"
        :column-num="3"
        width="110px"
        height="110px"
      />
    </div>

    <van-cell-group>
      <van-cell title="车辆内饰照片" :value="`${interiorPhotos.length}张`" />
    </van-cell-group>

    <div class="photos-section">
      <FaceMediaThumbs
        :thumbs="interiorPhotos"
        :column-num="3"
        width="110px"
        height="110px"
      />
    </div>

    <van-cell-group>
      <van-cell title="证件照片" :value="`${documentPhotos.length}张`" />
    </van-cell-group>

    <div class="photos-section">
      <FaceMediaThumbs
        :thumbs="documentPhotos"
        :column-num="2"
        width="160px"
        height="120px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const exteriorPhotos = ref([
  'https://example.com/car-front.jpg',
  'https://example.com/car-back.jpg',
  'https://example.com/car-left.jpg',
  'https://example.com/car-right.jpg',
  'https://example.com/car-top.jpg',
  'https://example.com/car-damage1.jpg'
])

const interiorPhotos = ref([
  'https://example.com/interior-dashboard.jpg',
  'https://example.com/interior-seats.jpg',
  'https://example.com/interior-trunk.jpg'
])

const documentPhotos = ref([
  'https://example.com/license-front.jpg',
  'https://example.com/license-back.jpg',
  'https://example.com/registration.jpg'
])
</script>

<style scoped>
.vehicle-inspection {
  background: #f7f8fa;
}

.photos-section {
  padding: 16px;
  background: white;
  margin-bottom: 8px;
}
</style>
```

### 动态加载媒体

```vue
<template>
  <div class="dynamic-media">
    <div class="controls">
      <van-button @click="addPhoto" type="primary" size="small">
        添加照片
      </van-button>
      <van-button @click="addVideo" type="success" size="small">
        添加视频
      </van-button>
      <van-button @click="clearAll" type="danger" size="small">
        清空
      </van-button>
    </div>

    <div class="media-count">
      <van-tag type="primary">共 {{ mediaFiles.length }} 个文件</van-tag>
    </div>

    <FaceMediaThumbs
      :thumbs="mediaFiles"
      :column-num="3"
      width="100px"
      height="100px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const mediaFiles = ref([])

const samplePhotos = [
  'https://example.com/sample1.jpg',
  'https://example.com/sample2.jpg',
  'https://example.com/sample3.jpg',
  'https://example.com/sample4.jpg'
]

const sampleVideos = [
  'https://example.com/video1.mp4',
  'https://example.com/video2.mp4'
]

const addPhoto = () => {
  const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)]
  mediaFiles.value.push(randomPhoto)
  Toast.success('添加照片成功')
}

const addVideo = () => {
  const randomVideo = sampleVideos[Math.floor(Math.random() * sampleVideos.length)]
  mediaFiles.value.push(randomVideo)
  Toast.success('添加视频成功')
}

const clearAll = () => {
  mediaFiles.value = []
  Toast.success('已清空所有文件')
}
</script>

<style scoped>
.dynamic-media {
  padding: 16px;
}

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.media-count {
  margin-bottom: 16px;
}
</style>
```

### 自定义尺寸和样式

```vue
<template>
  <div class="custom-style-demo">
    <div class="section">
      <h4>正方形缩略图</h4>
      <FaceMediaThumbs
        :thumbs="squareImages"
        :column-num="4"
        width="80px"
        height="80px"
        fit="cover"
        radius="8px"
      />
    </div>

    <div class="section">
      <h4>长方形缩略图</h4>
      <FaceMediaThumbs
        :thumbs="rectangleImages"
        :column-num="2"
        width="160px"
        height="120px"
        fit="cover"
        radius="12px"
      />
    </div>

    <div class="section">
      <h4>圆形缩略图</h4>
      <FaceMediaThumbs
        :thumbs="circleImages"
        :column-num="5"
        width="60px"
        height="60px"
        fit="cover"
        round
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const squareImages = ref([
  'https://example.com/square1.jpg',
  'https://example.com/square2.jpg',
  'https://example.com/square3.jpg',
  'https://example.com/square4.jpg'
])

const rectangleImages = ref([
  'https://example.com/rect1.jpg',
  'https://example.com/rect2.jpg',
  'https://example.com/rect3.jpg',
  'https://example.com/rect4.jpg'
])

const circleImages = ref([
  'https://example.com/circle1.jpg',
  'https://example.com/circle2.jpg',
  'https://example.com/circle3.jpg',
  'https://example.com/circle4.jpg',
  'https://example.com/circle5.jpg'
])
</script>

<style scoped>
.custom-style-demo {
  padding: 16px;
}

.section {
  margin-bottom: 32px;
}

.section h4 {
  margin-bottom: 12px;
  color: #1989fa;
  font-size: 16px;
}
</style>
```

### 订单附件展示

```vue
<template>
  <div class="order-attachments">
    <van-cell-group>
      <van-cell title="订单信息">
        <template #value>
          <van-tag type="success">已完成</van-tag>
        </template>
      </van-cell>
      <van-cell title="订单号" value="ORD20240115001" />
    </van-cell-group>

    <div class="attachment-section">
      <h3>取车照片</h3>
      <FaceMediaThumbs
        :thumbs="pickupPhotos"
        :column-num="3"
        width="100px"
        height="100px"
      />
    </div>

    <div class="attachment-section">
      <h3>还车照片</h3>
      <FaceMediaThumbs
        :thumbs="returnPhotos"
        :column-num="3"
        width="100px"
        height="100px"
      />
    </div>

    <div class="attachment-section">
      <h3>签名确认</h3>
      <FaceMediaThumbs
        :thumbs="signaturePhotos"
        :column-num="2"
        width="150px"
        height="100px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pickupPhotos = ref([
  'https://example.com/pickup1.jpg',
  'https://example.com/pickup2.jpg',
  'https://example.com/pickup3.jpg'
])

const returnPhotos = ref([
  'https://example.com/return1.jpg',
  'https://example.com/return2.jpg',
  'https://example.com/return3.jpg',
  'https://example.com/return4.jpg'
])

const signaturePhotos = ref([
  'https://example.com/signature1.jpg',
  'https://example.com/signature2.jpg'
])
</script>

<style scoped>
.order-attachments {
  background: #f7f8fa;
}

.attachment-section {
  margin-top: 16px;
  padding: 16px;
  background: white;
}

.attachment-section h3 {
  margin: 0 0 16px 0;
  color: #323233;
  font-size: 16px;
  font-weight: 600;
}
</style>
```

## 特性

- 🖼️ **网格布局**: 基于van-grid的响应式网格布局
- 🔍 **点击预览**: 点击缩略图自动打开FaceMediaPreview进行全屏预览
- 📐 **自定义尺寸**: 支持自定义缩略图的宽度和高度
- 📱 **列数控制**: 支持自定义每行显示的列数
- ⚡ **自动缩略图**: 自动生成80x80的缩略图，提升加载性能
- 🎨 **样式继承**: 支持van-image的所有样式属性
- 🔄 **动态更新**: 支持动态添加和删除媒体文件

# FaceUploadField

上传字段组件，支持图片、视频上传，OCR识别，图片压缩等功能。

## 基础用法

```vue
<template>
  <FaceUploadField
    v-model="fileList"
    accept="image"
    :max-count="3"
    upload-text="上传图片"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceUploadField } from 'qinglu-vant'

const fileList = ref([])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定的文件列表 | Array \| String | - |
| accept | 接受的文件类型 | String | 'image' |
| maxCount | 最大上传数量 | Number | 1 |
| capture | 调用摄像头类型 | String | - |
| ocrType | OCR识别类型 | String \| Number | - |
| uploadType | 上传类型 | String | 'normal' |
| custom | 是否自定义上传 | Boolean | false |
| imageFit | 图片填充模式 | String | - |
| uploadText | 上传按钮文字 | String | - |
| previewSize | 预览尺寸 | String \| Array | - |
| optimize | 图片压缩配置 | Object \| Boolean | undefined |
| uploadIcon | 上传图标 | String | - |
| isPreparation | 是否为预处理模式 | Boolean | false |
| formatValue | 格式化值 | String | undefined |

#### accept 可选值

- `'image'`: 仅图片
- `'video'`: 仅视频
- `'mix'`: 图片和视频
- 自定义MIME类型字符串

#### ocrType 可选值

- `1`: 身份证正面
- `2`: 身份证反面
- `3`: 驾驶证
- `4`: 行驶证正页
- `5`: 行驶证副页

#### uploadType 可选值

- `'normal'`: 普通上传
- `'card'`: 证件上传

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 文件列表变化时触发 | fileList: Array |
| update | 上传状态更新时触发 | - |
| finished | 上传完成时触发 | - |
| uploadCompleted | 所有文件上传完成时触发 | - |

## 示例

### 图片上传

```vue
<template>
  <FaceUploadField
    v-model="imageList"
    accept="image"
    :max-count="5"
    upload-text="选择图片"
    @finished="handleUploadFinished"
  />
</template>

<script setup>
import { ref } from 'vue'

const imageList = ref([])

const handleUploadFinished = () => {
  console.log('图片上传完成:', imageList.value)
}
</script>
```

### 视频上传

```vue
<template>
  <FaceUploadField
    v-model="videoList"
    accept="video"
    :max-count="2"
    upload-text="选择视频"
    :optimize="false"
  />
</template>

<script setup>
import { ref } from 'vue'

const videoList = ref([])
</script>
```

### 混合上传

```vue
<template>
  <FaceUploadField
    v-model="mixedList"
    accept="mix"
    :max-count="10"
    upload-text="选择文件"
    :preview-size="['100px', '100px']"
  />
</template>

<script setup>
import { ref } from 'vue'

const mixedList = ref([])
</script>
```

### OCR证件识别

```vue
<template>
  <div>
    <FaceUploadField
      v-model="idCardFront"
      accept="image"
      :max-count="1"
      :ocr-type="1"
      upload-text="上传身份证正面"
      @upload-completed="handleOCRResult"
    />

    <FaceUploadField
      v-model="idCardBack"
      accept="image"
      :max-count="1"
      :ocr-type="2"
      upload-text="上传身份证反面"
      @upload-completed="handleOCRResult"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const idCardFront = ref([])
const idCardBack = ref([])

const handleOCRResult = () => {
  console.log('OCR识别完成')
}
</script>
```

### 证件上传模式

```vue
<template>
  <FaceUploadField
    v-model="cardList"
    accept="image"
    upload-type="card"
    :max-count="1"
    upload-text="上传证件"
    :optimize="{ quality: 0.8, maxWidth: 1920 }"
  />
</template>

<script setup>
import { ref } from 'vue'

const cardList = ref([])
</script>
```

### 自定义上传

```vue
<template>
  <FaceUploadField
    v-model="customList"
    :custom="true"
    accept="image"
    :max-count="3"
    upload-text="自定义上传"
    upload-icon="photograph"
  />
</template>

<script setup>
import { ref } from 'vue'

const customList = ref([])
</script>
```

### 图片压缩配置

```vue
<template>
  <FaceUploadField
    v-model="compressedList"
    accept="image"
    :max-count="5"
    :optimize="{
      quality: 0.6,
      maxWidth: 1200,
      maxHeight: 1200,
      convertSize: 1000000
    }"
    upload-text="压缩上传"
  />
</template>

<script setup>
import { ref } from 'vue'

const compressedList = ref([])
</script>
```

## 特性

- 📷 **多媒体支持**: 支持图片、视频、混合文件上传
- 🔍 **OCR识别**: 内置身份证、驾驶证、行驶证OCR识别
- 🗜️ **图片压缩**: 支持图片质量压缩和尺寸压缩
- 👀 **预览功能**: 集成媒体预览组件，支持图片和视频预览
- 📱 **移动端优化**: 支持调用摄像头拍照和相册选择
- 🎨 **自定义样式**: 支持自定义上传按钮样式和图标
- ⚡ **性能优化**: 支持图片压缩减少上传时间和存储空间

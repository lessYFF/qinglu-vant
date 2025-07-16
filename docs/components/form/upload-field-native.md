# FaceUploadFieldNative

原生上传字段组件，专为原生应用环境设计的媒体上传组件，支持图片和视频上传。

## 基础用法

```vue
<template>
  <FaceUploadFieldNative
    v-model="uploadedFiles"
    type="image"
    :max-count="3"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceUploadFieldNative } from 'qinglu-vant'

const uploadedFiles = ref([])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定的文件URL列表 | Array \| String | - |
| type | 上传类型 | String | 'image' |
| maxCount | 最大上传数量 | Number | 1 |
| uploadIcon | 自定义上传图标 | String | - |
| isPreparation | 是否为预处理模式 | Boolean | false |

#### type 可选值

| 值 | 说明 |
|---|------|
| image | 图片上传 |
| video | 视频上传 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 文件变化时触发 | files: 文件URL列表 |
| uploadCompleted | 上传完成时触发 | - |

## 示例

### 图片上传

```vue
<template>
  <div class="native-image-upload">
    <van-cell-group>
      <van-cell title="单张图片上传">
        <template #value>
          <FaceUploadFieldNative
            v-model="singleImage"
            type="image"
            :max-count="1"
            @upload-completed="handleSingleUploadComplete"
          />
        </template>
      </van-cell>

      <van-cell title="多张图片上传">
        <template #value>
          <FaceUploadFieldNative
            v-model="multipleImages"
            type="image"
            :max-count="5"
            @upload-completed="handleMultipleUploadComplete"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const singleImage = ref('')
const multipleImages = ref([])

const handleSingleUploadComplete = () => {
  console.log('单张图片上传完成:', singleImage.value)
}

const handleMultipleUploadComplete = () => {
  console.log('多张图片上传完成:', multipleImages.value)
}
</script>
```

### 视频上传

```vue
<template>
  <div class="native-video-upload">
    <van-cell-group>
      <van-cell title="视频上传">
        <template #value>
          <FaceUploadFieldNative
            v-model="videoFile"
            type="video"
            :max-count="1"
            @upload-completed="handleVideoUploadComplete"
          />
        </template>
      </van-cell>
    </van-cell-group>

    <div class="upload-result" v-if="videoFile">
      <p>已上传视频: {{ videoFile }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const videoFile = ref('')

const handleVideoUploadComplete = () => {
  console.log('视频上传完成:', videoFile.value)
}
</script>

<style scoped>
.upload-result {
  margin-top: 16px;
  padding: 16px;
  background: #f7f8fa;
  border-radius: 8px;
}
</style>
```

### 自定义上传图标

```vue
<template>
  <div class="custom-icon-demo">
    <van-cell-group>
      <van-cell title="自定义图标">
        <template #value>
          <FaceUploadFieldNative
            v-model="customIconFiles"
            type="image"
            :max-count="3"
            upload-icon="/assets/upload-icon.png"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const customIconFiles = ref([])
</script>
```

### 预处理模式

```vue
<template>
  <div class="preparation-demo">
    <van-cell-group>
      <van-cell title="预处理模式">
        <template #right-icon>
          <van-switch v-model="preparationMode" size="24" />
        </template>
      </van-cell>

      <van-cell title="上传图片">
        <template #value>
          <FaceUploadFieldNative
            v-model="preparationFiles"
            type="image"
            :max-count="3"
            :is-preparation="preparationMode"
          />
        </template>
      </van-cell>
    </van-cell-group>

    <div class="mode-description">
      <p v-if="preparationMode">
        <van-tag type="warning">预处理模式</van-tag>
        文件不可删除，仅用于预览
      </p>
      <p v-else>
        <van-tag type="success">正常模式</van-tag>
        文件可以删除和重新上传
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const preparationMode = ref(false)
const preparationFiles = ref([])
</script>

<style scoped>
.preparation-demo {
  padding: 16px;
}

.mode-description {
  margin-top: 16px;
  padding: 16px;
  background: #f7f8fa;
  border-radius: 8px;
}

.mode-description p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}
</style>
```

### 车辆检查拍照

```vue
<template>
  <div class="vehicle-inspection">
    <van-cell-group>
      <van-cell title="车辆外观照片">
        <template #value>
          <FaceUploadFieldNative
            v-model="exteriorPhotos"
            type="image"
            :max-count="6"
            @upload-completed="handleExteriorComplete"
          />
        </template>
      </van-cell>

      <van-cell title="车辆内饰照片">
        <template #value>
          <FaceUploadFieldNative
            v-model="interiorPhotos"
            type="image"
            :max-count="4"
            @upload-completed="handleInteriorComplete"
          />
        </template>
      </van-cell>

      <van-cell title="车辆损伤照片" v-if="hasDamage">
        <template #value>
          <FaceUploadFieldNative
            v-model="damagePhotos"
            type="image"
            :max-count="8"
            @upload-completed="handleDamageComplete"
          />
        </template>
      </van-cell>
    </van-cell-group>

    <div class="inspection-actions">
      <van-checkbox v-model="hasDamage">车辆有损伤</van-checkbox>

      <van-button
        type="primary"
        block
        :disabled="!isComplete"
        @click="submitInspection"
      >
        提交检查结果
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Toast } from 'vant'

const exteriorPhotos = ref([])
const interiorPhotos = ref([])
const damagePhotos = ref([])
const hasDamage = ref(false)

const isComplete = computed(() => {
  if (exteriorPhotos.value.length === 0) return false
  if (interiorPhotos.value.length === 0) return false
  if (hasDamage.value && damagePhotos.value.length === 0) return false
  return true
})

const handleExteriorComplete = () => {
  console.log('外观照片上传完成')
}

const handleInteriorComplete = () => {
  console.log('内饰照片上传完成')
}

const handleDamageComplete = () => {
  console.log('损伤照片上传完成')
}

const submitInspection = () => {
  Toast.success('检查结果提交成功')
}
</script>

<style scoped>
.vehicle-inspection {
  padding: 16px;
}

.inspection-actions {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### 表单集成

```vue
<template>
  <van-form @submit="onSubmit">
    <van-cell-group>
      <van-field
        v-model="formData.title"
        label="标题"
        placeholder="请输入标题"
        :rules="[{ required: true, message: '请填写标题' }]"
      />

      <van-cell title="封面图片">
        <template #value>
          <FaceUploadFieldNative
            v-model="formData.cover"
            type="image"
            :max-count="1"
            :rules="[{ required: true, message: '请上传封面图片' }]"
          />
        </template>
      </van-cell>

      <van-cell title="详情图片">
        <template #value>
          <FaceUploadFieldNative
            v-model="formData.images"
            type="image"
            :max-count="9"
          />
        </template>
      </van-cell>

      <van-cell title="视频介绍">
        <template #value>
          <FaceUploadFieldNative
            v-model="formData.video"
            type="video"
            :max-count="1"
          />
        </template>
      </van-cell>
    </van-cell-group>

    <div class="submit-area">
      <van-button type="primary" native-type="submit" block>
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const formData = ref({
  title: '',
  cover: '',
  images: [],
  video: ''
})

const onSubmit = (values) => {
  console.log('表单提交:', formData.value)
  Toast.success('提交成功')
}
</script>

<style scoped>
.submit-area {
  padding: 16px;
}
</style>
```

## 特性

- 📱 **原生集成**: 专为原生应用环境设计，调用原生相机和相册
- 📷 **多媒体支持**: 支持图片和视频上传
- 🖼️ **缩略图**: 自动生成80x80的缩略图，提升加载性能
- 👀 **预览功能**: 集成媒体预览组件，支持点击预览
- 🎯 **多文件上传**: 支持设置最大上传数量
- 🔒 **预处理模式**: 支持预处理模式，文件不可删除
- 🎨 **自定义图标**: 支持自定义上传按钮图标
- ⚡ **事件丰富**: 提供完整的上传生命周期事件

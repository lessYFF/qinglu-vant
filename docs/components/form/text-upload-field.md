# faceTextUploadField

文本上传字段组件，以文字形式展示的上传组件，支持图片和视频上传。

## 基础用法

```vue
<template>
  <faceTextUploadField
    v-model="uploadedFiles"
    type="image"
    :max-count="3"
  />
</template>

<script setup>
import { ref } from 'vue'
import { faceTextUploadField } from 'qinglu-vant'

const uploadedFiles = ref([])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定的文件列表 | Array \| String | - |
| type | 上传类型 | String | 'image' |
| maxCount | 最大上传数量 | Number | 1 |
| isPreparation | 是否为预处理模式 | Boolean | false |
| optimize | 图片压缩配置 | Object \| Boolean | undefined |
| formatValue | 格式化值类型 | String | undefined |

#### type 可选值

| 值 | 说明 |
|---|------|
| image | 图片上传 |
| video | 视频上传 |

#### optimize 配置项

| 字段 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| quality | 压缩质量 | Number | 0.2 |
| maxWidth | 最大宽度 | Number | - |
| maxHeight | 最大高度 | Number | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 文件变化时触发 | files: 文件列表 |
| uploadCompleted | 上传完成时触发 | - |

## 示例

### 图片上传

```vue
<template>
  <div class="image-upload-demo">
    <van-cell-group>
      <van-cell title="单张图片上传">
        <template #value>
          <faceTextUploadField
            v-model="singleImage"
            type="image"
            :max-count="1"
            @upload-completed="handleSingleUploadComplete"
          />
        </template>
      </van-cell>

      <van-cell title="多张图片上传">
        <template #value>
          <faceTextUploadField
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
  <div class="video-upload-demo">
    <van-cell-group>
      <van-cell title="视频上传">
        <template #value>
          <faceTextUploadField
            v-model="videoFile"
            type="video"
            :max-count="1"
            :optimize="false"
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

### 图片压缩配置

```vue
<template>
  <div class="compress-demo">
    <van-cell-group>
      <van-cell title="默认压缩">
        <template #value>
          <faceTextUploadField
            v-model="defaultCompress"
            type="image"
            :max-count="3"
          />
        </template>
      </van-cell>

      <van-cell title="自定义压缩">
        <template #value>
          <faceTextUploadField
            v-model="customCompress"
            type="image"
            :max-count="3"
            :optimize="compressOptions"
          />
        </template>
      </van-cell>

      <van-cell title="不压缩">
        <template #value>
          <faceTextUploadField
            v-model="noCompress"
            type="image"
            :max-count="3"
            :optimize="false"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const defaultCompress = ref([])
const customCompress = ref([])
const noCompress = ref([])

const compressOptions = {
  quality: 0.6,
  maxWidth: 1200,
  maxHeight: 1200
}
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
          <faceTextUploadField
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

### 格式化值类型

```vue
<template>
  <div class="format-demo">
    <van-cell-group>
      <van-cell title="数组格式">
        <template #value>
          <faceTextUploadField
            v-model="arrayFormat"
            type="image"
            :max-count="3"
            format-value="Array"
          />
        </template>
      </van-cell>

      <van-cell title="字符串格式">
        <template #value>
          <faceTextUploadField
            v-model="stringFormat"
            type="image"
            :max-count="1"
          />
        </template>
      </van-cell>
    </van-cell-group>

    <div class="format-result">
      <h3>格式化结果</h3>
      <p><strong>数组格式:</strong> {{ JSON.stringify(arrayFormat) }}</p>
      <p><strong>字符串格式:</strong> {{ stringFormat }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const arrayFormat = ref([])
const stringFormat = ref('')
</script>

<style scoped>
.format-demo {
  padding: 16px;
}

.format-result {
  margin-top: 16px;
  padding: 16px;
  background: #f7f8fa;
  border-radius: 8px;
}

.format-result h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #323233;
}

.format-result p {
  margin: 8px 0;
  font-size: 12px;
  color: #646566;
  word-break: break-all;
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
          <faceTextUploadField
            v-model="formData.cover"
            type="image"
            :max-count="1"
            :rules="[{ required: true, message: '请上传封面图片' }]"
          />
        </template>
      </van-cell>

      <van-cell title="详情图片">
        <template #value>
          <faceTextUploadField
            v-model="formData.images"
            type="image"
            :max-count="9"
            format-value="Array"
          />
        </template>
      </van-cell>

      <van-cell title="视频介绍">
        <template #value>
          <faceTextUploadField
            v-model="formData.video"
            type="video"
            :max-count="1"
            :optimize="false"
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

- 📝 **文字展示**: 以文字形式展示上传状态，界面简洁
- 📷 **多媒体支持**: 支持图片和视频上传
- 🗜️ **图片压缩**: 内置图片压缩功能，可自定义压缩参数
- 👀 **预览功能**: 集成媒体预览组件，支持点击预览
- 🔄 **格式化**: 支持数组和字符串两种数据格式
- 🔒 **预处理模式**: 支持预处理模式，文件不可删除
- 📱 **原生支持**: 支持原生应用的文件上传
- ⚡ **事件丰富**: 提供完整的上传生命周期事件

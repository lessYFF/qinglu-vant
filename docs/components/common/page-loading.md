# FacePageLoading

页面加载组件，提供全屏或局部加载状态显示，带有动画效果。

## 基础用法

```vue
<template>
  <FacePageLoading :loading="isLoading">
    <div class="content">
      页面内容区域
    </div>
  </FacePageLoading>
</template>

<script setup>
import { ref } from 'vue'
import { FacePageLoading } from 'qinglu-vant'

const isLoading = ref(true)

// 模拟3秒后加载完成
setTimeout(() => {
  isLoading.value = false
}, 3000)
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| loading | 是否显示加载状态 | Boolean | false |
| text | 加载提示文字 | String | '加载中...' |
| fullScreen | 是否全屏显示 | Boolean | false |

### Slots

| 名称 | 说明 |
|------|------|
| default | 内容区域插槽 |

## 示例

### 基础加载

```vue
<template>
  <div class="loading-demo">
    <van-button @click="toggleLoading" type="primary">
      {{ isLoading ? '隐藏加载' : '显示加载' }}
    </van-button>

    <div class="content-area">
      <FacePageLoading :loading="isLoading">
        <div class="demo-content">
          <h3>内容区域</h3>
          <p>这里是页面的主要内容，加载状态下会被遮罩覆盖。</p>
          <p>加载状态: {{ isLoading ? '加载中' : '加载完成' }}</p>
        </div>
      </FacePageLoading>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(false)

const toggleLoading = () => {
  isLoading.value = !isLoading.value
}
</script>

<style scoped>
.loading-demo {
  padding: 16px;
}

.content-area {
  margin-top: 16px;
  height: 200px;
  position: relative;
  border: 1px solid #ebedf0;
  border-radius: 8px;
  overflow: hidden;
}

.demo-content {
  padding: 16px;
}

.demo-content h3 {
  margin-top: 0;
}
</style>
```

### 自定义提示文字

```vue
<template>
  <div class="custom-text-demo">
    <van-cell-group>
      <van-field
        v-model="loadingText"
        label="提示文字"
        placeholder="请输入加载提示文字"
      />
    </van-cell-group>

    <div class="button-group">
      <van-button @click="showLoading" type="primary">
        显示加载
      </van-button>
    </div>

    <div class="content-area">
      <FacePageLoading :loading="isLoading" :text="loadingText">
        <div class="demo-content">
          <h3>内容区域</h3>
          <p>这里是页面的主要内容，加载状态下会被遮罩覆盖。</p>
        </div>
      </FacePageLoading>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(false)
const loadingText = ref('数据加载中，请稍候...')

const showLoading = () => {
  isLoading.value = true

  // 3秒后自动关闭
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}
</script>

<style scoped>
.custom-text-demo {
  padding: 16px;
}

.button-group {
  margin: 16px 0;
}

.content-area {
  height: 200px;
  position: relative;
  border: 1px solid #ebedf0;
  border-radius: 8px;
  overflow: hidden;
}

.demo-content {
  padding: 16px;
}
</style>
```

### 全屏加载

```vue
<template>
  <div class="fullscreen-demo">
    <van-button @click="showFullscreenLoading" type="primary">
      显示全屏加载
    </van-button>

    <FacePageLoading :loading="isFullscreenLoading" full-screen text="全屏加载中...">
      <!-- 全屏模式下，此处内容不会显示 -->
    </FacePageLoading>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isFullscreenLoading = ref(false)

const showFullscreenLoading = () => {
  isFullscreenLoading.value = true

  // 3秒后自动关闭
  setTimeout(() => {
    isFullscreenLoading.value = false
  }, 3000)
}
</script>

<style scoped>
.fullscreen-demo {
  padding: 16px;
}
</style>
```

### 数据加载示例

```vue
<template>
  <div class="data-loading-demo">
    <van-cell-group>
      <van-cell title="刷新数据" is-link @click="loadData" />
    </van-cell-group>

    <div class="data-container">
      <FacePageLoading :loading="isLoading" text="数据加载中...">
        <div v-if="!isLoading && !data.length" class="empty-state">
          <van-empty description="暂无数据" />
        </div>

        <div v-else class="data-list">
          <van-cell
            v-for="item in data"
            :key="item.id"
            :title="item.title"
            :label="item.description"
          />
        </div>
      </FacePageLoading>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(false)
const data = ref([])

const loadData = () => {
  isLoading.value = true
  data.value = []

  // 模拟API请求
  setTimeout(() => {
    data.value = [
      { id: 1, title: '数据项 1', description: '这是第一条数据的描述' },
      { id: 2, title: '数据项 2', description: '这是第二条数据的描述' },
      { id: 3, title: '数据项 3', description: '这是第三条数据的描述' },
      { id: 4, title: '数据项 4', description: '这是第四条数据的描述' },
      { id: 5, title: '数据项 5', description: '这是第五条数据的描述' }
    ]
    isLoading.value = false
  }, 2000)
}

// 初始加载
loadData()
</script>

<style scoped>
.data-loading-demo {
  padding: 16px;
}

.data-container {
  margin-top: 16px;
  height: 300px;
  position: relative;
  border: 1px solid #ebedf0;
  border-radius: 8px;
  overflow: hidden;
}

.empty-state {
  padding: 40px 0;
}

.data-list {
  padding: 8px 0;
}
</style>
```

### 表单提交加载

```vue
<template>
  <div class="form-loading-demo">
    <FacePageLoading :loading="isSubmitting">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="formData.name"
            name="name"
            label="姓名"
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
          />
          <van-field
            v-model="formData.phone"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="formData.message"
            name="message"
            label="留言"
            type="textarea"
            placeholder="请输入留言"
            rows="3"
          />
        </van-cell-group>

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </FacePageLoading>

    <van-dialog v-model:show="showSuccess" title="提交成功" message="表单已成功提交" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isSubmitting = ref(false)
const showSuccess = ref(false)
const formData = ref({
  name: '',
  phone: '',
  message: ''
})

const onSubmit = (values) => {
  isSubmitting.value = true

  // 模拟表单提交
  setTimeout(() => {
    console.log('表单提交:', values)
    isSubmitting.value = false
    showSuccess.value = true

    // 重置表单
    formData.value = {
      name: '',
      phone: '',
      message: ''
    }
  }, 2000)
}
</script>

<style scoped>
.form-loading-demo {
  padding: 16px;
  position: relative;
}
</style>
```

## 特性

- 🔄 **动画效果**: 优雅的旋转动画加载效果
- 🎯 **局部加载**: 支持在指定区域显示加载状态
- 📱 **全屏模式**: 支持全屏遮罩加载
- 🎨 **自定义文字**: 支持自定义加载提示文字
- 🔍 **半透明遮罩**: 加载时显示半透明遮罩，不完全遮挡内容
- 🎪 **插槽支持**: 通过默认插槽包裹需要加载的内容
- ⚡ **轻量实现**: 简单轻量的实现，不依赖第三方库

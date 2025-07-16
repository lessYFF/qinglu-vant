# FaceNavigateBar

导航栏组件，基于van-nav-bar的自定义主题导航栏。

## 基础用法

```vue
<template>
  <FaceNavigateBar
    title="页面标题"
  />
</template>

<script setup>
import { FaceNavigateBar } from 'qinglu-vant'
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 导航栏标题 | String | '页面标题' |
| leftText | 左侧文字 | String | '返回' |
| rightText | 右侧文字 | String | '' |
| btnTxt | 右侧按钮文字（与rightText等效） | String | '' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click-left | 点击左侧按钮时触发 | - |
| click-right | 点击右侧按钮时触发 | - |

## 示例

### 基础导航栏

```vue
<template>
  <div class="page-demo">
    <FaceNavigateBar title="基础导航栏" />

    <div class="content">
      <p>页面内容</p>
    </div>
  </div>
</template>

<script setup>
import { FaceNavigateBar } from 'qinglu-vant'
</script>

<style scoped>
.content {
  padding: 16px;
  height: 200px;
  background: #f7f8fa;
}
</style>
```

### 带右侧按钮

```vue
<template>
  <div class="page-demo">
    <FaceNavigateBar
      title="设置页面"
      right-text="保存"
      @click-right="handleSave"
    />

    <div class="content">
      <van-cell-group>
        <van-cell title="通知设置" is-link />
        <van-cell title="隐私设置" is-link />
        <van-cell title="账户安全" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { Toast } from 'vant'

const handleSave = () => {
  Toast.success('设置已保存')
}
</script>
```

### 自定义左侧文字

```vue
<template>
  <div class="page-demo">
    <FaceNavigateBar
      title="订单详情"
      left-text="关闭"
      right-text="分享"
      @click-left="handleClose"
      @click-right="handleShare"
    />

    <div class="content">
      <van-cell-group>
        <van-cell title="订单号" value="20240115001" />
        <van-cell title="订单状态" value="已完成" />
        <van-cell title="订单金额" value="¥299.00" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { Toast } from 'vant'

const handleClose = () => {
  console.log('关闭页面')
  // 在实际应用中，这里会调用路由返回
}

const handleShare = () => {
  Toast.success('分享成功')
}
</script>
```

### 动态标题

```vue
<template>
  <div class="page-demo">
    <FaceNavigateBar
      :title="currentTitle"
      right-text="切换"
      @click-right="switchTitle"
    />

    <div class="content">
      <van-cell-group>
        <van-cell title="当前页面" :value="currentTitle" />
        <van-cell title="点击右上角" value="可以切换标题" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const titles = ['首页', '我的订单', '个人中心', '设置页面']
const currentIndex = ref(0)
const currentTitle = ref(titles[0])

const switchTitle = () => {
  currentIndex.value = (currentIndex.value + 1) % titles.length
  currentTitle.value = titles[currentIndex.value]
}
</script>
```

### 页面列表示例

```vue
<template>
  <div class="page-list-demo">
    <div v-for="page in pageList" :key="page.id" class="page-item">
      <FaceNavigateBar
        :title="page.title"
        :right-text="page.action"
        @click-right="() => handlePageAction(page)"
      />

      <div class="page-preview">
        <p>{{ page.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const pageList = ref([
  {
    id: 1,
    title: '车辆管理',
    action: '添加',
    description: '管理您的车辆信息'
  },
  {
    id: 2,
    title: '订单中心',
    action: '筛选',
    description: '查看所有订单记录'
  },
  {
    id: 3,
    title: '财务报表',
    action: '导出',
    description: '查看收支明细'
  },
  {
    id: 4,
    title: '系统设置',
    action: '编辑',
    description: '配置系统参数'
  }
])

const handlePageAction = (page) => {
  Toast.success(`${page.action} ${page.title}`)
}
</script>

<style scoped>
.page-list-demo {
  background: #f7f8fa;
}

.page-item {
  margin-bottom: 16px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.page-preview {
  padding: 16px;
  color: #666;
  font-size: 14px;
}
</style>
```

### 主题定制

```vue
<template>
  <div class="theme-demo">
    <div class="theme-selector">
      <van-radio-group v-model="currentTheme" direction="horizontal">
        <van-radio name="default">默认主题</van-radio>
        <van-radio name="dark">深色主题</van-radio>
        <van-radio name="custom">自定义主题</van-radio>
      </van-radio-group>
    </div>

    <!-- 注意：FaceNavigateBar内部已经有主题配置，这里只是展示不同主题效果 -->
    <div :class="['themed-nav', currentTheme]">
      <FaceNavigateBar
        title="主题演示"
        right-text="主题"
        @click-right="switchTheme"
      />
    </div>

    <div class="content">
      <p>当前主题: {{ themeNames[currentTheme] }}</p>
      <p>导航栏使用了自定义的蓝色主题</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentTheme = ref('default')
const themeNames = {
  default: '默认主题',
  dark: '深色主题',
  custom: '自定义主题'
}

const switchTheme = () => {
  const themes = Object.keys(themeNames)
  const currentIndex = themes.indexOf(currentTheme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  currentTheme.value = themes[nextIndex]
}
</script>

<style scoped>
.theme-demo {
  min-height: 300px;
}

.theme-selector {
  padding: 16px;
  background: white;
}

.themed-nav.dark {
  filter: brightness(0.8);
}

.themed-nav.custom {
  filter: hue-rotate(60deg);
}

.content {
  padding: 16px;
  background: #f7f8fa;
}
</style>
```

## 特性

- 🎨 **自定义主题**: 内置蓝色主题配色，与品牌风格一致
- 🔙 **智能返回**: 自动处理路由返回，支持演示环境兼容
- 📱 **安全区域**: 自动适配刘海屏等设备的安全区域
- 🎯 **事件支持**: 支持左右按钮点击事件
- 🔧 **灵活配置**: 支持自定义标题和按钮文字
- 📦 **开箱即用**: 基于van-nav-bar封装，保持API一致性

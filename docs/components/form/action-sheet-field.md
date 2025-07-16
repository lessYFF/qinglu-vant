# FaceActionSheetField

动作面板字段组件，基于van-action-sheet实现的底部弹出选择器。

## 基础用法

```vue
<template>
  <FaceActionSheetField
    v-model="selectedAction"
    title="选择操作"
    placeholder="请选择操作"
    :actions="actionList"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceActionSheetField } from 'qinglu-vant'

const selectedAction = ref(null)
const actionList = ref([
  { name: '编辑', value: 'edit' },
  { name: '删除', value: 'delete', color: '#ee0a24' },
  { name: '分享', value: 'share' },
  { name: '取消', value: 'cancel' }
])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定值对象 | Object | - |
| title | 动作面板标题 | String | - |
| actions | 动作选项列表 | Array | [] |
| placeholder | 占位符文本 | String | - |
| disabled | 是否禁用 | Boolean | false |

#### v-model 对象结构

| 字段 | 说明 | 类型 |
|------|------|------|
| text | 显示文本 | String |
| value | 选中值 | Any |

#### actions 数组项结构

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| name | 选项名称 | String | 是 |
| value | 选项值 | Any | 否 |
| color | 选项颜色 | String | 否 |
| disabled | 是否禁用 | Boolean | 否 |
| loading | 是否显示加载状态 | Boolean | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | value: 选中的值对象 |
| change | 值变化时触发 | value: 选中的值对象 |
| show | 显示动作面板时触发 | - |

## 示例

### 基础选择

```vue
<template>
  <FaceActionSheetField
    v-model="basicAction"
    title="基础操作"
    placeholder="请选择操作"
    :actions="basicActions"
    @change="handleBasicChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const basicAction = ref(null)
const basicActions = ref([
  { name: '查看详情', value: 'view' },
  { name: '编辑信息', value: 'edit' },
  { name: '复制链接', value: 'copy' },
  { name: '删除', value: 'delete', color: '#ee0a24' }
])

const handleBasicChange = (action) => {
  console.log('选择的操作:', action)
}
</script>
```

### 带颜色和状态的选项

```vue
<template>
  <FaceActionSheetField
    v-model="styledAction"
    title="操作选择"
    placeholder="请选择操作"
    :actions="styledActions"
  />
</template>

<script setup>
import { ref } from 'vue'

const styledAction = ref(null)
const styledActions = ref([
  { name: '通过审核', value: 'approve', color: '#07c160' },
  { name: '驳回申请', value: 'reject', color: '#ee0a24' },
  { name: '暂存草稿', value: 'draft', color: '#ff976a' },
  { name: '提交审核', value: 'submit', disabled: false },
  { name: '处理中...', value: 'processing', loading: true, disabled: true }
])
</script>
```

### 订单操作示例

```vue
<template>
  <div class="order-actions">
    <van-cell-group>
      <van-cell title="订单状态" :value="orderStatus" />
      <van-cell title="可执行操作">
        <template #value>
          <FaceActionSheetField
            v-model="orderAction"
            title="订单操作"
            placeholder="选择操作"
            :actions="orderActions"
            @change="handleOrderAction"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const orderStatus = ref('待处理')
const orderAction = ref(null)

const orderActions = computed(() => {
  const actions = [
    { name: '查看详情', value: 'detail' },
    { name: '修改订单', value: 'edit' },
    { name: '联系客户', value: 'contact' }
  ]

  if (orderStatus.value === '待处理') {
    actions.push(
      { name: '确认订单', value: 'confirm', color: '#07c160' },
      { name: '取消订单', value: 'cancel', color: '#ee0a24' }
    )
  }

  return actions
})

const handleOrderAction = (action) => {
  console.log('订单操作:', action)

  switch (action.value) {
    case 'confirm':
      orderStatus.value = '已确认'
      break
    case 'cancel':
      orderStatus.value = '已取消'
      break
    case 'edit':
      // 跳转到编辑页面
      break
    default:
      console.log('执行操作:', action.value)
  }

  // 重置选择
  orderAction.value = null
}
</script>
```

### 文件操作示例

```vue
<template>
  <div class="file-manager">
    <van-list>
      <van-cell
        v-for="file in fileList"
        :key="file.id"
        :title="file.name"
        :label="file.size"
      >
        <template #right-icon>
          <FaceActionSheetField
            v-model="file.action"
            title="文件操作"
            :actions="getFileActions(file)"
            @change="(action) => handleFileAction(file, action)"
          >
            <van-icon name="ellipsis" />
          </FaceActionSheetField>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileList = ref([
  { id: 1, name: '文档.pdf', size: '2.5MB', type: 'pdf', action: null },
  { id: 2, name: '图片.jpg', size: '1.2MB', type: 'image', action: null },
  { id: 3, name: '视频.mp4', size: '15.8MB', type: 'video', action: null }
])

const getFileActions = (file) => {
  const baseActions = [
    { name: '下载', value: 'download' },
    { name: '重命名', value: 'rename' },
    { name: '移动', value: 'move' },
    { name: '复制', value: 'copy' }
  ]

  if (file.type === 'image') {
    baseActions.unshift({ name: '预览', value: 'preview' })
  }

  baseActions.push({ name: '删除', value: 'delete', color: '#ee0a24' })

  return baseActions
}

const handleFileAction = (file, action) => {
  console.log(`对文件 ${file.name} 执行操作:`, action.value)

  // 重置选择状态
  file.action = null
}
</script>
```

## 特性

- 📋 **底部弹出**: 基于van-action-sheet的底部弹出选择
- 🎨 **样式定制**: 支持选项颜色、禁用状态、加载状态
- 📱 **移动端优化**: 适合移动端的操作体验
- 🔧 **灵活配置**: 支持动态生成操作选项
- ✅ **状态管理**: 自动管理选择状态和显示文本
- 🎯 **事件丰富**: 提供完整的事件回调机制

# FaceCustomFieldValue

自定义字段值组件，用于在表单字段中显示自定义格式的值。

## 基础用法

```vue
<template>
  <FaceCustomFieldValue
    :value="fieldValue"
    :display-value="displayText"
    placeholder="请选择"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceCustomFieldValue } from 'qinglu-vant'

const fieldValue = ref({ id: 1, name: '选项1' })
const displayText = ref('选项1')
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 字段的实际值 | Any | - |
| displayValue | 显示的文本值 | String \| Number | - |
| placeholder | 占位符文本 | String | - |
| clearable | 是否显示清除按钮 | Boolean | false |
| ellipsis | 是否启用文本省略 | Boolean | true |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| clear | 点击清除按钮时触发 | - |

### Slots

| 名称 | 说明 |
|------|------|
| default | 自定义显示内容，默认显示displayValue |

## 示例

### 基础显示

```vue
<template>
  <van-cell-group>
    <van-cell title="基础显示">
      <template #value>
        <FaceCustomFieldValue
          :value="basicValue"
          :display-value="basicDisplay"
          placeholder="请选择选项"
        />
      </template>
    </van-cell>

    <van-cell title="空值显示">
      <template #value>
        <FaceCustomFieldValue
          :value="null"
          :display-value="''"
          placeholder="暂无数据"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const basicValue = ref({ id: 1, type: 'option' })
const basicDisplay = ref('选项一')
</script>
```

### 可清除字段

```vue
<template>
  <van-cell-group>
    <van-cell title="可清除字段">
      <template #value>
        <FaceCustomFieldValue
          :value="clearableValue"
          :display-value="clearableDisplay"
          placeholder="请选择"
          clearable
          @clear="handleClear"
        />
      </template>
    </van-cell>
  </van-cell-group>

  <div class="demo-actions">
    <van-button @click="setValue" type="primary" size="small">
      设置值
    </van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const clearableValue = ref(null)
const clearableDisplay = ref('')

const setValue = () => {
  clearableValue.value = { id: 1, name: '测试选项' }
  clearableDisplay.value = '测试选项'
}

const handleClear = () => {
  clearableValue.value = null
  clearableDisplay.value = ''
  console.log('字段已清除')
}
</script>

<style scoped>
.demo-actions {
  padding: 16px;
}
</style>
```

### 文本省略控制

```vue
<template>
  <van-cell-group>
    <van-cell title="启用省略（默认）">
      <template #value>
        <FaceCustomFieldValue
          :value="longValue"
          :display-value="longText"
          :ellipsis="true"
        />
      </template>
    </van-cell>

    <van-cell title="禁用省略">
      <template #value>
        <FaceCustomFieldValue
          :value="longValue"
          :display-value="longText"
          :ellipsis="false"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const longValue = ref({ id: 1, description: 'very long text' })
const longText = ref('这是一段很长的文本内容，用来演示文本省略功能的效果')
</script>
```

### 自定义显示内容

```vue
<template>
  <van-cell-group>
    <van-cell title="自定义标签显示">
      <template #value>
        <FaceCustomFieldValue
          :value="tagValue"
          :display-value="tagDisplay"
          placeholder="请选择标签"
        >
          <van-tag :type="getTagType(tagValue?.status)">
            {{ tagDisplay }}
          </van-tag>
        </FaceCustomFieldValue>
      </template>
    </van-cell>

    <van-cell title="自定义图标显示">
      <template #value>
        <FaceCustomFieldValue
          :value="iconValue"
          :display-value="iconDisplay"
          placeholder="请选择状态"
        >
          <div class="custom-display">
            <van-icon :name="getStatusIcon(iconValue?.status)" />
            <span>{{ iconDisplay }}</span>
          </div>
        </FaceCustomFieldValue>
      </template>
    </van-cell>

    <van-cell title="自定义多行显示">
      <template #value>
        <FaceCustomFieldValue
          :value="multiValue"
          :display-value="multiDisplay"
          placeholder="请选择用户"
          :ellipsis="false"
        >
          <div class="multi-line-display">
            <div class="primary-text">{{ multiValue?.name }}</div>
            <div class="secondary-text">{{ multiValue?.email }}</div>
          </div>
        </FaceCustomFieldValue>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const tagValue = ref({ id: 1, status: 'active' })
const tagDisplay = ref('活跃状态')

const iconValue = ref({ id: 1, status: 'success' })
const iconDisplay = ref('成功')

const multiValue = ref({
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com'
})
const multiDisplay = ref('张三')

const getTagType = (status) => {
  const typeMap = {
    active: 'success',
    inactive: 'warning',
    disabled: 'danger'
  }
  return typeMap[status] || 'default'
}

const getStatusIcon = (status) => {
  const iconMap = {
    success: 'success',
    warning: 'warning-o',
    error: 'close',
    info: 'info-o'
  }
  return iconMap[status] || 'question-o'
}
</script>

<style scoped>
.custom-display {
  display: flex;
  align-items: center;
  gap: 4px;
}

.multi-line-display .primary-text {
  font-size: 14px;
  color: #323233;
  line-height: 1.4;
}

.multi-line-display .secondary-text {
  font-size: 12px;
  color: #969799;
  line-height: 1.4;
}
</style>
```

### 表单字段集成

```vue
<template>
  <van-form @submit="onSubmit">
    <van-cell-group>
      <van-field label="选择城市" is-link @click="showCityPicker = true">
        <template #input>
          <FaceCustomFieldValue
            :value="formData.city"
            :display-value="formData.cityName"
            placeholder="请选择城市"
            clearable
            @clear="clearCity"
          />
        </template>
      </van-field>

      <van-field label="选择用户" is-link @click="showUserPicker = true">
        <template #input>
          <FaceCustomFieldValue
            :value="formData.user"
            :display-value="formData.userName"
            placeholder="请选择用户"
          >
            <div v-if="formData.user" class="user-display">
              <van-image
                :src="formData.user.avatar"
                width="24"
                height="24"
                round
              />
              <span>{{ formData.userName }}</span>
            </div>
          </FaceCustomFieldValue>
        </template>
      </van-field>
    </van-cell-group>

    <div class="submit-area">
      <van-button type="primary" native-type="submit" block>
        提交
      </van-button>
    </div>
  </van-form>

  <!-- 城市选择器 -->
  <van-popup v-model:show="showCityPicker" position="bottom">
    <van-picker
      :columns="cityColumns"
      @confirm="onCityConfirm"
      @cancel="showCityPicker = false"
    />
  </van-popup>

  <!-- 用户选择器 -->
  <van-popup v-model:show="showUserPicker" position="bottom">
    <van-picker
      :columns="userColumns"
      @confirm="onUserConfirm"
      @cancel="showUserPicker = false"
    />
  </van-popup>
</template>

<script setup>
import { ref } from 'vue'

const showCityPicker = ref(false)
const showUserPicker = ref(false)

const formData = ref({
  city: null,
  cityName: '',
  user: null,
  userName: ''
})

const cityColumns = ref([
  { text: '北京', value: { id: 1, name: '北京', code: 'BJ' } },
  { text: '上海', value: { id: 2, name: '上海', code: 'SH' } },
  { text: '广州', value: { id: 3, name: '广州', code: 'GZ' } }
])

const userColumns = ref([
  {
    text: '张三',
    value: {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      avatar: 'https://example.com/avatar1.jpg'
    }
  },
  {
    text: '李四',
    value: {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      avatar: 'https://example.com/avatar2.jpg'
    }
  }
])

const onCityConfirm = ({ selectedOptions }) => {
  const city = selectedOptions[0].value
  formData.value.city = city
  formData.value.cityName = city.name
  showCityPicker.value = false
}

const onUserConfirm = ({ selectedOptions }) => {
  const user = selectedOptions[0].value
  formData.value.user = user
  formData.value.userName = user.name
  showUserPicker.value = false
}

const clearCity = () => {
  formData.value.city = null
  formData.value.cityName = ''
}

const onSubmit = (values) => {
  console.log('表单提交:', formData.value)
}
</script>

<style scoped>
.submit-area {
  padding: 16px;
}

.user-display {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
```

## 特性

- 📝 **灵活显示**: 支持显示与实际值分离，便于格式化显示
- 🧹 **可清除**: 支持显示清除按钮，方便重置字段值
- ✂️ **文本省略**: 支持长文本自动省略，保持界面整洁
- 🎨 **自定义内容**: 通过插槽支持完全自定义显示内容
- 📱 **表单集成**: 专为表单字段设计，与van-field完美配合
- 🎯 **占位符**: 支持空值时显示占位符文本
- ⚡ **轻量级**: 简单轻量的实现，专注于显示逻辑

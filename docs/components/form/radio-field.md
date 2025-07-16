# FaceRadioField

单选字段组件，基于van-radio-group的表单字段，支持水平排列的单选项。

## 基础用法

```vue
<template>
  <FaceRadioField
    v-model="selectedValue"
    label="性别"
    :columns="genderOptions"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceRadioField } from 'qinglu-vant'

const selectedValue = ref('male')
const genderOptions = [
  { text: '男', value: 'male' },
  { text: '女', value: 'female' }
]
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定值 | String \| Number | - |
| columns | 选项数组 | Array | [] |
| iconSize | 图标大小 | String | - |
| justify | 对齐方式 | String | 'flex-start' |
| label | 字段标签 | String | - |
| disabled | 是否禁用 | Boolean | false |
| readonly | 是否只读 | Boolean | false |

#### columns 数组项结构

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| text | 选项文本 | String | 是 |
| value | 选项值 | String \| Number | 是 |

#### justify 可选值

- `'flex-start'`: 左对齐
- `'center'`: 居中对齐
- `'flex-end'`: 右对齐
- `'space-between'`: 两端对齐
- `'space-around'`: 环绕对齐

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | value: 当前选中值 |
| change | 值变化时触发 | value: 当前选中值 |

## 示例

### 基础单选

```vue
<template>
  <van-cell-group>
    <FaceRadioField
      v-model="paymentMethod"
      label="支付方式"
      :columns="paymentOptions"
      @change="handlePaymentChange"
    />
  </van-cell-group>

  <div class="result">
    <p>已选择: {{ getSelectedText() }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const paymentMethod = ref('alipay')
const paymentOptions = [
  { text: '支付宝', value: 'alipay' },
  { text: '微信支付', value: 'wechat' },
  { text: '银行卡', value: 'bank' }
]

const handlePaymentChange = (value) => {
  console.log('支付方式变更:', value)
}

const getSelectedText = () => {
  const selected = paymentOptions.find(item => item.value === paymentMethod.value)
  return selected ? selected.text : '未选择'
}
</script>

<style scoped>
.result {
  padding: 16px;
  background: #f7f8fa;
  margin-top: 16px;
}
</style>
```

### 自定义图标大小

```vue
<template>
  <van-cell-group>
    <FaceRadioField
      v-model="sizeValue"
      label="图标大小"
      :columns="sizeOptions"
      icon-size="24px"
    />
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const sizeValue = ref('medium')
const sizeOptions = [
  { text: '小', value: 'small' },
  { text: '中', value: 'medium' },
  { text: '大', value: 'large' }
]
</script>
```

### 不同对齐方式

```vue
<template>
  <van-cell-group>
    <FaceRadioField
      v-model="leftValue"
      label="左对齐"
      :columns="alignOptions"
      justify="flex-start"
    />

    <FaceRadioField
      v-model="centerValue"
      label="居中对齐"
      :columns="alignOptions"
      justify="center"
    />

    <FaceRadioField
      v-model="rightValue"
      label="右对齐"
      :columns="alignOptions"
      justify="flex-end"
    />

    <FaceRadioField
      v-model="betweenValue"
      label="两端对齐"
      :columns="alignOptions"
      justify="space-between"
    />
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const leftValue = ref('option1')
const centerValue = ref('option2')
const rightValue = ref('option3')
const betweenValue = ref('option1')

const alignOptions = [
  { text: '选项1', value: 'option1' },
  { text: '选项2', value: 'option2' },
  { text: '选项3', value: 'option3' }
]
</script>
```

### 禁用状态

```vue
<template>
  <van-cell-group>
    <FaceRadioField
      v-model="disabledValue"
      label="禁用状态"
      :columns="disabledOptions"
      disabled
    />

    <FaceRadioField
      v-model="readonlyValue"
      label="只读状态"
      :columns="disabledOptions"
      readonly
    />
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const disabledValue = ref('option1')
const readonlyValue = ref('option2')

const disabledOptions = [
  { text: '选项1', value: 'option1' },
  { text: '选项2', value: 'option2' },
  { text: '选项3', value: 'option3' }
]
</script>
```

### 表单验证

```vue
<template>
  <van-form @submit="handleSubmit">
    <van-cell-group>
      <FaceRadioField
        v-model="formData.gender"
        label="性别"
        :columns="genderOptions"
        :rules="[{ required: true, message: '请选择性别' }]"
      />

      <FaceRadioField
        v-model="formData.education"
        label="学历"
        :columns="educationOptions"
        :rules="[{ required: true, message: '请选择学历' }]"
      />

      <FaceRadioField
        v-model="formData.experience"
        label="工作经验"
        :columns="experienceOptions"
        :rules="[{ required: true, message: '请选择工作经验' }]"
      />
    </van-cell-group>

    <div class="submit-button">
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
  gender: '',
  education: '',
  experience: ''
})

const genderOptions = [
  { text: '男', value: 'male' },
  { text: '女', value: 'female' }
]

const educationOptions = [
  { text: '高中', value: 'highschool' },
  { text: '大专', value: 'college' },
  { text: '本科', value: 'bachelor' },
  { text: '硕士及以上', value: 'master' }
]

const experienceOptions = [
  { text: '应届毕业', value: 'fresh' },
  { text: '1-3年', value: 'junior' },
  { text: '3-5年', value: 'mid' },
  { text: '5年以上', value: 'senior' }
]

const handleSubmit = (values) => {
  console.log('表单提交:', values)
  Toast.success('提交成功')
}
</script>

<style scoped>
.submit-button {
  padding: 16px;
}
</style>
```

### 动态选项

```vue
<template>
  <div class="dynamic-demo">
    <van-cell-group>
      <FaceRadioField
        v-model="selectedCategory"
        label="商品类别"
        :columns="categoryOptions"
        @change="handleCategoryChange"
      />

      <FaceRadioField
        v-model="selectedSubcategory"
        label="商品子类"
        :columns="subcategoryOptions"
      />
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('')
const selectedSubcategory = ref('')

const categoryOptions = [
  { text: '电子产品', value: 'electronics' },
  { text: '服装', value: 'clothing' },
  { text: '食品', value: 'food' }
]

const subcategories = {
  electronics: [
    { text: '手机', value: 'phone' },
    { text: '电脑', value: 'computer' },
    { text: '相机', value: 'camera' }
  ],
  clothing: [
    { text: '上衣', value: 'tops' },
    { text: '裤子', value: 'pants' },
    { text: '鞋子', value: 'shoes' }
  ],
  food: [
    { text: '水果', value: 'fruit' },
    { text: '蔬菜', value: 'vegetable' },
    { text: '肉类', value: 'meat' }
  ]
}

const subcategoryOptions = computed(() => {
  if (!selectedCategory.value) return []
  return subcategories[selectedCategory.value] || []
})

const handleCategoryChange = (category) => {
  // 重置子类选择
  selectedSubcategory.value = ''
}
</script>
```

## 特性

- 📻 **水平排列**: 默认水平排列的单选项，适合选项较少的场景
- 🎯 **灵活对齐**: 支持多种对齐方式，满足不同布局需求
- 🎨 **自定义图标**: 支持自定义图标大小
- 📱 **移动端优化**: 适合移动端触控操作的选项间距
- 🔧 **表单集成**: 完全兼容van-form的验证和提交机制
- ⚡ **实时更新**: 选择后立即触发change事件
- 🎪 **状态管理**: 支持禁用和只读状态

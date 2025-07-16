# FaceSlideField

滑动字段组件，基于van-slider的表单字段，带有刻度尺显示。

## 基础用法

```vue
<template>
  <FaceSlideField
    v-model="sliderValue"
    label="数量选择"
    :min="0"
    :max="20"
    :step="5"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceSlideField } from 'qinglu-vant'

const sliderValue = ref(10)
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 当前值 | Number | 0 |
| min | 最小值 | Number | 0 |
| max | 最大值 | Number | 20 |
| step | 步长 | Number | 5 |
| label | 字段标签 | String | - |
| disabled | 是否禁用 | Boolean | false |
| readonly | 是否只读 | Boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | value: 当前值 |

## 示例

### 基础滑动选择

```vue
<template>
  <van-cell-group>
    <FaceSlideField
      v-model="basicValue"
      label="基础滑动"
      :min="0"
      :max="100"
      :step="10"
    />

    <van-cell title="当前值">
      <template #value>
        <span>{{ basicValue }}</span>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const basicValue = ref(30)
</script>
```

### 自定义范围和步长

```vue
<template>
  <div class="custom-range-demo">
    <van-cell-group>
      <FaceSlideField
        v-model="customValue"
        label="自定义范围"
        :min="minValue"
        :max="maxValue"
        :step="stepValue"
      />
    </van-cell-group>

    <div class="control-panel">
      <van-cell-group>
        <van-field
          v-model="minValue"
          label="最小值"
          type="digit"
        />
        <van-field
          v-model="maxValue"
          label="最大值"
          type="digit"
        />
        <van-field
          v-model="stepValue"
          label="步长"
          type="digit"
        />
      </van-cell-group>

      <div class="result">
        <p>当前值: {{ customValue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const customValue = ref(50)
const minValue = ref(0)
const maxValue = ref(100)
const stepValue = ref(10)

// 确保值在有效范围内
watch([minValue, maxValue, stepValue], () => {
  const min = Number(minValue.value)
  const max = Number(maxValue.value)
  const step = Number(stepValue.value)

  // 确保当前值在范围内
  if (customValue.value < min) {
    customValue.value = min
  } else if (customValue.value > max) {
    customValue.value = max
  }
})
</script>

<style scoped>
.custom-range-demo {
  padding: 16px;
}

.control-panel {
  margin-top: 24px;
}

.result {
  margin-top: 16px;
  padding: 16px;
  background: #f7f8fa;
  border-radius: 8px;
}
</style>
```

### 价格范围选择

```vue
<template>
  <div class="price-range-demo">
    <van-cell-group>
      <van-cell title="价格范围">
        <template #value>
          <span>¥{{ priceValue }}</span>
        </template>
      </van-cell>

      <FaceSlideField
        v-model="priceValue"
        :min="100"
        :max="1000"
        :step="100"
      />
    </van-cell-group>

    <div class="price-options">
      <van-button
        v-for="price in priceOptions"
        :key="price"
        size="small"
        :type="priceValue === price ? 'primary' : 'default'"
        @click="priceValue = price"
      >
        ¥{{ price }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const priceValue = ref(300)
const priceOptions = computed(() => {
  return [100, 300, 500, 800, 1000]
})
</script>

<style scoped>
.price-range-demo {
  padding: 16px;
}

.price-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}
</style>
```

### 数量选择器

```vue
<template>
  <div class="quantity-selector">
    <van-cell-group>
      <van-cell title="商品数量">
        <template #value>
          <div class="quantity-display">
            <span>{{ quantityValue }}件</span>
            <van-stepper
              v-model="quantityValue"
              :min="0"
              :max="20"
              :step="1"
              button-size="22px"
            />
          </div>
        </template>
      </van-cell>

      <FaceSlideField
        v-model="quantityValue"
        :min="0"
        :max="20"
        :step="1"
      />
    </van-cell-group>

    <div class="quantity-summary">
      <p>已选择: {{ quantityValue }}件</p>
      <p>总价: ¥{{ totalPrice }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const quantityValue = ref(1)
const unitPrice = 99.9

const totalPrice = computed(() => {
  return (quantityValue.value * unitPrice).toFixed(2)
})
</script>

<style scoped>
.quantity-selector {
  padding: 16px;
}

.quantity-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-summary {
  margin-top: 16px;
  padding: 16px;
  background: #f7f8fa;
  border-radius: 8px;
}
</style>
```

### 表单集成

```vue
<template>
  <van-form @submit="onSubmit">
    <van-cell-group>
      <van-field
        v-model="formData.name"
        label="商品名称"
        placeholder="请输入商品名称"
        :rules="[{ required: true, message: '请填写商品名称' }]"
      />

      <van-field
        v-model="formData.price"
        label="商品价格"
        placeholder="请输入商品价格"
        type="digit"
        :rules="[{ required: true, message: '请填写商品价格' }]"
      />

      <van-cell title="库存数量">
        <template #value>
          <span>{{ formData.stock }}</span>
        </template>
      </van-cell>

      <FaceSlideField
        v-model="formData.stock"
        :min="0"
        :max="100"
        :step="5"
        :rules="[{ required: true, message: '请设置库存数量' }]"
      />

      <van-cell title="折扣比例">
        <template #value>
          <span>{{ formData.discount }}%</span>
        </template>
      </van-cell>

      <FaceSlideField
        v-model="formData.discount"
        :min="0"
        :max="100"
        :step="10"
      />
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
  name: '',
  price: '',
  stock: 50,
  discount: 100
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

- 📏 **刻度尺显示**: 带有刻度尺的滑动选择器，直观显示数值
- 🎯 **高精度控制**: 支持自定义最小值、最大值和步长
- 🎨 **视觉反馈**: 已选择区域高亮显示，提供直观的视觉反馈
- 📱 **移动端优化**: 适合移动端触控操作的滑块大小和间距
- 🔧 **表单集成**: 完全兼容van-form的验证和提交机制
- ⚡ **实时更新**: 滑动时实时更新数值
- 🎪 **自定义样式**: 基于van-slider的自定义样式

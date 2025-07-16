# FaceStoreField

门店字段组件，用于选择取车或还车门店，支持搜索和历史记录功能。

## 基础用法

```vue
<template>
  <FaceStoreField
    v-model="selectedStore"
    biz-type="pickup"
    label="取车门店"
    placeholder="请选择取车门店"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceStoreField } from 'qinglu-vant'

const selectedStore = ref(null)
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定的门店对象 | Array \| Object \| String | - |
| bizType | 业务类型 | String | - |
| isKCST | 是否为KCST模式 | Boolean | false |
| storeObj | 门店对象 | Object | - |
| label | 字段标签 | String | - |
| placeholder | 占位符文本 | String | - |
| disabled | 是否禁用 | Boolean | false |

#### bizType 可选值

| 值 | 说明 |
|---|------|
| pickup | 取车门店 |
| return | 还车门店 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选择门店时触发 | store: 门店对象 |

## 示例

### 取车门店选择

```vue
<template>
  <van-cell-group>
    <FaceStoreField
      v-model="pickupStore"
      biz-type="pickup"
      label="取车门店"
      placeholder="请选择取车门店"
      @update:model-value="handlePickupStoreChange"
    />
  </van-cell-group>

  <div class="store-info" v-if="pickupStore">
    <h3>已选门店信息</h3>
    <van-cell-group>
      <van-cell title="门店名称" :value="pickupStore.storeName" />
      <van-cell title="门店地址" :value="pickupStore.address" />
      <van-cell title="联系电话" :value="pickupStore.phone" />
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pickupStore = ref(null)

const handlePickupStoreChange = (store) => {
  console.log('选择的取车门店:', store)
}
</script>

<style scoped>
.store-info {
  margin-top: 16px;
  padding: 16px;
}

.store-info h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #323233;
}
</style>
```

### 取车和还车门店

```vue
<template>
  <div class="store-selection">
    <van-cell-group>
      <FaceStoreField
        v-model="pickupStore"
        biz-type="pickup"
        label="取车门店"
        placeholder="请选择取车门店"
        @update:model-value="handlePickupStoreChange"
      />

      <FaceStoreField
        v-model="returnStore"
        biz-type="return"
        label="还车门店"
        placeholder="请选择还车门店"
        @update:model-value="handleReturnStoreChange"
      />
    </van-cell-group>

    <div class="store-summary" v-if="pickupStore || returnStore">
      <h3>门店信息</h3>

      <div v-if="pickupStore" class="store-card">
        <div class="store-type">取车门店</div>
        <div class="store-name">{{ pickupStore.storeName }}</div>
        <div class="store-address">{{ pickupStore.address }}</div>
        <div class="store-phone">{{ pickupStore.phone }}</div>
      </div>

      <div v-if="returnStore" class="store-card">
        <div class="store-type">还车门店</div>
        <div class="store-name">{{ returnStore.storeName }}</div>
        <div class="store-address">{{ returnStore.address }}</div>
        <div class="store-phone">{{ returnStore.phone }}</div>
      </div>

      <div v-if="pickupStore && returnStore && pickupStore.id !== returnStore.id" class="different-store-notice">
        <van-icon name="info-o" />
        <span>您选择了异地还车，可能产生额外费用</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pickupStore = ref(null)
const returnStore = ref(null)

const handlePickupStoreChange = (store) => {
  console.log('选择的取车门店:', store)

  // 可选：自动设置相同的还车门店
  if (!returnStore.value) {
    returnStore.value = store
  }
}

const handleReturnStoreChange = (store) => {
  console.log('选择的还车门店:', store)
}
</script>

<style scoped>
.store-selection {
  padding: 16px;
}

.store-summary {
  margin-top: 24px;
}

.store-summary h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #323233;
}

.store-card {
  padding: 16px;
  margin-bottom: 16px;
  background: #f7f8fa;
  border-radius: 8px;
}

.store-type {
  font-size: 14px;
  color: #1989fa;
  margin-bottom: 8px;
}

.store-name {
  font-size: 16px;
  font-weight: 500;
  color: #323233;
  margin-bottom: 8px;
}

.store-address, .store-phone {
  font-size: 14px;
  color: #646566;
  margin-bottom: 4px;
}

.different-store-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #fff7e8;
  color: #ff976a;
  border-radius: 8px;
  margin-top: 16px;
}
</style>
```

### KCST模式

```vue
<template>
  <div class="kcst-demo">
    <van-cell-group>
      <van-cell title="KCST模式">
        <template #right-icon>
          <van-switch v-model="kcstMode" size="24" />
        </template>
      </van-cell>

      <FaceStoreField
        v-model="kcstStore"
        biz-type="pickup"
        :is-k-c-s-t="kcstMode"
        label="门店选择"
        placeholder="请选择门店"
      />
    </van-cell-group>

    <div class="mode-description">
      <p v-if="kcstMode">
        <van-tag type="primary">KCST模式</van-tag>
        客户到店取车，服务人员送回车辆
      </p>
      <p v-else>
        <van-tag type="success">标准模式</van-tag>
        正常门店取还车流程
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const kcstMode = ref(false)
const kcstStore = ref(null)
</script>

<style scoped>
.kcst-demo {
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
        label="客户姓名"
        placeholder="请输入客户姓名"
        :rules="[{ required: true, message: '请填写客户姓名' }]"
      />

      <van-field
        v-model="formData.phone"
        label="联系电话"
        placeholder="请输入联系电话"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      />

      <FaceStoreField
        v-model="formData.pickupStore"
        biz-type="pickup"
        label="取车门店"
        placeholder="请选择取车门店"
        :rules="[{ required: true, message: '请选择取车门店' }]"
      />

      <FaceStoreField
        v-model="formData.returnStore"
        biz-type="return"
        label="还车门店"
        placeholder="请选择还车门店"
        :rules="[{ required: true, message: '请选择还车门店' }]"
      />
    </van-cell-group>

    <div class="submit-area">
      <van-button type="primary" native-type="submit" block>
        提交订单
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const formData = ref({
  name: '',
  phone: '',
  pickupStore: null,
  returnStore: null
})

const onSubmit = (values) => {
  console.log('表单提交:', formData.value)
  Toast.success('订单提交成功')
}
</script>

<style scoped>
.submit-area {
  padding: 16px;
}
</style>
```

## 特性

- 🔍 **门店搜索**: 支持按名称搜索门店
- 📜 **历史记录**: 自动记录搜索历史，方便快速选择
- 🎯 **业务区分**: 支持取车和还车两种业务类型
- 🚗 **KCST模式**: 支持KCST（客户到店取车）特殊模式
- 📱 **移动端优化**: 底部弹出的搜索选择器，适合移动端操作
- 🔧 **表单集成**: 完全兼容van-form的验证和提交机制
- 🎨 **自定义显示**: 支持自定义门店信息显示

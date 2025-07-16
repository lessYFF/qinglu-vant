# FaceVehicleAppearance

车辆外观组件，用于展示和选择车辆外观损伤部位。

## 基础用法

```vue
<template>
  <FaceVehicleAppearance
    :list="appearanceList"
    @change="handleAppearanceChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceVehicleAppearance } from 'qinglu-vant'

// 车辆外观数据
const appearanceList = ref([
  { appearanceNo: 1, appearanceName: '左前叶子板', damaged: false },
  { appearanceNo: 2, appearanceName: '前保', damaged: false },
  { appearanceNo: 3, appearanceName: '右前叶子板', damaged: false },
  { appearanceNo: 4, appearanceName: '左前轮', damaged: true },
  { appearanceNo: 5, appearanceName: '前机盖及前挡风', damaged: false },
  { appearanceNo: 6, appearanceName: '右前轮', damaged: false },
  // ... 其他部位
])

const handleAppearanceChange = (position) => {
  // 切换指定位置的损伤状态
  const item = appearanceList.value.find(v => v.appearanceNo === position)
  if (item) {
    item.damaged = !item.damaged
    console.log(`位置 ${position} 损伤状态变更为: ${item.damaged}`)
  }
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| list | 车辆外观部位列表 | Array | - |

#### list 数组项结构

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| appearanceNo | 外观部位编号 | Number | 是 |
| appearanceName | 外观部位名称 | String | 是 |
| damaged | 是否有损伤 | Boolean | 是 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 点击部位时触发 | position: 部位编号 |

## 示例

### 完整示例

```vue
<template>
  <div class="vehicle-check">
    <h3>车辆外观检查</h3>
    <p class="tip">点击有损伤的部位进行标记</p>

    <FaceVehicleAppearance
      :list="damageList"
      @change="toggleDamage"
    />

    <div class="damage-summary">
      <h4>损伤部位汇总</h4>
      <van-tag
        v-for="item in damagedParts"
        :key="item.appearanceNo"
        type="danger"
        class="damage-tag"
      >
        {{ item.appearanceName }}
      </van-tag>
      <p v-if="!damagedParts.length" class="no-damage">暂无损伤部位</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FaceVehicleAppearance } from 'qinglu-vant'

// 初始化所有部位数据
const damageList = ref([
  { appearanceNo: 1, appearanceName: '左前叶子板', damaged: false },
  { appearanceNo: 2, appearanceName: '前保', damaged: false },
  { appearanceNo: 3, appearanceName: '右前叶子板', damaged: false },
  { appearanceNo: 4, appearanceName: '左前轮', damaged: false },
  { appearanceNo: 5, appearanceName: '前机盖及前挡风', damaged: false },
  { appearanceNo: 6, appearanceName: '右前轮', damaged: false },
  { appearanceNo: 7, appearanceName: '左前门', damaged: false },
  { appearanceNo: 8, appearanceName: '车顶', damaged: false },
  { appearanceNo: 9, appearanceName: '右前门', damaged: false },
  { appearanceNo: 10, appearanceName: '左后门', damaged: false },
  { appearanceNo: 11, appearanceName: '后挡风', damaged: false },
  { appearanceNo: 12, appearanceName: '右后门', damaged: false },
  { appearanceNo: 13, appearanceName: '左后叶子板', damaged: false },
  { appearanceNo: 14, appearanceName: '后备箱', damaged: false },
  { appearanceNo: 15, appearanceName: '右后叶子板', damaged: false },
  { appearanceNo: 16, appearanceName: '左后轮', damaged: false },
  { appearanceNo: 17, appearanceName: '后保', damaged: false },
  { appearanceNo: 18, appearanceName: '右后轮', damaged: false }
])

// 计算已标记损伤的部位
const damagedParts = computed(() => {
  return damageList.value.filter(item => item.damaged)
})

// 切换损伤状态
const toggleDamage = (position) => {
  const item = damageList.value.find(v => v.appearanceNo === position)
  if (item) {
    item.damaged = !item.damaged
  }
}

// 提交损伤信息
const submitDamage = () => {
  const damaged = damagedParts.value.map(item => item.appearanceNo)
  console.log('提交损伤部位:', damaged)
  // 调用API保存损伤信息
}
</script>

<style scoped>
.vehicle-check {
  padding: 16px;
}

.tip {
  color: #999;
  font-size: 14px;
  margin-bottom: 16px;
}

.damage-summary {
  margin-top: 24px;
}

.damage-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

.no-damage {
  color: #999;
  font-size: 14px;
}
</style>
```

### 预设损伤部位

```vue
<template>
  <FaceVehicleAppearance
    :list="presetDamageList"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

// 预设部分损伤
const presetDamageList = ref([
  { appearanceNo: 1, appearanceName: '左前叶子板', damaged: true },
  { appearanceNo: 2, appearanceName: '前保', damaged: true },
  { appearanceNo: 3, appearanceName: '右前叶子板', damaged: false },
  { appearanceNo: 4, appearanceName: '左前轮', damaged: false },
  { appearanceNo: 5, appearanceName: '前机盖及前挡风', damaged: false },
  { appearanceNo: 6, appearanceName: '右前轮', damaged: false },
  // ... 其他部位
])

const handleChange = (position) => {
  console.log('点击部位:', position)
}
</script>
```

## 特性

- 🚗 **直观展示**: 以网格布局直观展示车辆各个部位
- 🎯 **交互友好**: 点击即可标记/取消标记损伤部位
- 🎨 **视觉反馈**: 损伤部位高亮显示，提供明确的视觉区分
- 📱 **移动端优化**: 适合在移动设备上快速检查和标记
- 🔄 **状态管理**: 自动跟踪和管理所有部位的损伤状态
- 🚀 **易于集成**: 简单的API设计，易于集成到车辆检查流程中

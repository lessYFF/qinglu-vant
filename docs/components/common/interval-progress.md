# FaceIntervalProgress

间隔进度条组件，用于显示油量或电量的可视化进度条。

## 基础用法

```vue
<template>
  <FaceIntervalProgress
    :oil-electricity="75"
    :is-oil-electricity="1"
  />
</template>

<script setup>
import { FaceIntervalProgress } from 'qinglu-vant'
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| OilElectricity | 电量百分比 | Number | - |
| isOilElectricity | 类型标识 | Number | - |
| OilLiter | 油量升数 | Number | - |

#### isOilElectricity 说明

| 值 | 说明 | 颜色 | 单位 |
|---|------|------|------|
| 0 | 油量模式 | 橙色 (#FF9900) | L (升) |
| 1 | 电量模式 | 绿色 (#03B915) | % (百分比) |

### Methods

通过ref可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| resetProgress | 重置进度条 | - |
| startProgressAnimation | 启动进度动画 | - |

## 示例

### 电量显示

```vue
<template>
  <div class="battery-demo">
    <h3>电动车电量</h3>
    <FaceIntervalProgress
      :oil-electricity="batteryLevel"
      :is-oil-electricity="1"
    />

    <van-slider
      v-model="batteryLevel"
      :min="0"
      :max="100"
      :step="5"
      style="margin-top: 20px;"
    />
    <p>当前电量: {{ batteryLevel }}%</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const batteryLevel = ref(85)
</script>
```

### 油量显示

```vue
<template>
  <div class="fuel-demo">
    <h3>燃油车油量</h3>
    <FaceIntervalProgress
      :oil-electricity="fuelPercentage"
      :oil-liter="fuelLiter"
      :is-oil-electricity="0"
    />

    <van-slider
      v-model="fuelLiter"
      :min="0"
      :max="60"
      :step="1"
      style="margin-top: 20px;"
    />
    <p>当前油量: {{ fuelLiter }}L ({{ fuelPercentage }}%)</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const fuelLiter = ref(45)
const fuelPercentage = computed(() => {
  return Math.round((fuelLiter.value / 60) * 100)
})
</script>
```

### 动态切换类型

```vue
<template>
  <div class="dynamic-demo">
    <van-radio-group v-model="vehicleType" direction="horizontal">
      <van-radio :name="0">燃油车</van-radio>
      <van-radio :name="1">电动车</van-radio>
    </van-radio-group>

    <div style="margin: 20px 0;">
      <FaceIntervalProgress
        :oil-electricity="currentValue"
        :oil-liter="vehicleType === 0 ? currentValue : undefined"
        :is-oil-electricity="vehicleType"
      />
    </div>

    <van-slider
      v-model="currentValue"
      :min="0"
      :max="vehicleType === 0 ? 60 : 100"
      :step="vehicleType === 0 ? 1 : 5"
    />

    <p>
      当前{{ vehicleType === 0 ? '油量' : '电量' }}:
      {{ currentValue }}{{ vehicleType === 0 ? 'L' : '%' }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const vehicleType = ref(1) // 0: 油车, 1: 电车
const currentValue = ref(75)

// 切换车辆类型时重置数值
watch(vehicleType, (newType) => {
  currentValue.value = newType === 0 ? 45 : 75
})
</script>
```

### 低电量/油量警告

```vue
<template>
  <div class="warning-demo">
    <div class="status-info">
      <van-tag :type="statusType" size="large">
        {{ statusText }}
      </van-tag>
    </div>

    <FaceIntervalProgress
      ref="progressRef"
      :oil-electricity="warningValue"
      :oil-liter="isOil ? warningValue : undefined"
      :is-oil-electricity="isOil ? 0 : 1"
    />

    <div class="controls">
      <van-button @click="simulateLowLevel" type="warning" size="small">
        模拟低电量/油量
      </van-button>
      <van-button @click="simulateNormalLevel" type="primary" size="small">
        恢复正常
      </van-button>
      <van-button @click="resetAnimation" size="small">
        重置动画
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const progressRef = ref(null)
const warningValue = ref(75)
const isOil = ref(false)

const statusType = computed(() => {
  if (warningValue.value <= 20) return 'danger'
  if (warningValue.value <= 40) return 'warning'
  return 'success'
})

const statusText = computed(() => {
  const unit = isOil.value ? 'L' : '%'
  if (warningValue.value <= 20) return `电量/油量不足 ${warningValue.value}${unit}`
  if (warningValue.value <= 40) return `电量/油量偏低 ${warningValue.value}${unit}`
  return `电量/油量正常 ${warningValue.value}${unit}`
})

const simulateLowLevel = () => {
  warningValue.value = 15
}

const simulateNormalLevel = () => {
  warningValue.value = 80
}

const resetAnimation = () => {
  progressRef.value?.resetProgress()
  setTimeout(() => {
    progressRef.value?.startProgressAnimation()
  }, 100)
}
</script>

<style scoped>
.warning-demo {
  padding: 16px;
}

.status-info {
  text-align: center;
  margin-bottom: 16px;
}

.controls {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}

.controls .van-button {
  flex: 1;
}
</style>
```

### 车辆仪表盘

```vue
<template>
  <div class="dashboard-demo">
    <div class="vehicle-info">
      <h3>{{ vehicleInfo.name }}</h3>
      <p>车牌号: {{ vehicleInfo.plateNumber }}</p>
    </div>

    <div class="fuel-electric-display">
      <FaceIntervalProgress
        :oil-electricity="vehicleInfo.fuelLevel"
        :oil-liter="vehicleInfo.fuelLiter"
        :is-oil-electricity="vehicleInfo.type"
      />
    </div>

    <div class="vehicle-stats">
      <van-grid :column-num="2" :border="false">
        <van-grid-item>
          <div class="stat-item">
            <div class="stat-value">{{ vehicleInfo.mileage }}</div>
            <div class="stat-label">总里程(km)</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="stat-item">
            <div class="stat-value">{{ vehicleInfo.range }}</div>
            <div class="stat-label">续航(km)</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const vehicleInfo = ref({
  name: '特斯拉 Model 3',
  plateNumber: '京A12345',
  type: 1, // 电动车
  fuelLevel: 68,
  fuelLiter: null,
  mileage: 25680,
  range: 420
})
</script>

<style scoped>
.dashboard-demo {
  padding: 16px;
  background: #f7f8fa;
  border-radius: 8px;
}

.vehicle-info {
  text-align: center;
  margin-bottom: 20px;
}

.vehicle-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.vehicle-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.fuel-electric-display {
  margin: 20px 0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #323233;
}

.stat-label {
  font-size: 12px;
  color: #969799;
  margin-top: 4px;
}
</style>
```

## 特性

- ⚡ **双模式支持**: 支持油量和电量两种显示模式
- 🎨 **颜色区分**: 油量橙色、电量绿色，直观区分
- 📊 **分段显示**: 10段式进度条，清晰显示当前水平
- 🎬 **动画效果**: 支持进度条动画，从0开始填充到目标值
- 🔄 **自动重置**: 数值变化时自动重新播放动画
- 📱 **移动端优化**: 适合移动端车辆仪表盘显示
- 🎯 **方法暴露**: 提供重置和启动动画的方法供外部调用

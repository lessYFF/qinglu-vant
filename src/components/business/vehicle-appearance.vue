<script setup>
const props = defineProps({
  list: {
    type: Array
  }
})

const emits = defineEmits(['change'])

const handleToggleAppearanceDamage = (position) => {
  emits('change', position)
}

const calcSelected = position => {
  if (!props?.list?.length) return 0
  const item = props.list?.find(v => v.appearanceNo === position)
  return item.damaged
}

</script>

<template>
  <div class="vehicle-appearance-wrapper">
    <div class="vehicle-appearance-row flex-row">
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(1) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(1)"
      >左前叶子板</div>
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(2) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(2)"
      >前保</div>
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(3) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(3)"
      >右前叶子板</div>
    </div>
    <div class="vehicle-appearance-row flex-row">
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(4) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(4)"
      >左前轮</div>
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(5) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(5)"
      >前机盖及前挡风</div>
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(6) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(6)"
      >右前轮</div>
    </div>
    <div class="vehicle-appearance-row flex-row">
      <div class="vehicle-appearance-item-group flex-column flex-1">
        <div
          :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(7) ? 'active' : ''}`"
          v-on:click="handleToggleAppearanceDamage(7)"
        >左后视镜</div>
        <div
          :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(8) ? 'active' : ''}`"
          v-on:click="handleToggleAppearanceDamage(8)"
        >左前门</div>
        <div
          :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(9) ? 'active' : ''}`"
          v-on:click="handleToggleAppearanceDamage(9)"
        >左后门</div>
      </div>
      <div
        :class="`vehicle-appearance-item flex-1 text-center relative ${calcSelected(10) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(10)"
      >
        <span class="absolute absolute-center">车顶</span>
      </div>
      <div class="vehicle-appearance-item-group flex-column flex-1">
        <div
          :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(11) ? 'active' : ''}`"
          v-on:click="handleToggleAppearanceDamage(11)"
        >右后视镜</div>
        <div
          :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(12) ? 'active' : ''}`"
          v-on:click="handleToggleAppearanceDamage(12)"
        >右前门</div>
        <div
          :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(13) ? 'active' : ''}`"
          v-on:click="handleToggleAppearanceDamage(13)"
        >右后门</div>
      </div>
    </div>
    <div class="vehicle-appearance-row flex-row">
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(14) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(14)"
      >左后轮</div>
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(15) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(15)"
      >后机盖及后挡风</div>
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(16) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(16)"
      >右后轮</div>
    </div>
    <div class="vehicle-appearance-row flex-row">
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(17) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(17)"
      >左后叶子板</div>
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(18) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(18)"
      >后保</div>
      <div
        :class="`vehicle-appearance-item flex-1 text-center ${calcSelected(19) ? 'active' : ''}`"
        v-on:click="handleToggleAppearanceDamage(19)"
      >右后叶子板</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.vehicle-appearance-wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  margin: 12px;

  .vehicle-appearance-row {
    display: flex;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }

    .vehicle-appearance-item-group {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 8px;
    }

    .vehicle-appearance-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 8px;
      margin: 0 4px;
      border: 1px solid #d0d0d0;
      background: #fff;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      transition: all 0.3s ease;
      min-height: 48px;
      box-sizing: border-box;

      &.active {
        color: #fff;
        background: #4A90E2;
        border: 1px solid #4A90E2;
      }

      &:hover {
        border-color: #4A90E2;
      }
    }
  }

  // 中间行特殊样式（包含车顶）
  .vehicle-appearance-row:nth-child(3) {
    .vehicle-appearance-item-group {
      .vehicle-appearance-item {
        height: 48px;
      }
    }

    // 车顶区域
    .vehicle-appearance-item:nth-child(2) {
      position: relative;

      .absolute {
        position: absolute;
      }

      .absolute-center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

// 工具类
.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-1 {
  flex: 1;
}

.text-center {
  text-align: center;
}

.relative {
  position: relative;
}
</style>

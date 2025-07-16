<script setup>
import { computed, reactive, ref, toRaw } from "vue";
import { FaceUploadField } from "..";
import { Figure } from "../../utils";

const props = defineProps({
  payStatus: {
    type: Number
  },
  payStatusName: {
    type: String
  },
  rentDepositAmount: {
    type: String,
    default: '0.00'
  },
  deductionMethod: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['change'])
const isOpen = ref(false)
const formState = reactive({
  repairFee: '',
  outageFee: '',
  depreciationFee: '',
  medias: []
})
const amountFee = computed(() => {
  const { repairFee, outageFee, depreciationFee } = formState
  const value = (Number(repairFee) + Number(outageFee) + Number(depreciationFee)) * 100

  return Figure.toYuan(value)
})
const EventHandler = {
  onHandelChange(key, value) {
    formState[key] = value
    emits('change', toRaw(formState))
  },

  onHandleChangeMedias(value) {
    formState.medias = value
    emits('change', toRaw(formState))
  }
}
</script>

<template>
  <div class="bg-pure font-md color-base van-safe-area">
    <header class="panel-header mt-sm flex justify-space-between items-center">
      <span>租车押金</span>
      <van-tag v-if="(props.payStatus !== 0)" plain type="success" class="font-sm">{{ props.payStatusName }}</van-tag>
      <van-tag v-else plain type="danger" class="font-sm">{{ props.payStatusName }}</van-tag>
    </header>
    <main class="deposit-main">
      <div class="deposit-row">
        <span class="deposit-label">租车押金</span>
        <span class="deposit-amount">¥{{ props.rentDepositAmount }}</span>
      </div>
      <div v-if="props.rentDepositAmount !== '0.00'" class="deposit-row">
        <span class="deposit-label">扣除押金</span>
        <van-switch v-model="isOpen" :disabled="props.disabled" size="16px" />
      </div>
      <div v-if="isOpen" class="deduction-details">
        <div class="detail-row">
          <span class="detail-label">
            <span class="required-star">*</span>维修费
          </span>
          <div class="detail-input">
            <input
              v-model="formState.repairFee"
              type="number"
              placeholder="0"
              class="input-field"
              @input="(e) => EventHandler.onHandelChange('repairFee', e.target.value)"
            />
            <span class="unit">元</span>
          </div>
        </div>

        <div class="detail-row">
          <span class="detail-label">
            <span class="required-star">*</span>折旧费
          </span>
          <div class="detail-input">
            <input
              v-model="formState.depreciationFee"
              type="number"
              placeholder="0"
              class="input-field"
              @input="(e) => EventHandler.onHandelChange('depreciationFee', e.target.value)"
            />
            <span class="unit">元</span>
          </div>
        </div>

        <div class="detail-row">
          <span class="detail-label">
            <span class="required-star">*</span>停运费
          </span>
          <div class="detail-input">
            <input
              v-model="formState.outageFee"
              type="number"
              placeholder="0"
              class="input-field"
              @input="(e) => EventHandler.onHandelChange('outageFee', e.target.value)"
            />
            <span class="unit">元</span>
          </div>
        </div>

        <div class="total-row">
          <span>总计：</span>
          <span class="total-amount">￥{{ amountFee }}</span>
        </div>

        <div class="upload-notice">
          当车辆产生维修费用时需要上传对应的车损图片
        </div>

        <div class="upload-section">
          <div class="upload-label">
            <span class="required-star">*</span>车损图片凭证（{{ formState.medias.length }}/20）
          </div>
          <face-upload-field :model-value="formState.medias" :max-count="20" @update:model-value="EventHandler.onHandleChangeMedias"></face-upload-field>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="less" scoped>
.van-safe-area{
  width: 100%;
}
.panel-header {
  padding: 12px 16px;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.bg-pure {
  background: #fff;
  border-radius: 8px;
  margin: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

// 主要内容区域
.deposit-main {
  padding: 0;
}

// 押金行样式
.deposit-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
}

.deposit-label {
  color: #333;
  font-size: 14px;
}

.deposit-amount {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

// 扣除详情区域
.deduction-details {
  background: #fff;
  border-top: 1px solid #f5f5f5;
}

// 每一行的样式
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f5f5f5;

  &:last-of-type {
    border-bottom: none;
  }
}

// 左侧标签
.detail-label {
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
}

// 必填星号
.required-star {
  color: #ff4444;
  margin-right: 4px;
  font-size: 14px;
}

// 右侧输入区域
.detail-input {
  display: flex;
  align-items: center;
  gap: 4px;
}

// 输入框
.input-field {
  border: none;
  outline: none;
  text-align: right;
  font-size: 14px;
  color: #333;
  background: transparent;
  width: 60px;
  padding: 0;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    color: #333;
  }
}

// 单位
.unit {
  font-size: 14px;
  color: #666;
  margin-left: 4px;
}

// 总计行
.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  font-size: 14px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.total-amount {
  font-weight: bold;
  color: #333;
}

// 上传提示
.upload-notice {
  font-size: 12px;
  color: #999;
  padding: 12px 16px;
  line-height: 1.4;
  background: #fff;
}

// 上传区域
.upload-section {
  padding: 12px 16px;
  background: #fff;
}

.upload-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

:deep(.van-switch) {
  transform: scale(0.8);
}
</style>

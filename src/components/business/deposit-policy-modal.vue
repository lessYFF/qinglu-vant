<script setup>
import { computed, ref, watch } from "vue";
import { FacePageLoading } from "..";
import OrderEntity from "../../services/entities/OrderEntity";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  orderId: {
    type: [Number, String]
  }
})

const emits = defineEmits(['update:show', 'close'])

const needUpdate = computed(() => props.orderId && props.show)
const depositDetail = ref(OrderEntity.getDepositPolicyModel())
const loading = ref(false)

watch(needUpdate, () => {
  if (needUpdate.value) {
    loading.value = true
    OrderEntity.getDepositPolicyDetail({ orderId: props.orderId })
      .then((data) => {
        depositDetail.value = data
        loading.value = false
      })
      .catch((error) => {
        console.error(error)
        loading.value = false
      })
  }
}, { immediate: true })
</script>

<template>
  <van-popup
    :show="props.show"
    class="popup-container"
    position="bottom"
    round
    closeable
    safe-area-inset-bottom
    @update:show="(value) => emits('update:show', value)"
  >
    <header class="popup-header">押金政策</header>
    <main class="popup-body">
      <face-page-loading :loading="loading">
        <div class="my-xs">
          <template v-if="!depositDetail.freeDeposit">
            <span class="font-md font-bold">未免押</span>
          </template>
          <template v-else>
            <template v-if="depositDetail.freeDepositWay === 0">
              <span class="mr-xs font-md font-bold">到店支付押金</span>
            </template>
            <template v-else>
              <span class="mr-xs font-md font-bold">已享免押</span>
              <template v-if="depositDetail.freeDepositWay != null">
                <van-tag v-if="depositDetail.freeDepositWay === 1" type="success" plain>{{ depositDetail.freeDepositWayStr }}</van-tag>
                <van-tag v-else type="primary" plain>{{ depositDetail.freeDepositWayStr }}</van-tag>
              </template>
            </template>
          </template>
        </div>
        <table class="table" border="1">
          <tbody>
            <tr>
              <td class="nowrap">租车押金</td>
              <td>
                <div>
                  <span class="pr-base">￥{{ depositDetail.rentDepositAmountStr }}</span>
                  <van-tag>可退</van-tag>
                </div>
                <div>取车时冻结，若无车损，还车时解冻</div>
              </td>
            </tr>
            <tr>
              <td class="nowrap">违章押金</td>
              <td>
                <div>
                  <span class="pr-base">￥{{ depositDetail.illegalDepositAmountStr }}</span>
                  <van-tag>可退</van-tag>
                </div>
                <div>还车时冻结，若无违章，银行会在还车后30天左右退还押金</div>
              </td>
            </tr>
            <tr>
              <td class="nowrap">支付方式</td>
              <td>信用卡、支付宝、微信</td>
            </tr>
          </tbody>
        </table>
      </face-page-loading>
    </main>
  </van-popup>
</template>

<style scoped>
/* 弹窗容器样式 */
.popup-container {
  background: #fff;
  border-radius: 16px 16px 0 0;
  max-height: 80vh;
  overflow: hidden;
}

/* 头部样式 */
.popup-header {
  position: relative;
  padding: 16px 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #323233;
  background: #fff;
  border-bottom: 1px solid #f7f8fa;
}

/* 右上角关闭按钮样式 */
:deep(.van-popup__close-icon) {
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 18px;
  color: #c8c9cc;
}

:deep(.van-popup__close-icon:hover) {
  color: #969799;
}

/* 内容区域样式 */
.popup-body {
  padding: 0;
  max-height: 60vh;
  overflow-y: auto;
}

/* 免押状态样式 */
.my-xs {
  padding: 20px 20px 16px 20px;
  margin: 0;
}

.font-md.font-bold {
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #323233 !important;
}

/* 表格样式重写 */
.table {
  width: 100%;
  border-collapse: collapse;
  border: none;
  background: #fff;
}

.table tbody tr {
  border-bottom: 1px solid #f7f8fa;
}

.table tbody tr:last-child {
  border-bottom: none;
}

.table td {
  padding: 16px 20px;
  border: none;
  vertical-align: top;
  line-height: 1.4;
}

.table td.nowrap {
  font-size: 14px;
  color: #323233;
  white-space: nowrap;
  width: 80px;
  min-width: 80px;
}

.table td:last-child {
  width: auto;
}

/* 金额和标签行样式 */
.table td > div:first-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.pr-base {
  font-size: 14px !important;
  color: #323233 !important;
  font-weight: 400 !important;
  padding-right: 0 !important;
}

/* 描述文字样式 */
.table td > div:last-child {
  font-size: 12px;
  color: #969799;
  line-height: 1.5;
  margin-top: 4px;
}

/* 支付方式单独样式 */
.table tr:last-child td:last-child {
  font-size: 14px;
  color: #323233;
  padding-top: 16px;
  padding-bottom: 20px;
}

/* 标签样式 */
:deep(.van-tag) {
  border-radius: 2px;
  font-size: 10px;
  padding: 1px 4px;
  height: 16px;
  line-height: 14px;
  border: none;
  background: #e8f4fd;
  color: #1989fa;
  margin-left: 8px;
}

/* 加载组件样式 */
:deep(.face-page-loading) {
  min-height: 200px;
}

/* 滚动条样式 */
.popup-body::-webkit-scrollbar {
  width: 4px;
}

.popup-body::-webkit-scrollbar-track {
  background: #f7f8fa;
  border-radius: 2px;
}

.popup-body::-webkit-scrollbar-thumb {
  background: #c8c9cc;
  border-radius: 2px;
}

.popup-body::-webkit-scrollbar-thumb:hover {
  background: #969799;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .popup-header {
    padding: 14px 16px;
    font-size: 15px;
  }

  .table td {
    padding: 14px 16px;
  }

  .my-xs {
    padding: 16px 16px 14px 16px;
  }
}
</style>

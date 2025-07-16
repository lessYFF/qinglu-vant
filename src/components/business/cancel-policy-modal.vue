<!--
 * @Author: duhuo
 * @Date: 2022-11-12 14:42:43
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-12 15:16:48
 * @Description: Do not edit
-->
<script setup>
import { computed, ref, watch } from "vue";
import { FacePageLoading } from "..";
import OrderEntity from "../../services/entities/OrderEntity";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  orderId: {
    type: [Number, String],
  },
  orderStatus: {
    type: Number
  },
  orderSource: {
    type: Number,
  },
});
const emits = defineEmits(["update:show", "cancel-order"]);
const loading = ref(false);
const needUpdate = computed(() => props.orderId && props.show);
const cancelDetail = ref([]);

watch(
  needUpdate,
  () => {
    if (needUpdate.value) {
      cancelDetail.value = [];
      loading.value = true
      OrderEntity.getCancelPolicyDetail({ orderId: props.orderId })
        .then(
          (data) => {
            cancelDetail.value = data;
            loading.value = false;
          }
        )
        .catch((error) => {
          console.error(error);
          loading.value = false;
        });
    }
  },
  { immediate: true }
);
</script>

<template>
  <van-popup
    :show="props.show"
    class="cancel-policy-popup"
    position="bottom"
    style="height: auto; min-height: 50%; max-height: 80%;"
    round
    safe-area-inset-bottom
    @update:show="(value) => emits('update:show', value)"
  >
    <div class="popup-header">
      <van-icon name="cross" class="close-icon" @click="() => emits('update:show', false)" />
      <div class="header-title">取消政策</div>
    </div>
    <main class="popup-body">
      <face-page-loading :loading="loading">
        <div class="policy-table">
          <!-- 表头 -->
          <div class="table-header">
            <div class="header-cell time-cell">取消时间</div>
            <div class="header-cell fee-cell">扣费标准</div>
          </div>

          <!-- 表格内容 -->
          <div class="table-body">
            <template v-for="item in cancelDetail" :key="item.id">
              <div class="table-row" :class="{ 'current-row': item.now }">
                <div v-if="item.now" class="current-indicator">
                  <span class="current-text">当前</span>
                </div>
                <div class="row-cell time-cell">
                  <div class="time-text">{{ item.cancelTimeText }}</div>
                  <div class="hour-text">{{ item.beforeHourText }}</div>
                </div>
                <div class="row-cell fee-cell">
                  <template v-if="item.timeType === 1">
                    <div class="free-text">免费取消</div>
                  </template>
                  <template v-else>
                    <div class="fee-amount">￥{{ item.costAmount }}</div>
                    <div class="fee-rate">续租费用的{{ item.beforeHourPer }}%</div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </face-page-loading>
    </main>
    <footer v-if="props.orderStatus < 5 && props.orderSource !== 12" class="popup-footer">
      <van-button type="primary" block round class="confirm-btn" @click="() => emits('cancel-order')">
        取消订单
      </van-button>
    </footer>
  </van-popup>
</template>

<style scoped>
.cancel-policy-popup {
  background: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 50px;
  border-bottom: 1px solid #ebedf0;
  background: #fff;
  border-radius: 16px 16px 0 0;
}

.close-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #969799;
  cursor: pointer;
  z-index: 1;
}

.close-icon:hover {
  color: #323233;
}

.header-title {
  font-size: 16px;
  font-weight: 500;
  color: #323233;
  text-align: center;
}

.popup-body {
  padding: 16px;
  background: #fff;
}

.policy-table {
  border: 1px solid #ebedf0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.table-header {
  display: flex;
  background: #f7f8fa;
  border-bottom: 1px solid #ebedf0;
}

.header-cell {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #646566;
  text-align: center;
}

.time-cell {
  flex: 2;
  border-right: 1px solid #ebedf0;
}

.fee-cell {
  flex: 1;
}

.table-body {
  position: relative;
}

.table-row {
  display: flex;
  position: relative;
  border-bottom: 1px solid #ebedf0;
}

.table-row:last-child {
  border-bottom: none;
}

.current-row {
  background: #f0f9ff;
}

.current-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #1989fa;
  z-index: 2;
}

.current-text {
  position: absolute;
  top: -1px;
  right: 0;
  background: #1989fa;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 0 0 0 4px;
}

.row-cell {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.row-cell.time-cell {
  flex: 2;
  border-right: 1px solid #ebedf0;
  align-items: flex-start;
}

.row-cell.fee-cell {
  flex: 1;
  align-items: center;
  text-align: center;
}

.time-text {
  font-size: 14px;
  color: #323233;
  margin-bottom: 4px;
  line-height: 1.4;
}

.hour-text {
  font-size: 12px;
  color: #969799;
  line-height: 1.4;
}

.free-text {
  font-size: 14px;
  color: #07c160;
  font-weight: 500;
}

.fee-amount {
  font-size: 16px;
  color: #ee0a24;
  font-weight: 600;
  margin-bottom: 2px;
}

.fee-rate {
  font-size: 12px;
  color: #969799;
}

.popup-footer {
  padding: 16px;
  background: #fff;
  border-top: 1px solid #ebedf0;
}

.confirm-btn {
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  background: #1989fa;
  border: none;
  border-radius: 22px;
}

.confirm-btn:active {
  background: #1677d9;
}
</style>

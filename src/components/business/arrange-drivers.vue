<script setup>
import { Toast } from 'vant'
import { computed, reactive, ref, watch } from 'vue'
import { FaceSelector } from '..'
import API from '../../services/apis/order.js'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  orderInfo: {
    type: Object,
  },
})

const emits = defineEmits(['close', 'update:show', 'onOk'])
const editPickUpDriver = ref(false)
const editReturnDriver = ref(false)

// 内部控制显示状态，用于演示环境
const internalShow = ref(props.show)

const driverData = reactive({
  pickUpDriverList: [],
  returnDriverList: [],
  pickUpDriverUserId: null,
  pickUpDriverUserName: null,
  pickUpDriverUserMobile: null,
  returnDriverUserId: null,
  returnDriverUserName: null,
  returnDriverUserMobile: null,
})

const needUpdate = computed(() => props?.orderInfo?.pickupStoreId && props.show)

const changeDriverData = (key, val) => {
  driverData[key] = val
}

const getDriverList = () => {
  const { pickupStoreId, returnStoreId } = props?.orderInfo

  if (pickupStoreId) {
    // 获取取车列表
    API.getDriverListByStore({ storeId: pickupStoreId }).then(res => {
      driverData.pickUpDriverList = res?.model || []
    })
  } 

  if (returnStoreId) {
    // 获取还车列表
    API.getDriverListByStore({ storeId: returnStoreId }).then(res => {
      driverData.returnDriverList = res?.model || []
    })
  }
}

const getDriverInfo = () => {
  // 订单列表页过来，是取 id；详情页过来是取 orderId
  const orderId = props?.orderInfo?.orderId ?? props?.orderInfo?.id
  API.getPickDriverInfo({ order_id: orderId }).then(res => {
    res?.forEach(item => {
      if (item.driverType === 0) {
        editPickUpDriver.value = true
        driverData.pickUpDriverUserId = item.diverUserId
        driverData.pickUpDriverUserName = item.userName
        driverData.pickUpDriverUserMobile = item.mobile
      } else {
        editReturnDriver.value = true
        driverData.returnDriverUserId = item.diverUserId
        driverData.returnDriverUserName = item.userName
        driverData.returnDriverUserMobile = item.mobile
      }
    })
  })
}

const disabledSubmit = ref(false)
const handleSubmit = () => {
  const { pickUpDriverUserId, returnDriverUserId } = driverData
  // 订单列表页过来，是取 id；详情页过来是取 orderId
  const orderId = props?.orderInfo?.orderId ?? props?.orderInfo?.id
  const payload = {
    orderId,
  }

  if (!pickUpDriverUserId && !returnDriverUserId) {
    Toast('请选择司机')
    return
  }
  if (pickUpDriverUserId) payload.pickUpDriverUserId = pickUpDriverUserId
  if (returnDriverUserId) payload.returnDriverUserId = returnDriverUserId
  disabledSubmit.value = true
  API.arrangeDriver(payload).then(() => {
    Toast.success({
      message: '安排司机成功',
      onClose() {
        emits('onOk')
        handleClose()
      },
    })
    setTimeout(() => {
      disabledSubmit.value = false
    }, 2000)
  }).catch(err => {
    disabledSubmit.value = false
    console.error(err)
  })
}

const handleClose = () => {
  driverData.pickUpDriverList = []
  driverData.returnDriverList = []
  driverData.pickUpDriverUserId = null
  driverData.pickUpDriverUserName = null
  driverData.pickUpDriverUserMobile = null
  driverData.returnDriverUserId = null
  driverData.returnDriverUserName = null
  driverData.returnDriverUserMobile = null
  editReturnDriver.value = false
  editPickUpDriver.value = false
  disabledSubmit.value = false
  emits('update:show', false)
  emits('close')
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal && props?.orderInfo) {
      getDriverInfo()
      getDriverList()
    }
  },
  { immediate: true }
)

const activeTab = ref(0)
watch(
  () => props.orderInfo,
  () => {
    const info = props.orderInfo
    if ((info.pickupDriver !== '待排司机' && info.returnDriver === '待排司机') || info.orderStatusStr === '已取车') {
      activeTab.value = 1
    } else {
      activeTab.value = 0
    }
  }
)
</script>

<template>
  <van-popup
    :show="props.show"
    :style="{ height: '60%' }"
    class="arrange-driver-popup"
    position="bottom"
    round
    safe-area-inset-bottom
    @click-overlay="handleClose"
  >
    <div class="popup-header">
      <van-icon name="cross" class="close-icon" @click="handleClose" />
      <div class="header-title">安排司机</div>
    </div>
    <main class="popup-main">
      <van-tabs v-model:active="activeTab" class="driver-tabs">
        <van-tab title="取车司机">
          <template v-if="editPickUpDriver">
            <div class="p-md">
              <van-row class="mb-sm">
                <van-col>取车时间：</van-col>
                <van-col>{{ props?.orderInfo?.pickupDateStr }}</van-col>
              </van-row>
              <van-row class="mb-sm">
                <van-col>取车地点：</van-col>
                <van-col>
                  <div>{{ props?.orderInfo?.pickupStoreName }}</div>
                  <div class="color-gray-6">{{ props?.orderInfo?.pickupAddr }}</div>
                </van-col>
              </van-row>
              <van-row class="mb-sm">
                <van-col>取车司机：</van-col>
                <van-col>
                  <van-space>
                    {{ driverData.pickUpDriverUserName }}
                    {{ driverData.pickUpDriverUserMobile }}
                    <a class="color-link" @click="editPickUpDriver = false">更换</a>
                  </van-space>
                </van-col>
              </van-row>
            </div>
          </template>
          <template v-else>
            <div class="order-info">
              <div class="info-title">订单信息：</div>
              <div class="info-item">预计 {{ props?.orderInfo?.pickupDateStr }}</div>
              <div class="info-item">取车：{{ props?.orderInfo?.pickupStoreName }}</div>
              <div class="info-address">{{ props?.orderInfo?.pickupAddr }}</div>
            </div>
            <div class="driver-section">
              <div class="section-title">选择司机：</div>
              <div class="driver-grid">
                <face-selector
                  :field-names="{ label: 'name', value: 'id' }"
                  :options="driverData.pickUpDriverList"
                  :value="driverData.pickUpDriverUserId"
                  @change="v => changeDriverData('pickUpDriverUserId', v)"
                />
              </div>
            </div>
          </template>
        </van-tab>
        <van-tab title="还车司机">
          <template v-if="editReturnDriver">
            <div class="p-md">
              <van-row class="mb-sm">
                <van-col>还车时间：</van-col>
                <van-col>{{ props?.orderInfo?.returnDateStr }}</van-col>
              </van-row>
              <van-row class="mb-sm">
                <van-col>还车地点：</van-col>
                <van-col>
                  <div>{{ props?.orderInfo?.returnStoreName }}</div>
                  <div class="color-gray-6">{{ props?.orderInfo?.returnAddr }}</div>
                </van-col>
              </van-row>
              <van-row class="mb-sm">
                <van-col>还车司机：</van-col>
                <van-col>
                  <van-space>
                    {{ driverData.returnDriverUserName }}
                    {{ driverData.returnDriverUserMobile }}
                    <a class="color-link" @click="editReturnDriver = false">更换</a>
                  </van-space>
                </van-col>
              </van-row>
            </div>
          </template>
          <template v-else>
            <div class="order-info">
              <div class="info-title">订单信息：</div>
              <div class="info-item">预计 {{ props?.orderInfo?.returnDateStr }}</div>
              <div class="info-item">还车：{{ props?.orderInfo?.returnStoreName }}</div>
              <div class="info-address">{{ props?.orderInfo?.returnAddr }}</div>
            </div>
            <div class="driver-section">
              <div class="section-title">选择司机：</div>
              <div class="driver-grid">
                <face-selector
                  :field-names="{ label: 'name', value: 'id' }"
                  :options="driverData.returnDriverList"
                  :value="driverData.returnDriverUserId"
                  @change="v => changeDriverData('returnDriverUserId', v)"
                />
              </div>
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </main>
    <footer v-if="!(editPickUpDriver && editReturnDriver)" class="popup-footer">
      <van-button block round type="primary" class="confirm-btn" :disabled="disabledSubmit" @click="handleSubmit">
        确认
      </van-button>
    </footer>
  </van-popup>
</template>

<style scoped>
.arrange-driver-popup {
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

.popup-main {
  background: #fff;
  height: calc(100% - 50px - 80px); /* 减去头部和底部高度 */
  overflow-y: auto;
}

.driver-tabs {
  height: 100%;
}

.driver-tabs :deep(.van-tabs__content) {
  height: calc(100% - 44px); /* 减去标签页头部高度 */
  overflow-y: auto;
}

.driver-tabs :deep(.van-tab__panel) {
  height: 100%;
  padding: 0;
}

.driver-tabs :deep(.van-tabs__nav) {
  background: #fff;
  border-bottom: 1px solid #ebedf0;
}

.driver-tabs :deep(.van-tab) {
  font-size: 14px;
  font-weight: 500;
  color: #646566;
}

.driver-tabs :deep(.van-tab--active) {
  color: #1989fa;
}

.driver-tabs :deep(.van-tabs__line) {
  background: #1989fa;
}

.order-info {
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #f7f8fa;
}

.info-title {
  font-size: 14px;
  font-weight: 600;
  color: #323233;
  margin-bottom: 12px;
}

.info-item {
  font-size: 14px;
  color: #323233;
  margin-bottom: 8px;
  line-height: 1.4;
}

.info-address {
  font-size: 12px;
  color: #969799;
  line-height: 1.4;
}

.driver-section {
  padding: 16px;
  background: #fff;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #323233;
  margin-bottom: 12px;
}

/* FaceSelector组件的样式将在其内部处理 */

.popup-footer {
  padding: 16px;
  background: #fff;
  border-top: 1px solid #ebedf0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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

.confirm-btn:disabled {
  background: #c8c9cc;
  color: #fff;
}
</style>

<script setup>
import { computed, ref, watch } from "vue";
import OrderEntity from "../../services/entities/OrderEntity";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  orderId: {
    type: [Number, String]
  },
  serviceId: {
    type: [Number, String]
  }
})
const emits = defineEmits(['update:show'])
const needUpdate = computed(() => props.serviceId && props.show)
const serviceDetail = ref(OrderEntity.getServiceDetailModel())

watch(needUpdate, () => {
  if (needUpdate.value) {
    OrderEntity.getServiceDetail({
      serviceId: props.serviceId,
      orderId: props.orderId
    })
      .then((data) => {
        serviceDetail.value = data
      })
  }
}, { immediate: true })


</script>

<template>
  <van-popup
    :show="props.show"
    class="popup-container"
    position="bottom"
    style="height: auto; min-height: 35%; max-height: 60%;"
    round
    closeable
    safe-area-inset-bottom
    @update:show="(value) => emits('update:show', value)"
  >
    <header class="popup-header">{{ serviceDetail.model.insuranceServiceSettingName }}</header>
    <main class="popup-body p-0">
      <table class="table" border="1">
          <tbody>
            <tr>
              <th class="nowrap">车损险赔付</th>
              <td>{{ serviceDetail.model.vehicleDamageDescribe }}</td>
            </tr>
            <tr>
              <th class="nowrap">三者险保额</th>
              <td>{{ serviceDetail.model.thirdInsuranceDescribe }}</td>
            </tr>
            <tr>
              <th class="nowrap">停运费</th>
              <td>{{ serviceDetail.model.stopShippingDescribe }}</td>
            </tr>
            <tr>
              <th class="nowrap">折旧费</th>
              <td style="white-space: pre-wrap">{{ serviceDetail.model.depreciationDescribe.replace(/\\r\\n/g, '\n') }}</td>
            </tr>
          </tbody>
        </table>
    </main>
    <footer class="popup-footer">
      <van-button native-type="button" type="primary" block @click="() => emits('update:show', false)">确定</van-button>
    </footer>
  </van-popup>
</template>

<style lang="less" scoped>
.popup-container {
  background: #fff;
  border-radius: 16px 16px 0 0;
}

.popup-header {
  padding: 16px 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.popup-body {
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border: none;
  background: #fff;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border: none;
    border-bottom: 1px solid #f5f5f5;
    font-size: 14px;
    line-height: 1.4;
  }

  th {
    background: #fafafa;
    color: #666;
    font-weight: 500;
    width: 80px;
    min-width: 80px;
    white-space: nowrap;
    vertical-align: top;
  }

  td {
    color: #333;
    font-weight: 400;
    word-wrap: break-word;
    word-break: break-all;
  }

  tr:last-child {
    th, td {
      border-bottom: none;
    }
  }
}

.popup-footer {
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
}

:deep(.van-button) {
  height: 44px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
}

:deep(.van-popup) {
  border-radius: 16px 16px 0 0;
}

// 确保文本换行正确显示
.nowrap {
  white-space: nowrap;
}
</style>

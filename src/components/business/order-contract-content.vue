<script setup>
const props = defineProps({
  show: Boolean,
  type: String,
  contractInfo: {
    type: Object
  },
})
</script>

<template>
  <div class="contract-content" id="contract-content">
    <h2 v-if="contractInfo?.rentalAgreement">租车协议</h2>
    <div :innerHTML="contractInfo?.rentalAgreement"></div>
    <h2 v-if="contractInfo?.specialItem">特殊条款</h2>
    <div :innerHTML="contractInfo?.specialItem"></div>
  </div>
</template>


<style lang="less" scoped>
.contract-content {
  h1, h2 {
    text-align: center;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 6px 0;
  }
  
  .signature-box {
    border: 1px solid #333;
    width: 100%;
    height: 150px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;

    .signature {
      max-height: 148px;
    }

    .customer-signature-area {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: #ffffff;
    }
  }
}
</style>
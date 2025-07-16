<!--
 * @Author: duhuo
 * @Date: 2022-10-24 14:40:37
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-27 15:56:17
 * @Description: Do not edit
-->
<script setup>
import { computed, ref } from 'vue'
import Roles from '../roles/index.vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['search'])
const themeVars = ref({
  searchContentBackgroundColor: 'var(--face-background-color-primary-light)',
})
const menuValue = ref({
  text: '订单号',
  value: 'orderId',
})
const menuOptions = ref([
  {
    text: '订单号',
    value: 'orderId',
  },
  {
    text: '手机号',
    value: 'mobile',
  },
  {
    text: '车牌号',
    value: 'vehicleNo',
  },
  {
    text: '客户姓名',
    value: 'name',
  },
  {
    text: '渠道订单号',
    value: 'sourceOrderId',
  },
])
const show = ref(false)
const keyword = ref('')
const placeholder = computed(() => {
  switch (menuValue.value.value) {
    case 'orderId':
      return '请输入订单号'
    case 'mobile':
      return '请输入手机号'
    case 'vehicleNo':
      return '请输入车牌号'
    case 'name':
      return '请输入客户姓名'
    default:
  }

  return ''
})
const EventHandler = {
  onHandleSelect(value) {
    menuValue.value = value
    show.value = false
  },

  // onHandleGoBack() {
  //   router.go(-1);
  // },

  onHandleSearch() {
    emits('search', { value: keyword.value, key: menuValue.value.value })
  },
}

defineExpose({
  reset() {
    keyword.value = ''
  },
})
</script>

<template>
  <van-config-provider :theme-vars="themeVars" class="van-safe-area-top">
    <van-search
      v-model="keyword"
      :placeholder="placeholder"
      shape="round"
      clear-trigger="always"
      background="var(--face-background-color-primary)"
      class="relative"
      style="z-index: 2"
      show-action
      @search="EventHandler.onHandleSearch"
      @clear="EventHandler.onHandleSearch"
    >
      <!-- <template #left>
        <van-icon class="pr-xs" name="arrow-left" color="var(--van-white)" size="0.7rem" @click="EventHandler.onHandleGoBack"></van-icon>
      </template> -->

      <template #label>
        <div class="dropdown-menu-container flex-row items-center" @click.stop="show = !show">
          {{ menuValue.text }}
        </div>
      </template>

      <template #action>
        <Roles allowed="order:table:add">
          <router-link class="search-btn" active-class="search-active-btn" to="/order/create"
            >新增订单</router-link
          >
        </Roles>
      </template>
    </van-search>

    <van-overlay :show="show" @click="show = false">
      <van-cell-group style="padding-top: 1.47rem">
        <van-cell
          v-for="item in menuOptions"
          :key="item.value"
          :value="item.text"
          @click.stop="() => EventHandler.onHandleSelect(item)"
        ></van-cell>
      </van-cell-group>
    </van-overlay>
  </van-config-provider>
</template>

<style lang="less" scoped>
.van-safe-area-top {
  width: 100%;
}
.search-btn,
.search-active-btn {
  color: var(--van-text-color-white);
}

.dropdown-menu-container {
  position: relative;
  margin-right: 4px;
  padding-right: 8px;

  &::after {
    position: absolute;
    top: 50%;
    right: -4px;
    margin-top: -5px;
    border: 3px solid;
    border-color: transparent transparent var(--van-gray-7) var(--van-gray-7);
    transform: rotate(-45deg);
    opacity: 0.8;
    content: '';
  }
}
</style>

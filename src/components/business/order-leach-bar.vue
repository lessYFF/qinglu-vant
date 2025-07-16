<!--
 * @Author: duhuo
 * @Date: 2022-10-24 16:18:07
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-27 18:52:39
 * @Description: Do not edit
-->
<script setup>
import TypeChecker from "@lihzsky/type-checker";
import { cloneDeep } from "lodash-es";
import { Button as VanButton, Col as VanCol, Row as VanRow } from "vant";
import { computed, h, onActivated, reactive, ref, toRaw, onBeforeMount, onMounted } from "vue";
import { FaceCalendarField } from "..";
import { StoreAPI } from "../../services/apis";
import { getBusiChannelList } from '../../services/apis/price.js'
import { useOrderEnums, useScoped, useThemeVars } from "../../use";
import Roles from '../roles/index.vue'
import * as API from '@/services/apis/tickets'
import {nativeSetSelect} from '../../utils/native'



const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
})
const scoped = useScoped();
const themeVars = useThemeVars({
  dropdownMenuHeight: "44px",
  dropdownMenuTitleFontSize: "14px",
  dropdownMenuTitleActiveTextColor: "#3975C6",
  dropdownMenuTitleTextColor: "#666",
  gridItemContentPadding: "8px",
  buttonPrimaryColor: "#fff",
  searchBackground: "#4A90E2",
  searchInputBackground: "#fff",
});
const [orderEnums, orderEnumsReady] = useOrderEnums();

const emits = defineEmits(['search', 'change'])
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

const vehicleList = ref(null)
const statusMenuRef = ref(null);
const sourceMenuRef = ref(null);
const storeMenuRef = ref(null);
const vehicleMenuRef = ref(null);
const timeMenuRef = ref(null);
const dropdownMenuRef = ref(null);

const form = reactive({
  source: [],
  status: [],
  pickReturnStatus: [],
  store: [],
  time: {
    createTime: [],
    dueGetCarTime: [],
    dueReturnCarTime: [],
    getCarTime: [],
    returnCarTime: [],
  },
  vehicle: [],
});
const statusList = ref([]);
const pickReturnStatusList = ref([]);
const sourceList = ref([]);
const storeList = ref([]);
const timeCount = computed(
  () =>
    Object.values(form.time).filter((value) => {
      return TypeChecker.isArray(value) && value.length;
    }).length
);
const Fns = {
  reset() {
    form.status.forEach((item) => {
      item.checked = false;
    });

    form.pickReturnStatus.forEach((item) => {
      item.checked = false;
    });

    form.source.forEach((item) => {
      item.checked = false;
    });

    form.store.forEach((item) => {
      item.checked = false;
    });

    form.vehicle.forEach((item) => {
      item.checked = false;
    });

    form.status = [];
    form.pickReturnStatus = [];
    form.source = [];
    form.store = [];
    form.vehicle = [];

    Object.keys(form.time).forEach((key) => {
      form.time[key] = [];
    });
  },

  change() {
    const data = cloneDeep(toRaw(form));
    emits("change", {
      value: keyword.value,
      key: menuValue.value.value,
      ...data
    });
  },

  close() {
    statusMenuRef.value.toggle?.(false);
    sourceMenuRef.value.toggle?.(false);
    storeMenuRef.value.toggle?.(false);
    vehicleMenuRef.value.toggle?.(false);
    timeMenuRef.value.toggle?.(false);

    // 隐藏下拉菜单容器
    if (dropdownMenuRef.value) {
      dropdownMenuRef.value.style.visibility = 'hidden';
    }
  }
}


const EventHandler = {
  onHandleSelect(value) {
    nativeSetSelect(value).then((res) => {
      localStorage.setItem("searchCondition", res)
    })
    menuValue.value = value
    show.value = false
  },

  onHandleSearch() {
    const data = cloneDeep(toRaw(form));

    emits('change', {
      value: keyword.value,
      key: menuValue.value.value,
      ...data,
    })
  },

  onHandleFilterTab(type) {
    // 显示下拉菜单
    if (dropdownMenuRef.value) {
      dropdownMenuRef.value.style.visibility = 'visible';
    }

    // 根据类型打开对应的下拉项
    switch(type) {
      case 'status':
        statusMenuRef.value?.toggle?.(true);
        break;
      case 'source':
        sourceMenuRef.value?.toggle?.(true);
        break;
      case 'store':
        storeMenuRef.value?.toggle?.(true);
        break;
      case 'vehicle':
        vehicleMenuRef.value?.toggle?.(true);
        break;
      case 'time':
        timeMenuRef.value?.toggle?.(true);
        break;
    }
  },

  onHandleToggleStatus(data) {
    data.checked = !data.checked;

    if (data.checked) {
      form.status.push(data);
    } else {
      const index = form.status.findIndex((item) => item.text === data.text);

      form.status.splice(index, 1);
    }
  },

  onHandleTogglePickReturnStatus(data, index) {
    // 改成单选
    data.checked = !data.checked;
    pickReturnStatusList.value[0].data.forEach((status, i) => {
      if (index !== i) {
        status.checked = false
      }
    })
    if (data.checked) {
      form.pickReturnStatus = [data]
    } else {
      form.pickReturnStatus = []
    }
  },

  onHandleToggleSource(data) {
    data.checked = !data.checked;

    if (data.checked) {
      form.source.push(data);
    } else {
      const index = form.source.findIndex((item) => item.text === data.text);

      form.source.splice(index, 1);
    }
  },

  onHandleToggleStore(data) {
    data.checked = !data.checked;

    if (data.checked) {
      form.store.push(data);
    } else {
      const index = form.store.findIndex((item) => item.text === data.text);

      form.store.splice(index, 1);
    }
  },

  onHandleToggleVehiCle(data) {
    data.checked = !data.checked;

    if (data.checked) {
      form.vehicle.push(data);
    } else {
      const index = form.vehicle.findIndex((item) => item.text === data.text);

      form.vehicle.splice(index, 1);
    }
  },

  onHandleReset() {
    Fns.reset();
    Fns.change();
    Fns.close();
  },

  onHandleConfirm() {
    Fns.change();
    Fns.close();
  },

  onHandleSimpleStatus(index) {
    form.status = []
    statusList.value[0].data.forEach(status => status.checked = false)
    const data = statusList.value[0].data[index]
    data.checked = true;
    form.status.push(data);

    EventHandler.onHandleConfirm()
  }
};

const ButtonGroupRender = scoped(() => {
  return h(
    VanRow,
    {
      class: "dropdown-footer",
    },
    {
      default: () => [
        h(
          VanCol,
          {
            span: 12,
          },
          {
            default: () =>
              h(
                VanButton,
                {
                  size: "small",
                  block: true,
                  class: "dropdown-left-btn",
                  onClick: EventHandler.onHandleReset,
                },
                {
                  default: () => "清除",
                }
              ),
          }
        ),
        h(
          VanCol,
          {
            span: 12,
          },
          {
            default: () =>
              h(
                VanButton,
                {
                  size: "small",
                  type: "primary",
                  block: true,
                  class: "dropdown-right-btn",
                  onClick: EventHandler.onHandleConfirm,
                },
                {
                  default: () => "确定",
                }
              ),
          }
        ),
      ],
    }
  );
});

defineExpose({
  reset: Fns.reset
})

orderEnumsReady(() => {
  const { sourceEnumList, statusEnumList, pickupReturnQueryStatusAppEnumList } = orderEnums.value;

  pickReturnStatusList.value.push({
    name: "取还车状态",
    data: cloneDeep(pickupReturnQueryStatusAppEnumList)
      .filter(item => item.text !== '全部')
      .map((item) => {
        item.checked = false
        return item
      }),
  });

  statusList.value.push({
    name: "订单状态",
    data: cloneDeep(statusEnumList)
      .filter(item => ['3', '4', '5', '6', '8','10'].includes(item.value))
      .map((item) => {
        if (["3", "4", "5", "6"].includes(item.value)) {
          item.checked = true
          form.status.push(item);
        }

        return item
      }),
  });
  console.log(statusList.value,'订单状态')
});

StoreAPI.fetchStoreList().then((data) => {
  storeList.value = data.map((item) => ({
    text: item.storeName,
    value: item.storeId,
  }));
});

onActivated(() => {
  orderEnumsReady(() => {
    Fns.change();
  })
})
onMounted(() => {
  if (JSON.parse(localStorage.getItem('searchCondition'))) {
    menuValue.value = JSON.parse(localStorage.getItem('searchCondition'))
    console.log('onMounted', JSON.parse(localStorage.getItem('searchCondition')));
  }

});
onBeforeMount(async () => {
  const channelRes = await getBusiChannelList({
    includeOffLine: 1,
    includeSub: 1,
    includeSync: 1,
  })
  sourceList.value.push({
    name: "渠道",
    data: cloneDeep(channelRes).map((item) => {
      if ([].includes(item.value)) {
        item.checked = true
        form.source.push(item)
      }

      return {
        text: item.channelName,
        value: item.channelId,
        key: null
      }
    }),
  });
  API.getAllVehicles().then(res => {
    vehicleList.value = res.list
  })
})
</script>

<template>
  <div class="van-safe-area">
    <van-config-provider :theme-vars="themeVars">
      <div class="search-container">
        <van-search v-model="keyword" :placeholder="placeholder" shape="round" clear-trigger="always"
          background="#4A90E2" class="relative search-bar" style="z-index: 2" show-action
          @search="EventHandler.onHandleSearch" @clear="EventHandler.onHandleSearch">
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
              <div class="search-action-btn">新增订单</div>
            </Roles>
          </template>
        </van-search>
      </div>

      <van-overlay :show="show" @click="show = false">
        <van-cell-group style="padding-top: 1.47rem">
          <van-cell v-for="item in menuOptions" :key="item.value" :value="item.text"
            @click.stop="() => EventHandler.onHandleSelect(item)"></van-cell>
        </van-cell-group>
      </van-overlay>
    </van-config-provider>
    <van-config-provider :theme-vars="themeVars">
      <div class="dropdown-menu-container-wrapper" ref="dropdownMenuRef" @click="Fns.close">
        <van-dropdown-menu active-color="#4A90E2" :close-on-click-outside="false" class="custom-dropdown-menu"
          @click.stop>
        <!-- 状态 -->
        <van-dropdown-item ref="statusMenuRef">
          <template #title>
            <span>状态</span>
            <van-badge class="ml-base" position="" :content="form.status.length + form.pickReturnStatus.length"
              :show-zero="false" color="var(--face-blue-dark)"></van-badge>
          </template>

          <div class="dropdown-menu-wrap">
            <div v-for="item in pickReturnStatusList">
              <header class="dropdown-menu__group-header">{{ item.name }}</header>
              <van-grid column-num="2" direction="horizontal" :border="false">
                <van-grid-item v-for="(sub, index) in item.data" :key="sub.text"
                  @click="() => EventHandler.onHandleTogglePickReturnStatus(sub, index)">
                  <div :class="{
                    'dropdown-menu__group-item': true,
                    'dropdown-menu__group-item--active': sub.checked,
                  }">
                    {{ sub.text }}
                  </div>
                </van-grid-item>
              </van-grid>
            </div>

            <div v-for="item in statusList">
              <header class="dropdown-menu__group-header">{{ item.name }}</header>
              <van-grid column-num="2" direction="horizontal" :border="false">
                <van-grid-item v-for="sub in item.data" :key="sub.text"
                  @click="() => EventHandler.onHandleToggleStatus(sub)">
                  <div :class="{
                    'dropdown-menu__group-item': true,
                    'dropdown-menu__group-item--active': sub.checked,
                  }">
                    {{ sub.text }}
                  </div>
                </van-grid-item>
              </van-grid>
            </div>
          </div>
          <button-group-render></button-group-render>
        </van-dropdown-item>
        <!-- 渠道 -->
        <van-dropdown-item ref="sourceMenuRef">
          <template #title>
            <span>渠道</span>
            <van-badge class="ml-base" position="" :content="form.source.length" :show-zero="false"
              color="var(--face-blue-dark)"></van-badge>
          </template>

          <div class="dropdown-menu-wrap">
            <div v-for="item in sourceList">
              <header class="dropdown-menu__group-header">{{ item.name }}</header>
              <van-grid column-num="2" direction="horizontal" :border="false">
                <van-grid-item v-for="sub in item.data" :key="sub.text"
                  @click="() => EventHandler.onHandleToggleSource(sub)">
                  <div :class="{
                    'dropdown-menu__group-item': true,
                    'dropdown-menu__group-item--active': sub.checked,
                  }">
                    {{ sub.text }}
                  </div>
                </van-grid-item>
              </van-grid>
            </div>
          </div>
          <button-group-render></button-group-render>
        </van-dropdown-item>
        <!-- 门店 -->
        <van-dropdown-item ref="storeMenuRef">
          <template #title>
            <span>门店</span>
            <van-badge class="ml-base" position="" :content="form.store.length" :show-zero="false"
              color="var(--face-blue-dark)"></van-badge>
          </template>

          <div class="dropdown-menu-wrap">
            <van-grid column-num="2" direction="horizontal" :border="false">
              <van-grid-item v-for="item in storeList" :key="item.text" style="width: 50%"
                @click="() => EventHandler.onHandleToggleStore(item)">
                <div :class="{
                  'van-ellipsis': true,
                  'dropdown-menu__group-item': true,
                  'dropdown-menu__group-item--active': item.checked,
                }">
                  {{ item.text }}
                </div>
              </van-grid-item>
            </van-grid>
          </div>
          <button-group-render></button-group-render>
        </van-dropdown-item>
        <!-- 车型 -->
        <van-dropdown-item ref="vehicleMenuRef">
          <template #title>
            <span>车型</span>
            <van-badge class="ml-base" position="" :content="form.vehicle.length" :show-zero="false"
              color="var(--face-blue-dark)"></van-badge>
          </template>

          <div class="dropdown-menu-wrap">
            <van-grid column-num="3" direction="horizontal" :border="false">
              <van-grid-item v-for="item in vehicleList" :key="item.text" style="width: 100%"
                @click="() => EventHandler.onHandleToggleVehiCle(item)">
                <div :class="{
                  'van-ellipsis': true,
                  'dropdown-menu__group-item': true,
                  'dropdown-menu__group-item--active': item.checked,
                }">
                  {{ item.vehicleModelName }}
                </div>
              </van-grid-item>
            </van-grid>
          </div>
          <button-group-render></button-group-render>
        </van-dropdown-item>
        <!-- 时间 -->
        <van-dropdown-item ref="timeMenuRef">
          <template #title>
            <span>时间</span>
            <van-badge class="ml-base" position="" :content="timeCount" :show-zero="false"
              color="var(--face-blue-dark)"></van-badge>
          </template>
          <van-row class="bg-pure van-cell--clickable" role="button">
            <van-col span="24" class="px-md pt-sm pb-base font-sm color-minor">订单创建时间</van-col>
            <van-col span="24" class="form-control px-md pb-sm van-hairline--bottom">
              <face-calendar-field v-model="form.time.createTime" class="p-0 bg-transparent" :clickable="false" is-link />
            </van-col>
          </van-row>
          <!-- <van-row class="bg-pure van-cell--clickable" role="button">
            <van-col span="24" class="px-md pt-sm pb-base font-sm color-minor"
              >预定取车时间</van-col
            >
            <van-col
              span="24"
              class="form-control px-md pb-sm van-hairline--bottom"
            >
              <face-calendar-field
                v-model="form.time.dueGetCarTime"
                class="p-0 bg-transparent"
                :clickable="false"
                is-link
              />
            </van-col>
          </van-row>
          <van-row class="bg-pure van-cell--clickable" role="button">
            <van-col span="24" class="px-md pt-sm pb-base font-sm color-minor"
              >预定还车时间</van-col
            >
            <van-col
              span="24"
              class="form-control px-md pb-sm van-hairline--bottom"
            >
              <face-calendar-field
                v-model="form.time.dueReturnCarTime"
                class="p-0 bg-transparent"
                :clickable="false"
                is-link
              />
            </van-col>
          </van-row>
          <van-row class="bg-pure van-cell--clickable" role="button">
            <van-col span="24" class="px-md pt-sm pb-base font-sm color-minor"
              >实际取车时间</van-col
            >
            <van-col
              span="24"
              class="form-control px-md pb-sm van-hairline--bottom"
            >
              <face-calendar-field
                v-model="form.time.getCarTime"
                class="p-0 bg-transparent"
                :clickable="false"
                is-link
              />
            </van-col>
          </van-row>
          <van-row class="bg-pure van-cell--clickable" role="button">
            <van-col span="24" class="px-md pt-sm pb-base font-sm color-minor"
              >实际还车时间</van-col
            >
            <van-col
              span="24"
              class="form-control px-md pb-sm van-hairline--bottom"
            >
              <face-calendar-field
                v-model="form.time.returnCarTime"
                class="p-0 bg-transparent"
                :clickable="false"
                is-link
              />
            </van-col>
          </van-row> -->

          <van-row class="bg-pure van-cell--clickable" role="button">
            <van-col span="24" class="px-md pt-sm pb-base font-sm color-minor">取车时间</van-col>
            <van-col span="24" class="form-control px-md pb-sm van-hairline--bottom">
              <face-calendar-field v-model="form.time.dueGetCarTime" class="p-0 bg-transparent" :clickable="false"
                is-link />
            </van-col>
          </van-row>
          <van-row class="bg-pure van-cell--clickable" role="button">
            <van-col span="24" class="px-md pt-sm pb-base font-sm color-minor">还车时间</van-col>
            <van-col span="24" class="form-control px-md pb-sm van-hairline--bottom">
              <face-calendar-field v-model="form.time.dueReturnCarTime" class="p-0 bg-transparent" :clickable="false"
                is-link />
            </van-col>
          </van-row>
          <button-group-render></button-group-render>
        </van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <div class="filter-layout">
        <!-- 筛选标签行 -->
        <div class="filter-tabs">
          <div class="filter-tab" @click="EventHandler.onHandleFilterTab('status')">
            <span>状态</span>
            <van-badge class="ml-xs" position="" :content="form.status.length + form.pickReturnStatus.length"
              :show-zero="false" color="#4A90E2"></van-badge>
          </div>
          <div class="filter-tab" @click="EventHandler.onHandleFilterTab('source')">
            <span>渠道</span>
            <van-badge class="ml-xs" position="" :content="form.source.length" :show-zero="false"
              color="#4A90E2"></van-badge>
          </div>
          <div class="filter-tab" @click="EventHandler.onHandleFilterTab('store')">
            <span>门店</span>
            <van-badge class="ml-xs" position="" :content="form.store.length" :show-zero="false"
              color="#4A90E2"></van-badge>
          </div>
          <div class="filter-tab" @click="EventHandler.onHandleFilterTab('vehicle')">
            <span>车型</span>
            <van-badge class="ml-xs" position="" :content="form.vehicle.length" :show-zero="false"
              color="#4A90E2"></van-badge>
          </div>
          <div class="filter-tab" @click="EventHandler.onHandleFilterTab('time')">
            <span>时间</span>
            <van-badge class="ml-xs" position="" :content="timeCount" :show-zero="false"
              color="#4A90E2"></van-badge>
          </div>
        </div>

        <!-- 快捷筛选按钮行 -->
        <div class="quick-filter-container">
          <div class="quick-filter-buttons">
            <div :class="{
              'quick-filter-btn': true,
              'quick-filter-btn--active': statusList[0]?.data[1]?.checked,
            }" @click="EventHandler.onHandleSimpleStatus(1)">
              待取车
            </div>
            <div :class="{
              'quick-filter-btn': true,
              'quick-filter-btn--active': statusList[0]?.data[2]?.checked,
            }" @click="EventHandler.onHandleSimpleStatus(2)">
              待还车
            </div>
          </div>
        </div>
      </div>
    </van-config-provider>
  </div>
</template>

<style lang="less" scoped>
.van-safe-area {
  width: 100%;
}
// 搜索容器样式
.search-container {
  background: #4A90E2;
  padding: 8px 16px;
}

// 搜索栏样式
.search-bar {
  :deep(.van-search__content) {
    background: #fff;
    border-radius: 20px;
    padding-left: 12px;
  }

  :deep(.van-field__control) {
    color: #333;
    font-size: 14px;
  }

  :deep(.van-field__left-icon) {
    color: #999;
  }
}

// 搜索按钮样式
.search-action-btn {
  color: #fff;
  font-size: 14px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  text-align: center;
  min-width: 60px;
}

// 筛选布局容器
.filter-layout {
  background: #fff;
}

// 筛选标签行
.filter-tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.filter-tab {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  cursor: pointer;

  span {
    margin-right: 4px;
  }
}

// 快捷筛选容器
.quick-filter-container {
  background: #f7f8fa;
  padding: 12px 16px;
}

.quick-filter-buttons {
  display: flex;
  gap: 12px;
}

.quick-filter-btn {
  flex: 1;
  padding: 8px 16px;
  text-align: center;
  font-size: 14px;
  color: #666;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-filter-btn--active {
  color: #4A90E2;
  border-color: #4A90E2;
  background: #f0f7ff;
}

// 下拉菜单容器
.dropdown-menu-container-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  visibility: hidden;
}

// 自定义下拉菜单样式
.custom-dropdown-menu {
  position: relative;
  top: 120px; // 搜索栏和筛选标签的高度

  :deep(.van-dropdown-menu__bar) {
    display: none; // 隐藏原来的标题栏
  }

  :deep(.van-dropdown-item__content) {
    background: #fff;
    border-radius: 8px 8px 0 0;
    margin: 0 16px;
    max-height: 60vh;
    overflow-y: auto;
  }
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

.dropdown-footer {
  padding: 10px 38px;
  background: var(--van-background-color-light);
  box-shadow: var(--van-dropdown-menu-box-shadow);
}

.dropdown-left-btn {
  border-radius: var(--van-border-radius-max) 0 0 var(--van-border-radius-max);
}

.dropdown-right-btn {
  border-radius: 0 var(--van-border-radius-max) var(--van-border-radius-max) 0;
}

.chose-num {
  background-color: var(--face-background-color-gray-3);
  color: var(--van-primary-color);
  display: inline-block;
  font-size: 11px;
  line-height: 16px;
  border-radius: 10px;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  text-align: center;
  margin-left: 3px;
}

.dropdown-menu__group-header {
  padding: var(--van-padding-md) 0 var(--van-padding-base);
  font-size: var(--van-font-size-sm);
  color: var(--van-text-color-2);
  line-height: var(--van-line-height-sm);
}

.dropdown-menu__group-item {
  box-sizing: border-box;
  width: 100%;
  padding: var(--van-padding-base) var(--van-padding-sm);
  font-size: var(--van-font-size-md);
  line-height: var(--van-line-height-md);
  text-align: center;
  background: var(--van-background-color);
  border-radius: var(--van-border-radius-max);
}

.dropdown-menu__group-item--active {
  box-sizing: border-box;
  color: var(--face-blue-dark);
  border: 1px solid var(--face-border-color-primary);
  background: var(--face-background-color-primary-light);
}

.dropdown-menu-wrap {
  margin: var(--face-margin-md);
  max-height: 360px;
  overflow-y: scroll;
}

.cover {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  background-color: #efefef;
  top: 0;
  left: 0;
}
</style>

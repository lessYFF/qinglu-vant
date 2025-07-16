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
import { computed, h, onActivated, reactive, ref, toRaw } from "vue";
import { FaceCalendarField } from "..";
import { StoreAPI } from "../../services/apis";
import { useOrderEnums, useScoped, useThemeVars } from "../../use";

const scoped = useScoped();
const themeVars = useThemeVars({
  dropdownMenuHeight: "36px",
  dropdownMenuTitleFontSize: "13px",
  dropdownMenuTitleActiveTextColor: "#3975C6",
  gridItemContentPadding: "5px",
  buttonPrimaryColor: "#fff",
});
const [orderEnums, orderEnumsReady] = useOrderEnums();

const emits = defineEmits(["change"]);

const statusMenuRef = ref(null);
const payStatusMenuRef = ref(null);
// const sourceMenuRef = ref(null);
const storeMenuRef = ref(null);
const timeMenuRef = ref(null);

const form = reactive({
  // source: [],
  status: [],
  payStatus: [],
  pickReturnStatus: [],
  store: [],
  time: {
    createTime: [],
    dueGetCarTime: [],
    dueReturnCarTime: [],
    getCarTime: [],
    returnCarTime: [],
  },
});
const payStatusList = ref([]);
const statusList = ref([]);
// const pickReturnStatusList = ref([]);
// const sourceList = ref([]);
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

    form.payStatus.forEach((item) => {
      item.checked = false;
    });

    // form.pickReturnStatus.forEach((item) => {
    //   item.checked = false;
    // });

    // form.source.forEach((item) => {
    //   item.checked = false;
    // });

    // form.store.forEach((item) => {
    //   item.checked = false;
    // });

    form.status = [];
    form.payStatus = [];
    // form.pickReturnStatus = [];
    form.source = [];
    form.store = [];

    Object.keys(form.time).forEach((key) => {
      form.time[key] = [];
    });
  },

  change() {
    console.log('change', form)
    const data = cloneDeep(toRaw(form));

    emits("change", data);
  },

  close() {
    statusMenuRef.value.toggle?.(false);
    // payStatusMenuRef.value.toggle?.(false);
    // sourceMenuRef.value.toggle?.(false);
    storeMenuRef.value.toggle?.(false);
    timeMenuRef.value.toggle?.(false);
  }
}
const EventHandler = {
  onHandleToggleStatus(data) {
    console.log('onHandleToggleStatus', data, data.checked)
    data.checked = !data.checked;

    if (data.checked) {
      form.status.push(data);
    } else {
      const index = form.status.findIndex((item) => item.text === data.text);

      form.status.splice(index, 1);
    }
  },

  onHandleTogglePayStatus(data) {
    console.log('onHandleTogglePayStatus', data, data.checked)
    data.checked = !data.checked;

    if (data.checked) {
      form.payStatus.push(data);
    } else {
      const index = form.payStatus.findIndex((item) => item.text === data.text);

      form.payStatus.splice(index, 1);
    }
  },

  // onHandleTogglePickReturnStatus(data) {
  //   data.checked = !data.checked;

  //   if (data.checked) {
  //     form.pickReturnStatus.push(data);
  //   } else {
  //     const index = form.pickReturnStatus.findIndex((item) => item.text === data.text);

  //     form.pickReturnStatus.splice(index, 1);
  //   }
  // },

  // onHandleToggleSource(data) {
  //   data.checked = !data.checked;

  //   if (data.checked) {
  //     form.source.push(data);
  //   } else {
  //     const index = form.source.findIndex((item) => item.text === data.text);

  //     form.source.splice(index, 1);
  //   }
  // },

  onHandleToggleStore(data) {
    data.checked = !data.checked;

    if (data.checked) {
      form.store.push(data);
    } else {
      const index = form.store.findIndex((item) => item.text === data.text);

      form.store.splice(index, 1);
    }
  },

  onHandleReset() {
    Fns.reset();
    Fns.change();
    Fns.close();
  },

  onHandleConfirm() {
    console.log('onHandleConfirm', Fns)
    Fns.change();
    Fns.close();
  },
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
  const { sourceEnumList, statusEnumList, longOrderPayStatusEnumList, pickupReturnQueryStatusAppEnumList } = orderEnums.value;

  // pickReturnStatusList.value.push({
  //   name: "取还车状态",
  //   data: cloneDeep(pickupReturnQueryStatusAppEnumList)
  //     .filter(item => item.text !== '全部')
  //     .map((item) => {
  //       item.checked = false
  //       return item
  //     }),
  // });

  statusList.value.push({
    name: "订单状态",
    data: cloneDeep(statusEnumList)
      .filter(item => ['4', '5', '6', '8'].includes(item.value))
      .map((item) => {
      if (["4", "5", "6"].includes(item.value)) {
        item.checked = true
        form.status.push(item);
      }

      return item
    }),
  });

  payStatusList.value.push({
    name: "支付状态",
    data: cloneDeep(longOrderPayStatusEnumList)
  });

  // sourceList.value.push({
  //   name: "渠道",
  //   data: cloneDeep(sourceEnumList).map((item) => {
  //     if ([].includes(item.value)) {
  //       item.checked = true
  //       form.source.push(item)
  //     }

  //     return item
  //   }),
  // });
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
</script>

<template>
  <van-config-provider :theme-vars="themeVars" class="van-safe-area">
    <van-dropdown-menu
      active-color="var(--van-primary-color)"
      :close-on-click-outside="false"
    >
      <!-- 状态 -->
      <van-dropdown-item ref="statusMenuRef">
        <template #title>
          <span>状态</span>
          <van-badge
            class="ml-base"
            position=""
            :content="form.status.length + form.payStatus.length"
            :show-zero="false"
            color="var(--face-blue-dark)"
          ></van-badge>
        </template>

        <div class="dropdown-menu-wrap">
          <!-- <div v-for="item in pickReturnStatusList">
            <header class="dropdown-menu__group-header">{{ item.name }}</header>
            <van-grid column-num="2" direction="horizontal" :border="false">
              <van-grid-item
                v-for="sub in item.data"
                :key="sub.text"
                @click="() => EventHandler.onHandleTogglePickReturnStatus(sub)"
              >
                <div
                  :class="{
                    'dropdown-menu__group-item': true,
                    'dropdown-menu__group-item--active': sub.checked,
                  }"
                >
                  {{ sub.text }}
                </div>
              </van-grid-item>
            </van-grid>
          </div> -->

          <!-- 订单状态 -->
          <div v-for="item in statusList">
            <header class="dropdown-menu__group-header">{{ item.name }}</header>
            <van-grid column-num="2" direction="horizontal" :border="false">
              <van-grid-item
                v-for="sub in item.data"
                :key="sub.text"
                @click="() => EventHandler.onHandleToggleStatus(sub)"
              >
                <div
                  :class="{
                    'dropdown-menu__group-item': true,
                    'dropdown-menu__group-item--active': sub.checked,
                  }"
                >
                  {{ sub.text }}
                </div>
              </van-grid-item>
            </van-grid>
          </div>

          <!-- 支付状态 -->
          <div v-for="item in payStatusList">
            <header class="dropdown-menu__group-header">{{ item.name }}</header>
            <van-grid column-num="2" direction="horizontal" :border="false">
              <van-grid-item
                v-for="sub in item.data"
                :key="sub.text"
                @click="() => EventHandler.onHandleTogglePayStatus(sub)"
              >
                <div
                  :class="{
                    'dropdown-menu__group-item': true,
                    'dropdown-menu__group-item--active': sub.checked,
                  }"
                >
                  {{ sub.text }}
                </div>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
        <button-group-render></button-group-render>
      </van-dropdown-item>
      <!-- 渠道 -->
      <!-- <van-dropdown-item ref="sourceMenuRef">
        <template #title>
          <span>渠道</span>
          <van-badge
            class="ml-base"
            position=""
            :content="form.source.length"
            :show-zero="false"
            color="var(--face-blue-dark)"
          ></van-badge>
        </template>

        <div class="dropdown-menu-wrap">
          <div v-for="item in sourceList">
            <header class="dropdown-menu__group-header">{{ item.name }}</header>
            <van-grid column-num="2" direction="horizontal" :border="false">
              <van-grid-item
                v-for="sub in item.data"
                :key="sub.text"
                @click="() => EventHandler.onHandleToggleSource(sub)"
              >
                <div
                  :class="{
                    'dropdown-menu__group-item': true,
                    'dropdown-menu__group-item--active': sub.checked,
                  }"
                >
                  {{ sub.text }}
                </div>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
        <button-group-render></button-group-render>
      </van-dropdown-item> -->
      <!-- 门店 -->
      <van-dropdown-item ref="storeMenuRef">
        <template #title>
          <span>门店</span>
          <van-badge
            class="ml-base"
            position=""
            :content="form.store.length"
            :show-zero="false"
            color="var(--face-blue-dark)"
          ></van-badge>
        </template>

        <div class="dropdown-menu-wrap">
          <van-grid column-num="2" direction="horizontal" :border="false">
            <van-grid-item
              v-for="item in storeList"
              :key="item.text"
              style="width: 50%"
              @click="() => EventHandler.onHandleToggleStore(item)"
            >
              <div
                :class="{
                  'van-ellipsis': true,
                  'dropdown-menu__group-item': true,
                  'dropdown-menu__group-item--active': item.checked,
                }"
              >
                {{ item.text }}
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
          <van-badge
            class="ml-base"
            position=""
            :content="timeCount"
            :show-zero="false"
            color="var(--face-blue-dark)"
          ></van-badge>
        </template>
        <van-row class="bg-pure van-cell--clickable" role="button">
          <van-col span="24" class="px-md pt-sm pb-base font-sm color-minor"
            >订单创建时间</van-col
          >
          <van-col
            span="24"
            class="form-control px-md pb-sm van-hairline--bottom"
          >
            <face-calendar-field
              v-model="form.time.createTime"
              class="p-0 bg-transparent"
              :clickable="false"
              is-link
            />
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
          <van-col span="24" class="px-md pt-sm pb-base font-sm color-minor"
            >取车时间</van-col
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
            >还车时间</van-col
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


        <button-group-render></button-group-render>
      </van-dropdown-item>
    </van-dropdown-menu>
  </van-config-provider>
</template>

<style lang="less" scoped>
.van-safe-area {
  width: 100%;
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

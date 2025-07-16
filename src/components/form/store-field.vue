<script setup>
import { StoreAPI } from "@/services/apis";
import { ref, useAttrs, onMounted } from "vue";
import { FaceCustomFieldValue } from "..";
import { TELEPORT } from '../../constants';

const HistoryStorage = {
  get() {
    const str = localStorage.getItem("__SEARCH_STORE_HISTORY__") || [];

    try {
      if (/^({.+}|\[.+\])$/.test(str)) {
        return JSON.parse(str);
      }

      return [];
    } catch (ex) {
      return [];
    }
  },
  set(value) {
    const list = HistoryStorage.get();
    const index = list.findIndex(historyItem => historyItem === value);

    if (index !== -1) {
      list.splice(index, 1)
    }

    list.unshift(value);
    localStorage.setItem("__SEARCH_STORE_HISTORY__", JSON.stringify(list));
  },
  clear() {
    localStorage.removeItem("__SEARCH_STORE_HISTORY__");
  },
};

const attrs = useAttrs();
const props = defineProps({
  modelValue: {
    type: [Array, Object, String],
  },
  bizType: {
    type: String,
    validator(value) {
      return ["pickup", "return"].includes(value);
    },
  },
  isKCST: {
    type: Boolean,
  },
  storeObj: {
    type: Object,
  }
});
const emits = defineEmits(["update:modelValue"]);
const show = ref(false);
const searchKeyword = ref('');
const historyList = ref([]);
const usedStoreList = ref([]);
const searchStoreList = ref([]);
const Fns = {
  init() {
    Fns.getStoreList();
    historyList.value = HistoryStorage.get()
  },
  getStoreList() {
    StoreAPI.fetchStoreList({ searchkey: searchKeyword.value })
      .then((data) => {
        // 将搜索历史存入LocalStorage
        if (searchKeyword.value) {
          HistoryStorage.set(searchKeyword.value);
        }

        searchStoreList.value = data;
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
const EventHandler = {
  onHandleOpen() {
    show.value = true;
    Fns.init();
  },

  onHandleSearch(value) {
    searchKeyword.value = value;
    Fns.getStoreList();
  },

  onHandleConfirm(value) {
    console.log(value)
    emits("update:modelValue", value);
    show.value = false;
  },

  onHandleCancel() {
    searchKeyword.value = '';
    show.value = false;
  },

  onHandleClear() {
    HistoryStorage.clear();
    Fns.init();
  },
};
onMounted(() => {

  if (props.isKCST == true) {
    StoreAPI.fetchStoreList({ searchkey: searchKeyword.value })
      .then((data) => {
        // 将搜索历史存入LocalStorage
        data.forEach((item, index) => {
          if (item.storeId == props.storeObj.storeId) {
            EventHandler.onHandleConfirm(item)
          }
        })
      })
      .catch((e) => {
        console.error(e);
      });
  }
})
</script>

<template>
  <van-field v-bind="attrs" class="custom-form-field" @click="EventHandler.onHandleOpen" readonly is-link>
    <template #input>
      <face-custom-field-value :value="props.modelValue" :display-value="props.modelValue?.storeName"
        :placeholder="attrs.placeholder"></face-custom-field-value>
    </template>
  </van-field>

  <van-popup v-model:show="show" :overlay="false" position="bottom" :teleport="TELEPORT" safe-area-inset-bottom
    style="height: 100%; overflow-y: auto;">
    <van-sticky>
      <van-search v-model="searchKeyword" shape="round" show-action @search="EventHandler.onHandleSearch"
        @cancel="EventHandler.onHandleCancel"></van-search>
    </van-sticky>
    <main v-if="historyList.length" class="m-md mt-0">
      <header class="pb-xs flex-row items-center font-md">
        <div class="flex-auto font-bold">查询历史</div>
        <button class="p-0 font-sm color-blue border-0 bg-transparent" @click="EventHandler.onHandleClear">
          <van-icon class="mr-base" name="delete-o"></van-icon>
          <span>清除历史</span>
        </button>
      </header>
      <div class="flex-row">
        <div v-for="item in historyList" :key="item"
          class="m-base py-base px-xs font-sm color-blue bg-blue-light radius-max"
          @click="() => EventHandler.onHandleSearch(item)">
          {{ item }}
        </div>
      </div>
    </main>
    <main v-if="usedStoreList.length" class="m-md">
      <header class="pb-xs font-md font-bold van-hairline--bottom">常用门店</header>
      <div v-for="item in usedStoreList" :key="item" class="py-sm px-xs font-md color-minor van-hairline--bottom"
        @click="() => EventHandler.onHandleConfirm(item)">
        {{ item }}
      </div>
    </main>
    <main v-if="searchStoreList.length" class="m-md">
      <header class="pb-xs font-md font-bold van-hairline--bottom">全部门店</header>
      <div v-for="item in searchStoreList" :key="item" class="py-sm px-xs font-sm color-minor van-hairline--bottom"
        @click="() => EventHandler.onHandleConfirm(item)">
        {{ item.storeName }}
      </div>
    </main>
  </van-popup>
</template>

<style lang="less" scoped></style>
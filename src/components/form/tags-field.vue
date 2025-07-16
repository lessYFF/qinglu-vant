<script setup>
import TypeChecker from '@lihzsky/type-checker';
import { computed, ref, toRaw, useAttrs, watch, onMounted } from "vue";
import { FaceCustomFieldValue } from '..';
import { TELEPORT } from "../../constants";
import { keywordCompare } from '@/utils/string'

const attrs = useAttrs();
const props = defineProps({
  modelValue: {
    type: Array,
  },
  columns: {
    type: Array,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  openSelectAll: {
    type: Boolean,
    default: false
  },
  search: {
    type: Boolean,
    default: false
  },
  isKCST: {
    type: Boolean
  },
  kcstVehicleModelId: {
    type: Number
  }
});
const emits = defineEmits(["update:modelValue", "show"]);
const show = ref(false);
const selectedAll = ref(false);
const checkedValues = ref([]);
const checkboxRefs = ref([]);
const checkboxGroupRef = ref(null);
const displayValue = computed(() => {
  if (TypeChecker.isArray(props.modelValue) && props.modelValue.length) {
    return props.modelValue.map((v) => v.label).join(" ");
  }

  return null;
});
const EventHandler = {
  onHandleOpen() {
    isBox.value=2
    console.log(111)
    emits("show");
    if (props.disabled) return;
    if (props.columns.length > 0) {
      show.value = true;
    }
  },

  onHandleToggleAll() {
    selectedAll.value = !selectedAll.value
    checkboxGroupRef.value.toggleAll({
      checked: selectedAll.value,
      skipDisabled: true
    })
  },

  onHandleToggle(index) {
    const value = filtered.value[index];
    
    if (!value.required) {
      console.log(value,'111')
      const lastServiceId = value.value
      const betterInsurance = filtered.value.find((item) => item.label === '优享保险')
      const bestInsurance = filtered.value.find((item) => item.label === '尊享保险')
      // 优享保险、尊享保险互斥
      if (lastServiceId === betterInsurance?.value || lastServiceId === bestInsurance?.value) {
        // 优享保险、尊享保险互斥
        if (lastServiceId === betterInsurance?.value) {
          const bestInsuranceIndex = checkedValues.value.findIndex((item) => item === bestInsurance?.value)
          if (bestInsuranceIndex > -1) {
            checkedValues.value.splice(bestInsuranceIndex, 1)
            checkboxRefs.value[bestInsuranceIndex].toggle();
          }
          checkboxRefs.value[index].toggle();
        }
        if (lastServiceId === bestInsurance?.value) {
          const betterInsuranceIndex = checkedValues.value.findIndex((item) => item === betterInsurance?.value)
          if (betterInsuranceIndex > -1) {
            checkedValues.value.splice(betterInsuranceIndex, 1)
            checkboxRefs.value[betterInsuranceIndex].toggle();
          }
          checkboxRefs.value[index].toggle();
        }
      } else {
        checkboxRefs.value[index].toggle();
      }
    }

    if (props.openSelectAll) {
      // 检查是否为全选
      const validCheckedValues = checkedValues.value.filter((item) => !!item)

      selectedAll.value = validCheckedValues.length === props.columns.length

      if (selectedAll.value) {
        checkedValues.value.unshift(undefined)
      } else {
        checkedValues.value = validCheckedValues
      }
    }
  },

  onHandleConfirm() {
    const values = []

    for (let i = 0; i < checkedValues.value.length; i++) {
      const id = checkedValues.value[i]

      if (id) {
        const value = props.columns.find(item => item.value === id)

        values.push(toRaw(value))
      }
    }

    emits("update:modelValue", values);
    show.value = false;
    
  },

  onHandleClose(value) {
    const values = props.modelValue.filter((item) => item !== value);

    emits("update:modelValue", values);
  },

  onHandleCancel() {
    checkedValues.value = props.modelValue.map(item => item.value);
    show.value = false;
  },
};

watch(() => props.columns, () => {
  const values = []

  for (let i = 0; i < props.columns.length; i++) {
    const item = props.columns[i]

    if (item.required) {
      checkedValues.value.push(item.value)
      values.push(toRaw(item))
    } else if (props.modelValue.includes(item)) {
      checkedValues.value.push(item.value)
      values.push(toRaw(item))
    }
  }

  emits("update:modelValue", values)
}, { immediate: true })


const keyword = ref('')
const filtered = computed(() => {
  const trimed = keyword.value.trim()
  if (!trimed) return props.columns
  return props.columns.filter(column => {
    return keywordCompare(trimed, column.label)
  })
})

const isBox=ref(0)
onMounted(() => {
  if (props.isKCST == true) {
    isBox.value = 1
    show.value = true
    setTimeout(() => {
      filtered.value.forEach((item, index) => {
        if (item.value == props.kcstVehicleModelId) {
          EventHandler.onHandleToggle(index)
        }
      })
      EventHandler.onHandleConfirm()
    }, 1000)
  }else{
    isBox.value = 2
  }
})

</script>

<template>
  <van-field v-bind="attrs" class="custom-form-field" @click="EventHandler.onHandleOpen" readonly is-link>
    <template #input>
      <face-custom-field-value :value="props.modelValue" :display-value="displayValue" :placeholder="attrs.placeholder"
        :ellipsis="false">
        <van-tag v-for="item in props.modelValue" :key="item.value" class="mr-base mb-base" size="medium" closeable
          @close="() => EventHandler.onHandleClose(item)">{{ item.label }}</van-tag>
      </face-custom-field-value>
    </template>
  </van-field>

  <van-popup v-model:show="show" round position="bottom" :teleport="TELEPORT" class="popup-container"
    safe-area-inset-bottom :overlay="isBox==2" :style="{height:isBox==1? '0%' : '45%'}" style="overflow-y: auto" @click-overlay="EventHandler.onHandleCancel">
    <div class="relative">
      <header class="popup-header flex-row">
        <button type="button" class="p-0 font-md color-light border-0 bg-transparent"
          @click="EventHandler.onHandleCancel">
          取消
        </button>
        <div class="flex-auto font-lg text-center">{{ props.title }}</div>
        <button type="button" class="p-0 font-md color-blue border-0 bg-transparent"
          @click="EventHandler.onHandleConfirm">
          确定
        </button>
      </header>

      <div class="search" v-if="props.search">
        <van-field v-model="keyword" placeholder="输入搜索关键词" clearable />
      </div>

      <van-checkbox-group v-model="checkedValues" ref="checkboxGroupRef" class="options">
        <van-cell-group>
          <van-cell v-if="props.openSelectAll" clickable @click="EventHandler.onHandleToggleAll">
            <template #icon>
              <van-checkbox class="mr-xs" @click.stop="EventHandler.onHandleToggleAll"></van-checkbox>
            </template>
            <template #title>全部</template>
          </van-cell>
          <van-cell v-for="(item, index) in filtered" :key="item.value" clickable
            @click="() => EventHandler.onHandleToggle(index)">
            <template #icon>
              <van-checkbox :ref="el => checkboxRefs[index] = el" class="mr-xs" :name="item.value"
                :disabled="!!item.required" @click.stop></van-checkbox>
            </template>
            <template #title>
              {{ item.label }}
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </van-popup>
</template>

<style lang="less" scoped>
.relative {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.options {
  flex: 1;
  overflow-y: auto;
}
</style>

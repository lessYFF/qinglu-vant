<script setup>
import { computed, ref, unref, onMounted, onUpdated, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
  },
  addButtonText: {
    type: String,
    default: '添加费用项',
  },
  label: {
    type: String,
  },
  actionTitle: {
    type: String,
    default: '选择费用类目',
  },
  radios: {
    type: Array,
  },
  actions: {
    type: Array,
  },
  zzqhTf: {
    type: Array,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  initValue: {
    type: Array,
    default: () => ([])
  },
  defaultRadio: {
    type: String
  }
})
const emits = defineEmits(['change'])
const isOpen = ref(false)
const show = ref(false)
const radioValue = ref('1')
const group = ref([])
const actions = computed(() => {
  const acts = []

  props.actions.forEach(item => {
    const activeIndex = group.value.findIndex(field => field.name === item.name)
    if (activeIndex === -1) {
      acts.push({ ...item })
    } else {
      acts.push({ ...item, disabled: true })
    }
  })

  return acts
})
const EventHandler = {
  onHandleOpenAction() {
    if (props.disabled) return
    show.value = true
  },

  onHandleSelect(data) {
    if (group.value.findIndex(item => item.name === data.name) === -1) {
      group.value = [...group.value, { name: data.name, value: '', fieldInfo: data.value }]
    }
  },

  onHandleRemove(value) {
    console.log(value, '删除')
    group.value = group.value.filter(item => item !== value)

    emits('change', { radioValue: unref(radioValue), group: unref(group) })
  },

  onHandleChange(fieldInfo, value) {
    console.log(fieldInfo, value, '99')
    const field = group.value.find(item => item.name === fieldInfo.name)

    field.value = value
    emits('change', { radioValue: unref(radioValue), group: unref(group) })
  },
}
const zzqhTf2 = ref([])
const switchChange = val => {
  console.log(val, 'gogo')
  // if (props.title !== '需要退费') {
  //   return
  // }
  if (val == true) {
    if (zzqhTf2.value.length == 0) {
      props.zzqhTf?.forEach((item, index) => {
        zzqhTf2.value.push({
          fieldInfo: { id: item.id, itemName: item.itemName, itemType: item.itemType, wctData: item.wctData, expenseItemPropId: item.expenseItemPropId },
          name: item.itemName,
          value: formatMoney(item.expenseAmount),
          isChk: true,
        })
      })
      zzqhTf2.value.forEach((item, index) => {
        group.value.push(item)
        EventHandler.onHandleChange(item, item.value)
      })
    }
  } else {
    group.value.forEach((item, index) => {
      EventHandler.onHandleRemove(item)
    })
    group.value = []
    zzqhTf2.value = []
  }
}

const formatMoney = amount => {
  return (Number(amount) / 100).toFixed(2)
}

watch(radioValue, () => {
  emits('change', { radioValue: unref(radioValue), group: unref(group) })
})
// 处理初始化
const initValue  = () => {
  if (props.initValue?.length > 0) {
    switchChange(true)
    isOpen.value = true
    group.value = props.initValue
  }
  if (props.defaultRadio) {
    radioValue.value = props.defaultRadio
  }
}
onMounted(() => {
  setTimeout(() => {
    if (props.zzqhTf?.length > 0) {
      switchChange(true)
      isOpen.value = true
    }
    initValue()
  }, 100)
})

// 监听defaultRadio和initValue的变化，确保props更新时能立即响应
watch(() => props.defaultRadio, (newVal) => {
  if (newVal) {
    radioValue.value = newVal
  }
}, { immediate: true })

watch(() => props.initValue, (newVal) => {
  if (newVal?.length > 0 && !isOpen.value) {
    isOpen.value = true
    group.value = newVal
  }
}, { immediate: true })
</script>

<template>
  <div class="mb-sm van-safe-area">
    <header class="panel-header flex justify-space-between items-center">
      <span>{{ props.title }}</span>
      <van-switch v-model="isOpen" size="16px" @change="switchChange" :disabled="disabled"/>
    </header>
    <main v-if="isOpen">
      <div class="van-hairline--bottom">
        <van-field :label="props.label" label-width="8em" required class="font-sm items-center">
          <template #input>
            <van-radio-group v-model="radioValue" direction="horizontal" icon-size="16px" :disabled="disabled">
              <van-radio v-for="item in props.radios" :key="item.value" :name="item.value">{{ item.text }}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <slot></slot>
      <div v-for="item in group" :key="item.name" class="van-hairline--bottom">
        <van-field :label="item.name" label-width="8em" :model-value="item.value" label-class="combo-fee-field-label"
          value-class="font-sm" type="number" @update:model-value="value => EventHandler.onHandleChange(item, value)" :disabled="disabled">
          <template #right-icon>
            <div class="font-sm px-xs">元</div>
          </template>
          <template #extra>
            <div class="combo-fee-btn-placeholder">
              <button class="combo-fee-delete-item-btn" :disabled="disabled" @click="() => EventHandler.onHandleRemove(item)">删除</button>
            </div>
          </template>
        </van-field>
      </div>
      <van-row class="bg-pure">
        <van-col class="px-md py-sm font-sm color-minor flex justify-center items-center" span="24">
          <div @click="EventHandler.onHandleOpenAction">
            <van-icon name="plus" />
            <span>{{ props.addButtonText }}</span>
          </div>
        </van-col>
      </van-row>
    </main>
  </div>

  <van-action-sheet v-model:show="show" :actions="actions" :title="props.actionTitle" cancel-text="取消"
    close-on-click-action @select="EventHandler.onHandleSelect"></van-action-sheet>
</template>

<style scoped>
.van-safe-area{
  width: 100%;
}
.mb-sm {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #f7f8fa;
  font-size: 16px;
  font-weight: 500;
  color: #323233;
}

.panel-header span {
  font-size: 16px;
  font-weight: 500;
  color: #323233;
}

/* 表单字段样式 */
:deep(.van-field) {
  padding: 12px 16px;
  background: #fff;
}

:deep(.van-field__label) {
  font-size: 14px;
  color: #646566;
  font-weight: 400;
}

:deep(.van-field__value) {
  font-size: 14px;
}

:deep(.van-field__control) {
  font-size: 14px;
  color: #323233;
}

/* 单选按钮样式 */
:deep(.van-radio-group) {
  display: flex;
  gap: 24px;
}

:deep(.van-radio) {
  margin-right: 0;
}

:deep(.van-radio__label) {
  font-size: 14px;
  color: #323233;
  margin-left: 8px;
}

:deep(.van-radio__icon--checked) {
  color: #1989fa;
}

/* 输入框样式 */
:deep(.van-field__control[type="number"]) {
  text-align: right;
  font-size: 14px;
  color: #323233;
  font-weight: 500;
}

/* 删除按钮样式 */
.combo-fee-btn-placeholder {
  width: 60px;
  position: relative;
}

.combo-fee-delete-item-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 100%;
  padding: 0;
  font-size: 12px;
  color: #fff;
  background: #ee0a24;
  border: none;
  border-radius: 0;
}

.combo-fee-delete-item-btn:active {
  background: #d60a1f;
}

/* 添加按钮区域样式 */
:deep(.bg-pure) {
  background: #f7f8fa;
}

:deep(.bg-pure .van-col) {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

:deep(.bg-pure .van-col:hover) {
  background: #ebedf0;
}

:deep(.bg-pure .van-col div) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
  color: #1989fa;
}

:deep(.bg-pure .van-icon) {
  font-size: 14px;
  color: #1989fa;
}

/* 分割线样式 */
:deep(.van-hairline--bottom::after) {
  border-bottom-color: #f7f8fa;
}

/* 单位文字样式 */
:deep(.px-xs) {
  padding: 0 8px;
  font-size: 14px;
  color: #969799;
}

/* 字段标签样式 */
:deep(.combo-fee-field-label) {
  font-size: 14px;
  color: #646566;
}
</style>

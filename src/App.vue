<template>
  <div id="app">
    <van-nav-bar title="擎路H5组件库" fixed />
    
    <div class="demo-container">
      <van-tabs v-model:active="activeTab" sticky>
        <!-- 表单组件 -->
        <van-tab title="表单组件" name="form">
          <div class="tab-content">
            <van-search 
              v-model="searchForm" 
              placeholder="搜索表单组件" 
            />
            <van-cell-group>
              <van-cell
                v-for="component in filteredFormComponents"
                :key="component.name"
                :title="component.name"
                :label="component.title"
                is-link
                @click="showComponent(component)"
              />
            </van-cell-group>
          </div>
        </van-tab>

        <!-- 业务组件 -->
        <van-tab title="业务组件" name="business">
          <div class="tab-content">
            <van-search 
              v-model="searchBusiness" 
              placeholder="搜索业务组件" 
            />
            <van-cell-group>
              <van-cell
                v-for="component in filteredBusinessComponents"
                :key="component.name"
                :title="component.name"
                :label="component.title"
                is-link
                @click="showComponent(component)"
              />
            </van-cell-group>
          </div>
        </van-tab>

        <!-- 其他组件 -->
        <van-tab title="其他组件" name="others">
          <div class="tab-content">
            <van-search 
              v-model="searchOthers" 
              placeholder="搜索其他组件" 
            />
            <van-cell-group>
              <van-cell
                v-for="component in filteredOtherComponents"
                :key="component.name"
                :title="component.name"
                :label="component.title"
                is-link
                @click="showComponent(component)"
              />
            </van-cell-group>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 组件演示弹窗 -->
    <van-popup 
      v-model:show="showDemo" 
      position="bottom" 
      :style="{ height: '70%' }"
      round
      closeable
    >
      <div class="demo-popup">
        <div class="demo-header">
          <h3>{{ currentComponent?.name }}</h3>
          <p>{{ currentComponent?.title }}</p>
        </div>
        
        <div class="demo-content">
          <div class="component-wrapper">
            <!-- 组件渲染区域 -->
            <div class="component-demo">
              <!-- 司机安排组件特殊处理 -->
              <div v-if="currentComponent?.name === 'FaceArrangeDrivers'" style="padding: 20px;">
                <van-button
                  type="primary"
                  block
                  @click="showArrangeDriverModal = true"
                >
                  排司机
                </van-button>

                <component
                  :is="currentComponent.component"
                  :show="showArrangeDriverModal"
                  :orderInfo="currentComponent.props?.orderInfo"
                  @update:show="showArrangeDriverModal = $event"
                  @close="showArrangeDriverModal = false"
                  @onOk="handleArrangeDriverSuccess"
                />
              </div>

              <!-- 取消政策弹窗组件特殊处理 -->
              <div v-else-if="currentComponent?.name === 'FaceCancelPolicyModal'" style="padding: 20px;">
                <van-button
                  type="warning"
                  block
                  @click="showCancelPolicyModal = true"
                >
                  取消政策
                </van-button>

                <component
                  :is="currentComponent.component"
                  :show="showCancelPolicyModal"
                  :orderId="currentComponent.props?.orderId"
                  :orderStatus="currentComponent.props?.orderStatus"
                  @update:show="showCancelPolicyModal = $event"
                  @close="showCancelPolicyModal = false"
                  @cancel-order="handleCancelOrder"
                />
              </div>

              <!-- 押金政策弹窗组件特殊处理 -->
              <div v-else-if="currentComponent?.name === 'FaceDepositPolicyModal'" style="padding: 20px;">
                <van-button
                  type="primary"
                  block
                  @click="showDepositPolicyModal = true"
                >
                  押金政策
                </van-button>

                <component
                  :is="currentComponent.component"
                  :show="showDepositPolicyModal"
                  :orderId="currentComponent.props?.orderId"
                  @update:show="showDepositPolicyModal = $event"
                  @close="showDepositPolicyModal = false"
                />
              </div>

              <!-- 服务详情弹窗组件特殊处理 -->
              <div v-else-if="currentComponent?.name === 'FaceServiceDetailModal'" style="padding: 20px;">
                <van-button
                  type="primary"
                  block
                  @click="showServiceDetailModal = true"
                >
                  查看服务详情
                </van-button>

                <component
                  :is="currentComponent.component"
                  :show="showServiceDetailModal"
                  :orderId="currentComponent.props?.orderId"
                  :serviceId="currentComponent.props?.serviceId"
                  @update:show="showServiceDetailModal = $event"
                />
              </div>

              <!-- 车辆外观组件特殊处理 -->
              <div v-else-if="currentComponent?.name === 'FaceVehicleAppearance'" style="width: 100%;">
                <div class="vehicle-demo-header">
                  <div class="demo-actions">
                    <van-button size="small" @click="resetAllDamage">全部重置</van-button>
                    <van-button size="small" type="warning" @click="setRandomDamage">随机损坏</van-button>
                  </div>
                </div>

                <component
                  :is="currentComponent.component"
                  :list="vehicleAppearanceList"
                  v-bind="currentComponent.props || {}"
                  @change="handleVehicleAppearanceChange"
                />
              </div>

              <!-- 任务日期组件特殊处理 -->
              <div v-else-if="currentComponent?.name === 'FaceTaskDate'" style="padding: 20px;width: 100%;">
                <div class="task-date-demo">
                  <div class="demo-info">
                    <p>当前开始时间: {{ formatDate(taskDateValue.startTime) }}</p>
                    <p>当前结束时间: {{ formatDate(taskDateValue.endTime) }}</p>
                  </div>
                  <van-button
                    type="primary"
                    block
                    @click="showTaskDateModal = true"
                  >
                    选择任务日期
                  </van-button>
                </div>

                <component
                  :is="currentComponent.component"
                  :show="showTaskDateModal"
                  :modelValue="taskDateValue"
                  @cancel="showTaskDateModal = false"
                  @confirm="handleTaskDateConfirm"
                />
              </div>

              <!-- 日历选择器组件特殊处理 -->
              <div v-else-if="currentComponent?.name === 'FaceCalendarPicker'" style="padding: 20px;width: 100%;">
                <div class="calendar-demo">
                  <div class="demo-info" v-if="calendarSelectedRange.start && calendarSelectedRange.end">
                    <p>开始时间: {{ calendarSelectedRange.start }}</p>
                    <p>结束时间: {{ calendarSelectedRange.end }}</p>
                  </div>
                  <van-button
                    type="primary"
                    block
                    @click="showCalendarPicker = true"
                  >
                    请选择时间
                  </van-button>
                </div>

                <component
                  :is="currentComponent.component"
                  :show="showCalendarPicker"
                  :closeOnPopstate="false"
                  @update:show="showCalendarPicker = $event"
                  @confirm="handleCalendarConfirm"
                />
              </div>

              <!-- 媒体预览组件特殊处理 -->
              <div v-else-if="currentComponent?.name === 'FaceMediaPreview'" style="padding: 20px;width: 100%;">
                <div class="media-preview-demo">
                  <van-button
                    type="primary"
                    block
                    @click="showMediaPreview = true"
                  >
                    打开媒体预览
                  </van-button>

                  <component
                    :is="currentComponent.component"
                    :show="showMediaPreview"
                    :medias="currentComponent.props.medias"
                    :source="currentComponent.props.source"
                    @update:show="showMediaPreview = $event"
                  />
                </div>
              </div>

              <!-- 页面加载组件特殊处理 -->
              <div v-else-if="currentComponent?.name === 'FacePageLoading'" style="padding: 20px;width: 100%;">
                <div class="page-loading-demo">
                  <p style="margin-bottom: 16px; color: #666;">
                    模拟页面加载状态
                  </p>

                  <!-- 模拟内容区域 -->
                  <div style="position: relative; min-height: 200px; background: #f7f8fa; border-radius: 8px; padding: 16px;">
                    <div style="margin-bottom: 16px;">
                      <div style="height: 16px; background: #e5e5e5; border-radius: 4px; margin-bottom: 8px;"></div>
                      <div style="height: 16px; background: #e5e5e5; border-radius: 4px; width: 60%;"></div>
                    </div>
                    <div style="margin-bottom: 16px;">
                      <div style="height: 16px; background: #e5e5e5; border-radius: 4px; margin-bottom: 8px;"></div>
                      <div style="height: 16px; background: #e5e5e5; border-radius: 4px;"></div>
                    </div>

                    <!-- 页面加载组件覆盖在内容上方 -->
                    <component
                      :is="currentComponent.component"
                      v-bind="currentComponent.props || {}"
                    />
                  </div>
                </div>
              </div>

              <!-- 导航栏组件特殊处理 -->
              <div v-else-if="currentComponent?.name === 'FaceNavigateBar'" style="padding: 0; width: 100%;">
                <div class="navigate-bar-demo">
                  <!-- 导航栏组件 -->
                  <component
                    :is="currentComponent.component"
                    v-bind="currentComponent.props || {}"
                  />
                </div>
              </div>

              <!-- 权限组件特殊处理 -->
              <div v-else-if="currentComponent?.name === 'FaceRoles'" style="padding: 20px; width: 100%;">
                <div class="roles-demo">

                  <!-- 权限演示区域 -->
                  <div style="background: #f7f8fa; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                    <h4 style="margin: 0 0 16px 0; font-size: 16px; color: #323233;">权限控制演示</h4>

                    <!-- 模拟有权限的情况 -->
                    <div style="background: white; border-radius: 6px; padding: 16px; margin-bottom: 12px; border-left: 4px solid #07c160;">
                      <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <span style="color: #07c160; font-weight: 500; margin-right: 8px;">✓ 有权限</span>
                        <span style="color: #666; font-size: 12px;">用户拥有 'user.edit' 权限</span>
                      </div>
                      <van-button type="primary" size="small" style="margin-right: 8px;">编辑用户</van-button>
                    </div>

                    <!-- 模拟无权限的情况 -->
                    <div style="background: white; border-radius: 6px; padding: 16px; border-left: 4px solid #ee0a24;">
                      <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <span style="color: #ee0a24; font-weight: 500; margin-right: 8px;">✗ 无权限</span>
                        <span style="color: #666; font-size: 12px;">用户没有 'user.edit' 权限</span>
                      </div>
                      <span style="color: #999; font-size: 14px;">此处的编辑用户按钮不会显示</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 选择器组件特殊处理 -->
              <component
                v-else-if="currentComponent?.name === 'FaceSelector'"
                :is="currentComponent.component"
                :value="selectorValue"
                :options="currentComponent.props?.options || []"
                :fieldNames="currentComponent.props?.fieldNames"
                @change="handleSelectorChange"
              />

              <!-- 其他组件正常渲染 -->
              <component
                v-else-if="currentComponent?.component"
                :is="currentComponent.component"
                v-bind="currentComponent.props || {}"
                v-model="componentModel"
                @error="handleComponentError"
              />

              <van-empty v-if="!currentComponent?.component" description="组件加载失败" />
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, markRaw, watch } from 'vue'
import { 
  FaceActionSheetField, FaceCalendarField, FaceCustomFieldValue, FaceDatetimeField,
  FaceRadioField, FaceSelectField, FaceSlideField, FaceStoreField, FaceTagsField,
  faceTextUploadField, FaceUploadField, FaceUploadFieldNative,
  FaceArrangeDrivers, FaceCancelPolicyModal, FaceComboFeePanel, FaceDepositPolicyModal,
  FaceLongOrderLeachBar, FaceLongOrderSearchBar, FaceOrderContract, FaceOrderContractContent,
  FaceOrderLeachBar, FaceOrderSearchBar, FaceRentalCarDepositPanel, FaceServiceDetailModal,
  FaceTaskDate, FaceVehicleAppearance,
  FaceCalendarPicker, FaceIntervalProgress, FaceMediaPreview, FaceMediaThumbs,
  FaceNavigateBar, FacePageLoading, FacePayAli, FaceRoles, FaceSelector,
  FaceSendCode,
} from './components'

// 状态
const activeTab = ref('form')
const showDemo = ref(false)
const currentComponent = ref(null)
const componentModel = ref({})

// 选择器组件状态
const selectorValue = ref('b') // 默认选中选项B
const searchForm = ref('')
const searchBusiness = ref('')
const searchOthers = ref('')

// 司机安排组件特殊状态
const showArrangeDriverModal = ref(false)
const arrangeDriverState = ref({
  pickupDriver: '待排司机',
  returnDriver: '待排司机'
})

// 取消政策弹窗组件特殊状态
const showCancelPolicyModal = ref(false)

// 押金政策弹窗组件特殊状态
const showDepositPolicyModal = ref(false)

// 服务详情弹窗组件特殊状态
const showServiceDetailModal = ref(false)

// 任务日期组件特殊状态
const showTaskDateModal = ref(false)
const taskDateValue = ref({
  startTime: new Date().getTime(),
  endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime() // 7天后
})

// 日历选择器组件特殊状态
const showCalendarPicker = ref(false)
const calendarSelectedRange = ref({
  start: '',
  end: ''
})

// 媒体预览组件特殊状态
const showMediaPreview = ref(false)

// 车辆外观组件特殊状态
const vehicleAppearanceList = ref([
  { appearanceNo: 1, appearanceName: '左前叶子板', damaged: 0 },
  { appearanceNo: 2, appearanceName: '前保', damaged: 0 },
  { appearanceNo: 3, appearanceName: '右前叶子板', damaged: 0 },
  { appearanceNo: 4, appearanceName: '左前轮', damaged: 0 },
  { appearanceNo: 5, appearanceName: '前机盖及前挡风', damaged: 0 },
  { appearanceNo: 6, appearanceName: '右前轮', damaged: 0 },
  { appearanceNo: 7, appearanceName: '左后视镜', damaged: 0 },
  { appearanceNo: 8, appearanceName: '左前门', damaged: 0 },
  { appearanceNo: 9, appearanceName: '左后门', damaged: 0 },
  { appearanceNo: 10, appearanceName: '车顶', damaged: 1 },
  { appearanceNo: 11, appearanceName: '右后视镜', damaged: 0 },
  { appearanceNo: 12, appearanceName: '右前门', damaged: 0 },
  { appearanceNo: 13, appearanceName: '右后门', damaged: 0 },
  { appearanceNo: 14, appearanceName: '左后轮', damaged: 0 },
  { appearanceNo: 15, appearanceName: '后机盖及后挡风', damaged: 0 },
  { appearanceNo: 16, appearanceName: '右后轮', damaged: 0 },
  { appearanceNo: 17, appearanceName: '左后叶子板', damaged: 0 },
  { appearanceNo: 18, appearanceName: '后保', damaged: 0 },
  { appearanceNo: 19, appearanceName: '右后叶子板', damaged: 0 }
])
const vehicleChangeLog = ref([])

// 安全组件包装
const safeComponent = (comp, name) => {
  try {
    if (!comp) {
      console.warn(`组件 ${name} 未找到`)
      return markRaw({
        template: `<van-empty description="${name} 未实现" />`
      })
    }

    // 直接返回原始组件，让它正常工作
    return markRaw(comp)
  } catch (error) {
    console.error(`组件 ${name} 包装失败:`, error)
    return markRaw({
      template: `<van-empty description="${name} 加载失败" />`
    })
  }
}

// 表单组件 (12个) - 带Mock数据
const formComponents = ref([
  {
    name: 'FaceActionSheetField',
    title: '动作面板组件',
    component: safeComponent(FaceActionSheetField, 'FaceActionSheetField'),
    props: {
      title: '选择操作',
      placeholder: '请选择操作',
      label: '操作类型',
      modelValue: { text: '编辑', value: 'edit' },
      actions: [
        { name: '编辑', value: 'edit' },
        { name: '删除', value: 'delete' },
        { name: '分享', value: 'share' }
      ]
    }
  },
  {
    name: 'FaceCalendarField',
    title: '日历组件',
    component: safeComponent(FaceCalendarField, 'FaceCalendarField'),
    props: {
      modelValue: [
        new Date('2025-01-01').getTime(),
        new Date('2025-01-07').getTime()
      ],
      format: 'yyyy-MM-dd',
      placeholder: '请选择日期',
      label: '选择日期范围'
    }
  },
  {
    name: 'FaceCustomFieldValue',
    title: '自定义值组件',
    component: safeComponent(FaceCustomFieldValue, 'FaceCustomFieldValue'),
    props: {
      value: 'custom_value',
      displayValue: '自定义显示值',
      placeholder: '请输入自定义值'
    }
  },
  {
    name: 'FaceDatetimeField',
    title: '日期时间组件',
    component: safeComponent(FaceDatetimeField, 'FaceDatetimeField'),
    props: {
      placeholder: '请选择日期时间',
      title: '选择日期时间'
    }
  },
  {
    name: 'FaceRadioField',
    title: '单选框组件',
    component: safeComponent(FaceRadioField, 'FaceRadioField'),
    props: {
      modelValue: 'option1',
      columns: [
        { text: '选项1', value: 'option1' },
        { text: '选项2', value: 'option2' },
        { text: '选项3', value: 'option3' }
      ],
      placeholder: '请选择选项',
      label: '单选选择',
      iconSize: '20px',
      justify: 'flex-start'
    }
  },
  {
    name: 'FaceSelectField',
    title: '下拉选择组件',
    component: safeComponent(FaceSelectField, 'FaceSelectField'),
    props: {
      modelValue: { text: '北京', value: 'beijing' },
      title: '选择城市',
      columns: [
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' }
      ],
      placeholder: '请选择城市',
      label: '城市选择'
    }
  },
  {
    name: 'FaceSlideField',
    title: '滑动组件',
    component: safeComponent(FaceSlideField, 'FaceSlideField'),
    props: {
      modelValue: 65,
      min: 0,
      max: 100,
      step: 25,
      label: '滑动选择',
      placeholder: '请滑动选择数值'
    }
  },
  {
    name: 'FaceStoreField',
    title: '门店组件',
    component: safeComponent(FaceStoreField, 'FaceStoreField'),
    props: {
      modelValue: { name: '北京朝阳店', id: 1 },
      placeholder: '请选择门店',
      label: '门店选择',
      title: '选择门店'
    }
  },
  {
    name: 'FaceTagsField',
    title: '标签组件',
    component: safeComponent(FaceTagsField, 'FaceTagsField'),
    props: {
      modelValue: [
        { label: '标签1', text: '标签1', value: 'tag1' },
        { label: '标签2', text: '标签2', value: 'tag2' }
      ],
      columns: [
        { label: '标签1', text: '标签1', value: 'tag1' },
        { label: '标签2', text: '标签2', value: 'tag2' },
        { label: '标签3', text: '标签3', value: 'tag3' },
        { label: '标签4', text: '标签4', value: 'tag4' }
      ],
      title: '选择标签',
      placeholder: '请选择标签',
      label: '标签选择',
      openSelectAll: true,
      search: true
    }
  },
  {
    name: 'faceTextUploadField',
    title: '文本上传组件',
    component: safeComponent(faceTextUploadField, 'faceTextUploadField'),
    props: {
      placeholder: '请上传文本文件',
      accept: '.txt,.doc,.docx'
    }
  },
  {
    name: 'FaceUploadField',
    title: '上传组件',
    component: safeComponent(FaceUploadField, 'FaceUploadField'),
    props: {
      modelValue: [],
      placeholder: '请上传文件',
      label: '文件上传',
      accept: 'image',
      maxCount: 3,
      uploadType: 'normal'
    }
  },
  {
    name: 'FaceUploadFieldNative',
    title: '原生上传组件',
    component: safeComponent(FaceUploadFieldNative, 'FaceUploadFieldNative'),
    props: {
      modelValue: [],
      type: 'image',
      maxCount: 3,
      placeholder: '请选择文件',
      label: '原生文件上传'
    }
  }
])

// 业务组件 (14个) - 带Mock数据
const businessComponents = ref([
  {
    name: 'FaceArrangeDrivers',
    title: '司机安排组件',
    component: safeComponent(FaceArrangeDrivers, 'FaceArrangeDrivers'),
    props: {
      show: false,  // 初始不显示
      orderInfo: {
        id: 1,
        orderId: 1,
        pickupStoreId: 1,
        returnStoreId: 2,
        pickupDateStr: '2025-01-15 09:00',
        returnDateStr: '2025-01-17 18:00',
        pickupStoreName: '北京朝阳店',
        returnStoreName: '北京海淀店',
        pickupAddr: '北京市朝阳区建国路88号',
        returnAddr: '北京市海淀区中关村大街1号',
        pickupDriver: '待排司机',
        returnDriver: '待排司机',
        orderStatusStr: '待取车'
      }
    }
  },
  {
    name: 'FaceCancelPolicyModal',
    title: '取消政策弹窗组件',
    component: safeComponent(FaceCancelPolicyModal, 'FaceCancelPolicyModal'),
    props: {
      show: false,  // 初始不显示
      orderId: 12345, // 订单ID
      orderStatus: 1,
      orderSource: 1 //线下渠道
    }
  },
  {
    name: 'FaceComboFeePanel',
    title: '套餐费用面板组件',
    component: safeComponent(FaceComboFeePanel, 'FaceComboFeePanel'),
    props: {
      title: '需要退费',
      label: '退费方式',
      addButtonText: '添加退费项',
      actionTitle: '选择费用类目',
      defaultRadio: '1',
      disabled: false,
      radios: [
        { text: '线下退费', value: '1' },
        { text: '其他', value: '2' }
      ],
      actions: [
        { name: '退费项目1', value: 'refund1' },
        { name: '退费项目2', value: 'refund2' },
        { name: '退费项目3', value: 'refund3' }
      ],
      zzqhTf: [
        {
          id: 1,
          itemName: '转租期货退费',
          itemType: 1,
          expenseAmount: 10000,
          expenseItemPropId: 1,
          wctData: {}
        },
        {
          id: 2,
          itemName: '转租期货退费2',
          itemType: 1,
          expenseAmount: 15000,
          expenseItemPropId: 2,
          wctData: {}
        }
      ],
      initValue: []
    }
  },
  {
    name: 'FaceDepositPolicyModal',
    title: '押金政策弹窗组件',
    component: safeComponent(FaceDepositPolicyModal, 'FaceDepositPolicyModal'),
    props: {
      show: false,
      orderId: 12345
    }
  },
  {
    name: 'FaceLongOrderLeachBar',
    title: '长租订单筛选栏组件',
    component: safeComponent(FaceLongOrderLeachBar, 'FaceLongOrderLeachBar'),
    props: {
      filters: ['全部', '进行中', '已完成', '已取消']
    }
  },
  {
    name: 'FaceLongOrderSearchBar',
    title: '长租订单搜索栏组件',
    component: safeComponent(FaceLongOrderSearchBar, 'FaceLongOrderSearchBar'),
    props: {
      placeholder: '搜索订单号、车牌号'
    }
  },
  {
    name: 'FaceOrderContract',
    title: '订单合同组件',
    component: safeComponent(FaceOrderContract, 'FaceOrderContract'),
    props: {
      show: true,
      type: 'pickup', // pickup 取车 或 return 还车
      actualPickupTime: '2025-01-11 10:30:00',
      actualReturnTime: '2025-01-13 18:00:00',
      pickupMileage: '12580',
      pickupOilLiter: 45,
      maxOilLiter: 50,
      oilElectric: 90,
      oilElectric2: 85,
      returnMileage: '12850',
      returnOilLiter: 42,
      signatureUrl: '/src/mock/image/car3.jpg',
      vehicleNo: '京A12345',
      contractInfo: {
        rentForm: {
          orderInfoItemList: [
            { item: 'customerName', itemName: '客户姓名', value: '张三' },
            { item: 'mobile', itemName: '联系电话', value: '13800138000' },
            { item: 'idCard', itemName: '身份证号', value: '110101199001011234' },
            { item: 'driverLicense', itemName: '驾驶证号', value: 'D110101199001011234' },
            { item: 'address', itemName: '联系地址', value: '北京市朝阳区xxx路xxx号' }
          ],
          vehicleInfoItemList: [
            { item: 'vehicleModel', itemName: '车型', value: '大众朗逸' },
            { item: 'vehicleNo', itemName: '车牌号', value: '京A12345' },
            { item: 'color', itemName: '颜色', value: '白色' },
            { item: 'engineNo', itemName: '发动机号', value: 'ABC123456' },
            { item: 'frameNo', itemName: '车架号', value: 'LSGGG54X8EG123456' },
            { item: 'pickupTime', itemName: '取车时间', value: '2025-01-11 10:30' },
            { item: 'returnTime', itemName: '还车时间', value: '2025-01-13 18:00' },
            { item: 'pickupLocation', itemName: '取车地点', value: '北京朝阳店' },
            { item: 'returnLocation', itemName: '还车地点', value: '北京朝阳店' }
          ],
          servicePriceItemList: [
            { item: 'dailyRent', itemName: '日租金', value: '￥300.00/天' },
            { item: 'insuranceFee', itemName: '保险费', value: '￥50.00' },
            { item: 'serviceFee', itemName: '服务费', value: '￥20.00' },
            { item: 'deposit', itemName: '押金', value: '￥500.00' },
            { item: 'totalAmount', itemName: '总计', value: '￥870.00' }
          ]
        },
        rentalAgreement: '<div style="font-size: 12px; line-height: 1.6; text-align: justify;"><p><strong>1、任何公司内部的车辆，不得私自使用，如需号、需号、车牌、证照等，必须经过公司同意后方可使用。</strong></p><p><strong>2、乙方承租的车辆，租赁期间乙方对该车辆享有使用权，乙方有义务妥善保管车辆，不得将车辆用于非法用途。</strong></p><p><strong>3、乙方承租的车辆，租赁期间乙方对该车辆享有使用权，乙方有义务妥善保管车辆，不得将车辆用于非法用途。</strong></p><p><strong>4、乙方承租的车辆，租赁期间乙方对该车辆享有使用权，乙方有义务妥善保管车辆，不得将车辆用于非法用途——详见合同，所在地的——功能失效方案只有一份。</strong></p><p>第十二条：其它事项</p><p>一、车辆发生事故和故障时除外第一时间知识方，本合同一式两份，乙方各持一份。</p><p><strong>2、为了双方友好履行甲乙合同，请乙方认真阅读合同，不明之处，可向甲方咨询！合同后甲乙双方必须严格按合同执行，双方应友好协商解决，若不能解决，双方应友好商议并可行政诉讼解决。</strong></p></div>',
        specialItem: '<div style="font-size: 12px; line-height: 1.6;"><p><strong>验车单</strong></p></div>',
        signatureBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      },
      interiorList: [
        { inspectionId: 1, name: '玻璃', damaged: 1, newDamaged: 0 },
        { inspectionId: 2, name: '轮胎', damaged: 0, newDamaged: 0 },
        { inspectionId: 3, name: '中控', damaged: 0, newDamaged: 0 },
        { inspectionId: 4, name: '仪表盘', damaged: 0, newDamaged: 0 },
        { inspectionId: 5, name: '车窗升降', damaged: 0, newDamaged: 0 },
        { inspectionId: 6, name: '照明系统', damaged: 0, newDamaged: 0 },
        { inspectionId: 7, name: '音响系统', damaged: 0, newDamaged: 0 },
        { inspectionId: 8, name: '空调', damaged: 0, newDamaged: 0 },
        { inspectionId: 9, name: '雨刮', damaged: 0, newDamaged: 0 },
        { inspectionId: 10, name: '刹车（手刹）', damaged: 0, newDamaged: 0 },
        { inspectionId: 11, name: '安全带', damaged: 0, newDamaged: 0 },
        { inspectionId: 12, name: '内饰', damaged: 0, newDamaged: 0 },
        { inspectionId: 13, name: '车内按键开关', damaged: 0, newDamaged: 0 },
        { inspectionId: 14, name: '行车记录仪', damaged: 0, newDamaged: 0 },
        { inspectionId: 15, name: 'ETC', damaged: 0, newDamaged: 0 },
        { inspectionId: 16, name: '导航', damaged: 0, newDamaged: 0 }
      ],
      appearanceList: [
        { appearanceNo: 1, appearanceName: '左后视镜', damaged: 0, newDamaged: 0 },
        { appearanceNo: 2, appearanceName: '左前门', damaged: 0, newDamaged: 0 },
        { appearanceNo: 3, appearanceName: '左后门', damaged: 0, newDamaged: 0 },
        { appearanceNo: 4, appearanceName: '车顶', damaged: 1, newDamaged: 0 },
        { appearanceNo: 5, appearanceName: '右后视镜', damaged: 0, newDamaged: 0 },
        { appearanceNo: 6, appearanceName: '右前门', damaged: 0, newDamaged: 0 },
        { appearanceNo: 7, appearanceName: '右后门', damaged: 0, newDamaged: 0 },
        { appearanceNo: 8, appearanceName: '左后叶子板', damaged: 0, newDamaged: 0 },
        { appearanceNo: 9, appearanceName: '后挡风玻璃及前挡风玻璃', damaged: 0, newDamaged: 0 },
        { appearanceNo: 10, appearanceName: '右后叶子板', damaged: 0, newDamaged: 0 },
        { appearanceNo: 11, appearanceName: '左后轮', damaged: 0, newDamaged: 0 },
        { appearanceNo: 12, appearanceName: '后保', damaged: 0, newDamaged: 0 },
        { appearanceNo: 13, appearanceName: '右后轮', damaged: 0, newDamaged: 0 }
      ],
      appearanceRemark: '123',
      payItems: [
        { itemName: '租金', payMode: '微信支付', value: 300.00 },
        { itemName: '保险费', payMode: '支付宝', value: 50.00 },
        { itemName: '服务费', payMode: '微信支付', value: 20.00 }
      ],
      refundItems: [
        { itemName: '押金退还', payMode: '原路退回', value: 500.00 }
      ],
      receivableAmount: 37000, // 分为单位
      payAmount: 37000 // 分为单位
    }
  },
  {
    name: 'FaceOrderContractContent',
    title: '订单合同内容组件',
    component: safeComponent(FaceOrderContractContent, 'FaceOrderContractContent'),
    props: {
      show: true,
      type: 'pickup',
      contractInfo: {
        rentalAgreement: `
          <h3>租车协议条款</h3>
          <p><strong>第一条 租赁车辆</strong></p>
          <p>1. 出租方同意将车辆租赁给承租方使用，承租方同意按照本协议条款租用该车辆。</p>
          <p>2. 车辆信息：品牌型号、车牌号码、发动机号等详见车辆交接单。</p>

          <p><strong>第二条 租赁期限</strong></p>
          <p>1. 租赁期限自取车之日起至还车之日止。</p>
          <p>2. 如需延长租期，须提前24小时通知出租方并办理相关手续。</p>

          <p><strong>第三条 租金及费用</strong></p>
          <p>1. 租金按日计算，具体金额详见订单信息。</p>
          <p>2. 承租方应按时支付租金及相关费用。</p>

          <p><strong>第四条 车辆使用</strong></p>
          <p>1. 承租方应合法使用车辆，不得用于违法活动。</p>
          <p>2. 承租方应爱护车辆，正常使用和维护。</p>
          <p>3. 未经出租方同意，不得将车辆转租或抵押给第三方。</p>
        `,
        specialItem: `
          <h3>特殊条款</h3>
          <p><strong>违约责任：</strong></p>
          <p>1. 承租方逾期还车的，每日按租金的2%支付违约金。</p>
          <p>2. 车辆发生事故或损坏，承租方应承担相应责任和费用。</p>

          <p><strong>保险条款：</strong></p>
          <p>1. 车辆已投保交强险和商业险。</p>
          <p>2. 发生保险事故时，承租方应配合处理相关事宜。</p>

          <p><strong>其他约定：</strong></p>
          <p>1. 本协议一式两份，双方各执一份，具有同等法律效力。</p>
          <p>2. 本协议未尽事宜，双方可另行协商解决。</p>
          <p>3. 因本协议发生争议，由出租方所在地人民法院管辖。</p>
        `
      }
    }
  },
  {
    name: 'FaceOrderLeachBar',
    title: '订单筛选栏组件',
    component: safeComponent(FaceOrderLeachBar, 'FaceOrderLeachBar'),
    props: {
      filters: ['全部订单', '待支付', '进行中', '已完成']
    }
  },
  {
    name: 'FaceOrderSearchBar',
    title: '订单搜索栏组件',
    component: safeComponent(FaceOrderSearchBar, 'FaceOrderSearchBar'),
    props: {
      placeholder: '搜索订单'
    }
  },
  {
    name: 'FaceRentalCarDepositPanel',
    title: '租车押金面板组件',
    component: safeComponent(FaceRentalCarDepositPanel, 'FaceRentalCarDepositPanel'),
    props: {
      payStatus: 1, // 1表示已支付，0表示未支付
      payStatusName: '已授权',
      rentDepositAmount: '3000.00',
      deductionMethod: '微信支付',
      disabled: false
    }
  },
  {
    name: 'FaceServiceDetailModal',
    title: '服务详情弹窗组件',
    component: safeComponent(FaceServiceDetailModal, 'FaceServiceDetailModal'),
    props: {
      show: true,
      orderId: 'ORD20250114001',
      serviceId: 1
    }
  },
  {
    name: 'FaceTaskDate',
    title: '任务日期组件',
    component: safeComponent(FaceTaskDate, 'FaceTaskDate'),
    props: {
      show: true,
      modelValue: {
        startTime: new Date().getTime(),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime() // 7天后
      }
    }
  },
  {
    name: 'FaceVehicleAppearance',
    title: '车辆外观组件',
    component: safeComponent(FaceVehicleAppearance, 'FaceVehicleAppearance'),
    get props() {
      return {
        list: vehicleAppearanceList.value
      }
    }
  }
])

// 其他组件 (11个) - 带Mock数据
const otherComponents = ref([
  {
    name: 'FaceCalendarPicker',
    title: '日历选择器组件',
    component: safeComponent(FaceCalendarPicker, 'FaceCalendarPicker'),
    props: {
      show: false,
      closeOnPopstate: false
    }
  },
  {
    name: 'FaceIntervalProgress',
    title: '区间进度条组件',
    component: safeComponent(FaceIntervalProgress, 'FaceIntervalProgress'),
    props: {
      OilElectricity: 65,
      isOilElectricity: 1, // 0表示电，1表示油
      OilLiter: 45
    }
  },
  {
    name: 'FaceMediaPreview',
    title: '媒体预览组件',
    component: safeComponent(FaceMediaPreview, 'FaceMediaPreview'),
    props: {
      show: false,
      medias: [
        '/src/mock/image/car1.jpg',
        '/src/mock/image/car2.jpeg',
        '/src/mock/image/car3.jpg',
      ],
      source: 'demo'
    }
  },
  {
    name: 'FaceMediaThumbs',
    title: '媒体缩略图组件',
    component: safeComponent(FaceMediaThumbs, 'FaceMediaThumbs'),
    props: {
      thumbs: [
        '/src/mock/image/car1.jpg',
        '/src/mock/image/car2.jpeg',
        '/src/mock/image/car3.jpg',
      ]
    }
  },
  {
    name: 'FaceNavigateBar',
    title: '导航栏组件',
    component: safeComponent(FaceNavigateBar, 'FaceNavigateBar'),
    props: {
      title: '导航栏演示',
      btnTxt: '更多',
      rightText: '设置'
    }
  },
  {
    name: 'FacePageLoading',
    title: '页面加载组件',
    component: safeComponent(FacePageLoading, 'FacePageLoading'),
    props: {
      loading: true,
      text: '加载中...'
    }
  },
  {
    name: 'FacePayAli',
    title: '支付宝支付组件',
    component: safeComponent(FacePayAli, 'FacePayAli'),
    props: {
      amount: 299.00,

      orderNo: 'ORDER202312001'
    }
  },
  {
    name: 'FaceRoles',
    title: '权限组件',
    component: safeComponent(FaceRoles, 'FaceRoles'),
    props: {
      allowed: 'user.edit'
    }
  },
  {
    name: 'FaceSelector',
    title: '选择器组件',
    component: safeComponent(FaceSelector, 'FaceSelector'),
    props: {
      options: [
        { label: '选项A', value: 'a' },
        { label: '选项B', value: 'b' },
        { label: '选项C', value: 'c' }
      ],
      fieldNames: {
        label: 'label',
        value: 'value'
      }
    }
  },
  {
    name: 'FaceSendCode',
    title: '发送验证码组件',
    component: safeComponent(FaceSendCode, 'FaceSendCode'),
    props: {
      phone: '13800138000',
      countdown: 60
    }
  }
])

// 搜索过滤
const filteredFormComponents = computed(() => 
  formComponents.value.filter(comp => 
    comp.name.toLowerCase().includes(searchForm.value.toLowerCase()) ||
    comp.title.toLowerCase().includes(searchForm.value.toLowerCase())
  )
)

const filteredBusinessComponents = computed(() => 
  businessComponents.value.filter(comp => 
    comp.name.toLowerCase().includes(searchBusiness.value.toLowerCase()) ||
    comp.title.toLowerCase().includes(searchBusiness.value.toLowerCase())
  )
)

const filteredOtherComponents = computed(() =>
  otherComponents.value.filter(comp =>
    comp.name.toLowerCase().includes(searchOthers.value.toLowerCase()) ||
    comp.title.toLowerCase().includes(searchOthers.value.toLowerCase())
  )
)

// 车辆外观组件相关计算属性
const damagedCount = computed(() =>
  vehicleAppearanceList.value.filter(item => item.damaged === 1).length
)

const normalCount = computed(() =>
  vehicleAppearanceList.value.filter(item => item.damaged === 0).length
)

const damageRate = computed(() =>
  vehicleAppearanceList.value.length > 0
    ? ((damagedCount.value / vehicleAppearanceList.value.length) * 100).toFixed(1)
    : '0.0'
)

// 方法
const showComponent = (component) => {
  currentComponent.value = component
  // 重置组件模型数据
  componentModel.value = component.props?.modelValue || {}
  showDemo.value = true
  console.log('显示组件:', component.name, '属性:', component.props)
}

const handleComponentError = (error) => {
  console.error('组件渲染错误:', error)
}

// 处理点击安排司机按钮
const handleArrangeDriverClick = () => {
  console.log('点击安排司机按钮')
  console.log('当前showArrangeDriverModal:', showArrangeDriverModal.value)
  showArrangeDriverModal.value = true
  console.log('设置后showArrangeDriverModal:', showArrangeDriverModal.value)
}

// 处理司机安排成功
const handleArrangeDriverSuccess = () => {
  console.log('司机安排成功')
  showArrangeDriverModal.value = false
  arrangeDriverState.value.pickupDriver = '张师傅'
  arrangeDriverState.value.returnDriver = '李师傅'
}

// 处理选择器变化
const handleSelectorChange = (value) => {
  console.log('选择器值变化:', value)
  selectorValue.value = value
}

// 监听弹窗关闭，重置组件状态
watch(showDemo, (newVal) => {
  if (!newVal) {
    // 弹窗关闭时重置所有组件状态
    selectorValue.value = 'b' // 重置为默认选中选项B
    componentModel.value = {}
  }
})

// 处理取消订单
const handleCancelOrder = () => {
  showCancelPolicyModal.value = false
  console.log('订单取消成功')
}

// 车辆外观组件事件处理
const handleVehicleAppearanceChange = (position) => {
  const item = vehicleAppearanceList.value.find(v => v.appearanceNo === position)
  if (item) {
    // 切换损坏状态
    item.damaged = item.damaged === 1 ? 0 : 1

    // 记录操作日志
    const timestamp = new Date().toLocaleTimeString()
    const action = item.damaged === 1 ? '标记损坏' : '标记完好'
    const logMessage = `${timestamp} - ${item.appearanceName}: ${action}`
    vehicleChangeLog.value.push(logMessage)

    // 强制触发响应式更新
    vehicleAppearanceList.value = [...vehicleAppearanceList.value]

    console.log('车辆外观状态变更:', {
      position,
      name: item.appearanceName,
      damaged: item.damaged,
      totalDamaged: damagedCount.value
    })
  }
}

// 重置所有损坏状态
const resetAllDamage = () => {
  // 将所有damaged设置为0
  vehicleAppearanceList.value = vehicleAppearanceList.value.map(item => ({
    ...item,
    damaged: 0
  }))

  const timestamp = new Date().toLocaleTimeString()
  vehicleChangeLog.value.push(`${timestamp} - 全部重置为完好状态`)
  console.log('重置所有车辆外观状态')
}

// 设置随机损坏
const setRandomDamage = () => {
  // 随机选择3-6个部位设置为损坏
  const damageCount = Math.floor(Math.random() * 4) + 3
  const positions = []

  // 随机选择部位
  while (positions.length < damageCount) {
    const randomPos = Math.floor(Math.random() * 19) + 1
    if (!positions.includes(randomPos)) {
      positions.push(randomPos)
    }
  }

  // 更新状态：先重置所有，再设置选中的为损坏
  vehicleAppearanceList.value = vehicleAppearanceList.value.map(item => ({
    ...item,
    damaged: positions.includes(item.appearanceNo) ? 1 : 0
  }))

  const timestamp = new Date().toLocaleTimeString()
  const damagedNames = vehicleAppearanceList.value
    .filter(item => item.damaged === 1)
    .map(item => item.appearanceName)
    .join('、')

  vehicleChangeLog.value.push(`${timestamp} - 随机设置损坏: ${damagedNames}`)
  console.log('设置随机损坏:', {
    positions,
    damagedNames,
    count: damageCount
  })
}

// 任务日期组件事件处理
const handleTaskDateConfirm = (dateRange) => {
  taskDateValue.value = dateRange
  showTaskDateModal.value = false
  console.log('任务日期确认:', {
    startTime: new Date(dateRange.startTime),
    endTime: new Date(dateRange.endTime)
  })
}

// 格式化日期显示
const formatDate = (timestamp) => {
  if (!timestamp) return '未设置'
  const date = new Date(timestamp)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 日历选择器组件事件处理
const handleCalendarConfirm = (dateRange) => {
  if (dateRange && dateRange.length === 2) {
    const startDate = new Date(dateRange[0])
    const endDate = new Date(dateRange[1])

    calendarSelectedRange.value = {
      start: startDate.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      end: endDate.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    showCalendarPicker.value = false
    console.log('日历选择确认:', {
      start: calendarSelectedRange.value.start,
      end: calendarSelectedRange.value.end,
      originalData: dateRange
    })
  }
}


</script>

<style scoped>
#app {
  min-height: 100vh;
  background: #f7f8fa;
}

.demo-container {
  padding-top: 46px;
}

.tab-content {
  padding: 16px;
}

.demo-popup {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.demo-header {
  padding: 20px;
  border-bottom: 1px solid #ebedf0;
  background: #fff;
}

.demo-header h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #323233;
}

.demo-header p {
  margin: 0;
  font-size: 14px;
  color: #969799;
}

.demo-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.component-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.component-demo {
  min-height: 200px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #ebedf0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.component-info {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.props-info {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.props-display {
  padding: 16px;
  background: #f7f8fa;
  margin: 0 16px 16px 16px;
  border-radius: 8px;
}

.props-display pre {
  margin: 0;
  font-size: 12px;
  color: #666;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
.vehicle-demo-header{
  .demo-actions{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .demo-actions button {
    margin-right: 8px;
  }
}

/* 日历选择器演示样式 */
.calendar-demo {
  h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    color: #323233;
  }

  .demo-info {
    margin-bottom: 16px;
    padding: 12px;
    background: #f7f8fa;
    border-radius: 8px;

    p {
      margin: 0 0 4px 0;
      font-size: 14px;
      color: #666;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

/* 任务日期演示样式 */
.task-date-demo {
  h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    color: #323233;
  }

  .demo-info {
    margin-bottom: 16px;
    padding: 12px;
    background: #f7f8fa;
    border-radius: 8px;

    p {
      margin: 0 0 4px 0;
      font-size: 14px;
      color: #666;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

/* 页面加载演示样式 */
.page-loading-demo {
  h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    color: #323233;
  }

  p {
    margin: 0 0 16px 0;
    font-size: 14px;
    color: #666;
  }

  .demo-content-area {
    position: relative;
    min-height: 200px;
    background: #f7f8fa;
    border-radius: 8px;
    padding: 16px;

    .demo-content-item {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .demo-text-line {
      height: 16px;
      background: #e5e5e5;
      border-radius: 4px;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      &.short {
        width: 60%;
      }
    }
  }
}
</style>

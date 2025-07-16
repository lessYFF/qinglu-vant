import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 组件列表
const components = {
  form: [
    { name: 'FaceActionSheetField', title: '动作面板字段', filename: 'action-sheet-field' },
    { name: 'FaceCalendarField', title: '日历字段', filename: 'calendar-field' },
    { name: 'FaceCustomFieldValue', title: '自定义字段值', filename: 'custom-field-value' },
    { name: 'FaceDatetimeField', title: '日期时间字段', filename: 'datetime-field' },
    { name: 'FaceRadioField', title: '单选字段', filename: 'radio-field' },
    { name: 'FaceSelectField', title: '选择字段', filename: 'select-field' },
    { name: 'FaceSlideField', title: '滑动字段', filename: 'slide-field' },
    { name: 'FaceStoreField', title: '门店字段', filename: 'store-field' },
    { name: 'FaceTagsField', title: '标签字段', filename: 'tags-field' },
    { name: 'faceTextUploadField', title: '文本上传字段', filename: 'text-upload-field' },
    { name: 'FaceUploadField', title: '上传字段', filename: 'upload-field' },
    { name: 'FaceUploadFieldNative', title: '原生上传字段', filename: 'upload-field-native' }
  ],
  business: [
    { name: 'FaceArrangeDrivers', title: '司机安排', filename: 'arrange-drivers' },
    { name: 'FaceCancelPolicyModal', title: '取消政策弹窗', filename: 'cancel-policy-modal' },
    { name: 'FaceComboFeePanel', title: '套餐费用面板', filename: 'combo-fee-panel' },
    { name: 'FaceDepositPolicyModal', title: '押金政策弹窗', filename: 'deposit-policy-modal' },
    { name: 'FaceLongOrderLeachBar', title: '长租订单筛选栏', filename: 'long-order-leach-bar' },
    { name: 'FaceLongOrderSearchBar', title: '长租订单搜索栏', filename: 'long-order-search-bar' },
    { name: 'FaceOrderContract', title: '订单合同', filename: 'order-contract' },
    { name: 'FaceOrderContractContent', title: '订单合同内容', filename: 'order-contract-content' },
    { name: 'FaceOrderLeachBar', title: '订单筛选栏', filename: 'order-leach-bar' },
    { name: 'FaceOrderSearchBar', title: '订单搜索栏', filename: 'order-search-bar' },
    { name: 'FaceRentalCarDepositPanel', title: '租车押金面板', filename: 'rental-car-deposit-panel' },
    { name: 'FaceServiceDetailModal', title: '服务详情弹窗', filename: 'service-detail-modal' },
    { name: 'FaceTaskDate', title: '任务日期', filename: 'task-date' },
    { name: 'FaceVehicleAppearance', title: '车辆外观', filename: 'vehicle-appearance' }
  ],
  common: [
    { name: 'FaceCalendarPicker', title: '日历选择器', filename: 'calendar-picker' },
    { name: 'FaceIntervalProgress', title: '区间进度条', filename: 'interval-progress' },
    { name: 'FaceMediaPreview', title: '媒体预览', filename: 'media-preview' },
    { name: 'FaceMediaThumbs', title: '媒体缩略图', filename: 'media-thumbs' },
    { name: 'FaceNavigateBar', title: '导航栏', filename: 'navigate-bar' },
    { name: 'FacePageLoading', title: '页面加载', filename: 'page-loading' },
    { name: 'FacePayAli', title: '支付宝支付', filename: 'pay-ali' },
    { name: 'FaceRoles', title: '权限组件', filename: 'roles' },
    { name: 'FaceSelector', title: '选择器', filename: 'selector' },
    { name: 'FaceSendCode', title: '发送验证码', filename: 'send-code' },
    { name: 'FaceSteps', title: '步骤条', filename: 'steps' }
  ]
}

// 生成文档模板
function generateDocTemplate(componentName, title, category) {
  return `# ${componentName}

${title}组件，用于${title.toLowerCase()}功能。

## 基础用法

\`\`\`vue
<template>
  <${componentName}
    v-model="value"
    title="${title}"
  />
</template>

<script setup>
import { ref } from 'vue'
import { ${componentName} } from 'qinglu-vant'

const value = ref('')
</script>
\`\`\`

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定值 | any | - |
| title | 标题 | string | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | value: 当前值 |

### Slots

| 名称 | 说明 |
|------|------|
| default | 默认插槽 |

## 示例

### 基础示例

\`\`\`vue
<template>
  <${componentName}
    v-model="value"
    title="${title}"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')

const handleChange = (val) => {
  console.log('值变化:', val)
}
</script>
\`\`\`
`
}

// 创建文档文件
Object.keys(components).forEach(category => {
  components[category].forEach(component => {
    const docContent = generateDocTemplate(component.name, component.title, category)
    const filePath = path.join(__dirname, '..', 'docs', 'components', category, `${component.filename}.md`)
    
    fs.writeFileSync(filePath, docContent, 'utf8')
    console.log(`Created: ${filePath}`)
  })
})

console.log('所有组件文档已生成完成！')

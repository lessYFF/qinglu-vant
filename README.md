# 擎路H5组件库 (QingluVant)

基于 Vue 3 + Vant 的移动端组件库，专为擎路业务场景设计。

## ✨ 特性

- 🚀 基于 Vue 3 + Vant 4 构建
- 📱 专为移动端优化
- 🎨 支持主题定制
- 📦 开箱即用的高质量组件
- 🛠️ 完整的 TypeScript 支持
- 📖 详尽的文档和示例
- 🧪 完善的测试覆盖
- 🎭 丰富的 Mock 数据支持

## 📦 安装

```bash
npm install qinglu-vant
# 或
yarn add qinglu-vant
# 或
pnpm add qinglu-vant
```

## 🔨 使用

### 完整引入

```javascript
import { createApp } from 'vue'
import QingluVant from 'qinglu-vant'
import 'qinglu-vant/dist/style.css'

const app = createApp()
app.use(QingluVant)
```

### 按需引入

```javascript
import { FaceSelectField, FaceUploadField } from 'qinglu-vant'
```

## 📚 组件分类

### 表单组件 (Form Components) - 12个

- **FaceActionSheetField** - 动作面板字段组件
- **FaceCalendarField** - 日历字段组件
- **FaceCustomFieldValue** - 自定义字段值组件
- **FaceDatetimeField** - 日期时间字段组件
- **FaceRadioField** - 单选字段组件
- **FaceSelectField** - 选择字段组件
- **FaceSlideField** - 滑块字段组件
- **FaceStoreField** - 门店字段组件
- **FaceTagsField** - 标签字段组件
- **faceTextUploadField** - 文本上传字段组件
- **FaceUploadField** - 上传字段组件
- **FaceUploadFieldNative** - 原生上传字段组件

### 业务组件 (Business Components) - 14个

- **FaceArrangeDrivers** - 司机安排组件
- **FaceCancelPolicyModal** - 取消政策弹窗组件
- **FaceComboFeePanel** - 套餐费用面板组件
- **FaceDepositPolicyModal** - 押金政策弹窗组件
- **FaceLongOrderLeachBar** - 长期订单筛选栏组件
- **FaceLongOrderSearchBar** - 长期订单搜索栏组件
- **FaceOrderContract** - 订单合同组件
- **FaceOrderContractContent** - 订单合同内容组件
- **FaceOrderLeachBar** - 订单筛选栏组件
- **FaceOrderSearchBar** - 订单搜索栏组件
- **FaceRentalCarDepositPanel** - 租车押金面板组件
- **FaceServiceDetailModal** - 服务详情弹窗组件
- **FaceTaskDate** - 任务日期组件
- **FaceVehicleAppearance** - 车辆外观组件

### 通用组件 (Common Components) - 10个

- **FaceCalendarPicker** - 日历选择器组件
- **FaceIntervalProgress** - 间隔进度条组件
- **FaceMediaPreview** - 媒体预览组件
- **FaceMediaThumbs** - 媒体缩略图组件
- **FaceNavigateBar** - 导航栏组件
- **FacePageLoading** - 页面加载组件
- **FacePayAli** - 支付宝支付组件
- **FaceRoles** - 角色权限组件
- **FaceSelector** - 选择器组件
- **FaceSendCode** - 发送验证码组件

## 🎭 Mock 数据

组件库提供了完整的 Mock 数据支持，方便开发和测试：

### API 调用方式

```javascript
// 获取所有 Mock 数据
fetch('/api/mock/all')

// 获取特定组件的 Mock 数据
fetch('/api/mock/form/select-field?scenario=city')

// 获取 AI 模型数据
fetch('/api/mock/ai-model')
```

### JavaScript 调用方式

```javascript
import mockManager from 'qinglu-vant/mock'

// 获取表单选择字段的城市数据
const cityData = mockManager.getMockData('form', 'selectField', 'city')

// 获取车辆外观的损坏数据
const damageData = mockManager.getMockData('business', 'vehicleAppearance', 'damaged')
```

## 🔧 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建组件库
npm run build:lib

# 运行测试
npm run test

# 生成文档
npm run docs:build
```

## 📊 组件统计

- **总计**: 36个组件
- **表单组件**: 12个
- **业务组件**: 14个
- **通用组件**: 10个

## 📄 许可证

MIT License

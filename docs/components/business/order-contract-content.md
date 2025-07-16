# FaceOrderContractContent

订单合同内容组件，用于显示租车协议和特殊条款的具体内容。

## 基础用法

```vue
<template>
  <FaceOrderContractContent
    :show="showContent"
    type="pickup"
    :contract-info="contractInfo"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceOrderContractContent } from 'qinglu-vant'

const showContent = ref(true)
const contractInfo = ref({
  rentalAgreement: '<p>租车协议内容...</p>',
  specialItem: '<p>特殊条款内容...</p>'
})
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | 是否显示内容 | Boolean | false |
| type | 合同类型 | String | - |
| contractInfo | 合同信息对象 | Object | - |

#### contractInfo 对象结构

| 字段 | 说明 | 类型 |
|------|------|------|
| rentalAgreement | 租车协议HTML内容 | String |
| specialItem | 特殊条款HTML内容 | String |

## 示例

### 基础合同内容

```vue
<template>
  <div class="contract-content-demo">
    <van-button @click="showBasicContract = true">
      查看基础合同
    </van-button>

    <van-popup
      v-model:show="showBasicContract"
      position="bottom"
      style="height: 80%"
      round
      closeable
    >
      <div class="popup-content">
        <FaceOrderContractContent
          :show="showBasicContract"
          type="pickup"
          :contract-info="basicContractInfo"
        />
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showBasicContract = ref(false)

const basicContractInfo = ref({
  rentalAgreement: `
    <h3>租车协议</h3>
    <p>1. 租车人应当具备有效的驾驶证和身份证明。</p>
    <p>2. 租车期间，租车人应当遵守交通法规，安全驾驶。</p>
    <p>3. 租车人应当按时还车，如有延期需提前通知。</p>
    <p>4. 车辆损坏或丢失，租车人应当承担相应责任。</p>
    <p>5. 租车费用包含基本保险，不包含违章罚款。</p>
  `,
  specialItem: `
    <h3>特殊条款</h3>
    <p>1. 禁止将车辆用于非法用途。</p>
    <p>2. 禁止在车内吸烟。</p>
    <p>3. 禁止携带宠物（导盲犬除外）。</p>
    <p>4. 如遇自然灾害等不可抗力因素，双方协商解决。</p>
  `
})
</script>

<style scoped>
.contract-content-demo {
  padding: 16px;
}

.popup-content {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>
```

### 详细合同条款

```vue
<template>
  <div class="detailed-contract-demo">
    <van-button @click="showDetailedContract = true">
      查看详细合同
    </van-button>

    <van-popup
      v-model:show="showDetailedContract"
      position="bottom"
      style="height: 90%"
      round
      closeable
    >
      <div class="popup-header">
        <h2>租车合同详细条款</h2>
      </div>

      <div class="popup-content">
        <FaceOrderContractContent
          :show="showDetailedContract"
          type="pickup"
          :contract-info="detailedContractInfo"
        />
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showDetailedContract = ref(false)

const detailedContractInfo = ref({
  rentalAgreement: `
    <h3>汽车租赁协议</h3>

    <h4>第一条 租赁双方</h4>
    <p>出租方：青鹿租车有限公司</p>
    <p>承租方：客户（以下简称"租车人"）</p>

    <h4>第二条 租赁车辆</h4>
    <p>1. 车辆品牌型号：以实际交付车辆为准</p>
    <p>2. 车牌号码：以实际交付车辆为准</p>
    <p>3. 发动机号：以实际交付车辆为准</p>
    <p>4. 车架号：以实际交付车辆为准</p>

    <h4>第三条 租赁期限</h4>
    <p>1. 租赁期限：以订单约定时间为准</p>
    <p>2. 取车时间：以实际取车时间为准</p>
    <p>3. 还车时间：以实际还车时间为准</p>

    <h4>第四条 租金及费用</h4>
    <p>1. 租金标准：按订单约定执行</p>
    <p>2. 押金：按平台规定收取</p>
    <p>3. 违约金：超时按小时计费</p>

    <h4>第五条 双方权利义务</h4>
    <p>1. 出租方应提供车况良好的车辆</p>
    <p>2. 承租方应按时还车并保持车辆清洁</p>
    <p>3. 承租方应承担租赁期间的违章责任</p>

    <h4>第六条 保险条款</h4>
    <p>1. 车辆已投保交强险和商业险</p>
    <p>2. 发生事故时按保险条款处理</p>
    <p>3. 承租方需承担保险免赔额部分</p>

    <h4>第七条 违约责任</h4>
    <p>1. 逾期还车按日收取违约金</p>
    <p>2. 车辆损坏按实际损失赔偿</p>
    <p>3. 违法使用车辆承担法律责任</p>
  `,
  specialItem: `
    <h3>特殊约定事项</h3>

    <h4>使用限制</h4>
    <p>1. 禁止将车辆转租给第三方</p>
    <p>2. 禁止用于营运、竞赛等商业活动</p>
    <p>3. 禁止在车内吸烟、饮酒</p>
    <p>4. 禁止携带易燃易爆危险品</p>
    <p>5. 禁止私自改装车辆</p>

    <h4>特殊情况处理</h4>
    <p>1. 车辆故障时应立即联系客服</p>
    <p>2. 发生交通事故应立即报警并通知出租方</p>
    <p>3. 车辆被盗应立即报警并通知出租方</p>
    <p>4. 因不可抗力导致的损失双方协商解决</p>

    <h4>数据使用授权</h4>
    <p>1. 同意出租方收集车辆使用数据</p>
    <p>2. 同意出租方使用GPS等定位设备</p>
    <p>3. 同意出租方记录驾驶行为数据</p>

    <h4>争议解决</h4>
    <p>1. 因本协议产生的争议优先协商解决</p>
    <p>2. 协商不成可向有管辖权的法院起诉</p>
    <p>3. 适用中华人民共和国法律</p>
  `
})
</script>

<style scoped>
.detailed-contract-demo {
  padding: 16px;
}

.popup-header {
  padding: 20px;
  border-bottom: 1px solid #ebedf0;
  text-align: center;
}

.popup-header h2 {
  margin: 0;
  font-size: 18px;
  color: #323233;
}

.popup-content {
  padding: 20px;
  height: calc(100% - 80px);
  overflow-y: auto;
}
</style>
```

### 合同类型切换

```vue
<template>
  <div class="contract-type-demo">
    <van-cell-group>
      <van-cell title="合同类型">
        <template #value>
          <van-radio-group v-model="contractType" direction="horizontal">
            <van-radio name="pickup">取车合同</van-radio>
            <van-radio name="return">还车合同</van-radio>
          </van-radio-group>
        </template>
      </van-cell>
    </van-cell-group>

    <van-button type="primary" block @click="showTypeContract = true">
      查看{{ contractType === 'pickup' ? '取车' : '还车' }}合同
    </van-button>

    <van-popup
      v-model:show="showTypeContract"
      position="bottom"
      style="height: 80%"
      round
      closeable
    >
      <div class="popup-content">
        <FaceOrderContractContent
          :show="showTypeContract"
          :type="contractType"
          :contract-info="getContractInfo(contractType)"
        />
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showTypeContract = ref(false)
const contractType = ref('pickup')

const pickupContractInfo = {
  rentalAgreement: `
    <h3>取车确认协议</h3>
    <p>1. 租车人确认已检查车辆外观和内饰</p>
    <p>2. 租车人确认车辆油量/电量状态</p>
    <p>3. 租车人确认车辆里程数</p>
    <p>4. 租车人确认随车物品清单</p>
    <p>5. 租车人承诺按协议使用车辆</p>
  `,
  specialItem: `
    <h3>取车特别提醒</h3>
    <p>1. 请仔细检查车辆是否有损伤</p>
    <p>2. 请确认车辆证件是否齐全</p>
    <p>3. 请熟悉车辆操作方法</p>
    <p>4. 如有问题请立即联系客服</p>
  `
}

const returnContractInfo = {
  rentalAgreement: `
    <h3>还车确认协议</h3>
    <p>1. 租车人确认已按时还车</p>
    <p>2. 租车人确认车辆状态良好</p>
    <p>3. 租车人确认费用结算无误</p>
    <p>4. 租车人确认随车物品已取回</p>
    <p>5. 租车人确认本次租车服务完成</p>
  `,
  specialItem: `
    <h3>还车特别说明</h3>
    <p>1. 车辆如有损伤将按价赔偿</p>
    <p>2. 违章罚款将从押金中扣除</p>
    <p>3. 押金将在7个工作日内退还</p>
    <p>4. 如有争议请及时联系客服</p>
  `
}

const getContractInfo = (type) => {
  return type === 'pickup' ? pickupContractInfo : returnContractInfo
}
</script>

<style scoped>
.contract-type-demo {
  padding: 16px;
}

.popup-content {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>
```

## 特性

- 📄 **HTML渲染**: 支持富文本HTML内容的渲染
- 📋 **结构化内容**: 分别展示租车协议和特殊条款
- 🎨 **样式优化**: 内置合同文档的样式，保证可读性
- 📱 **移动端适配**: 适合移动端阅读的字体和排版
- 🔄 **动态内容**: 支持根据合同类型显示不同内容
- 📖 **滚动查看**: 支持长内容的滚动查看
- 🎯 **标题居中**: 自动居中显示标题，提升视觉效果

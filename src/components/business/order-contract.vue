<script setup>
import { Toast, Dialog } from "vant";
import html2canvas from 'html2canvas'
import { ref, onMounted, nextTick, onBeforeUnmount, watch } from "vue"
import { user } from '@/utils/auth'
import { Media } from '../../utils';
import CommonEntity from "../../services/entities/CommonEntity";
import { Figure } from '../../utils'
import SignaturePad from 'signature_pad'
import { supportNativeUpload, nativeUploadBase64 } from '../../utils/native'

const props = defineProps({
  show: Boolean,
  type: String, // 取车 pickup 还车 return
  actualPickupTime: String, // 实际取车时间
  actualReturnTime: String, // 实际还车时间
  pickupMileage: String, // 取车公里数
  pickupOilLiter: String || Number, // 取车油量
  maxOilLiter: String || Number, // 取车最大油量
  oilElectric: String || Number,
  oilElectric2: String || Number,
  returnMileage: String, // 还车公里数
  returnOilLiter: String, // 还车油量
  signatureUrl: String, // 签名地址
  vehicleNo: String, // 车牌号
  contractInfo: {
    type: Object
  },
  interiorList: {
    type: Array
  },
  appearanceList: {
    type: Array
  },
  appearanceRemark: {
    type: String
  },
  payItems: {
    type: Array,
  },
  refundItems: {
    type: Array,
  },
  receivableAmount: {
    type: Number,
  },
  payAmount: {
    type: Number,
  },
})

const vehicleAppearanceDetail = {
  1: '左前叶子板',
  2: '前保',
  3: '右前叶子板',
  4: '左前轮',
  5: '前机盖及前挡风玻璃',
  6: '右前轮',
  7: '左后视镜',
  8: '左前门',
  9: '左后门',
  10: '车顶',
  11: '右后视镜',
  12: '右前门',
  13: '右后门',
  14: '左后叶子板',
  15: '后机盖及前挡风玻璃',
  16: '右后叶子板',
  17: '左后轮',
  18: '后保',
  19: '右后轮',
}

const emits = defineEmits(["toggleShowContract", "updateContractUrl", "updateInspectionUrl", "updateSignatureUrl"])
const currentDate = new Date()
const currentDateStr = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`
const customerSigned = ref(false)
const showSignatureArea = ref(false)
const contractUpload = ref(false)
const inspectionUpload = ref(false)
const contractSubmitting = ref(false)
const inspectionSubmitting = ref(false)
const submitting = ref(false)
const customerSignature = ref('')
const signaturePadInstance = ref(null)
const signatureCanvas = ref(null)
const isContractDisabled = ref(false)
const isInspectionDisabled = ref(false)
const isSubmitContractDisabled = ref(false)
const isSignatureEmpty = ref(true)
const isLandscape = ref(false)

// 签名板配置
const signaturePadOptions = {
  minWidth: 1.5,           // 增加线条最小宽度
  maxWidth: 3.0,           // 增加线条最大宽度
  penColor: 'rgb(0, 0, 0)',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  velocityFilterWeight: 0.4, // 降低速度对线条的影响
  throttle: 0,              // 禁用节流以获取更高精度
  minDistance: 0,
}

// 检测设备屏幕方向与支持情况
const detectScreenCapabilities = () => {
  // 标准方向API检测
  if (window.screen?.orientation) {
    return {
      supportsOrientation: true,
      isLandscape: window.screen.orientation.type.includes('landscape')
    }
  }
  
  return {
    supportsOrientation: false, 
    isLandscape: window.innerWidth > window.innerHeight
  }
}
// 初始化签名板
const initSignaturePad = () => {
  if (!signatureCanvas.value) return

  try {
    // 确保先销毁旧实例
    if (signaturePadInstance.value) {
      signaturePadInstance.value.off()
    }

    // 创建新实例 - 使用适合当前方向的配置
    const { isLandscape: landscape } = detectScreenCapabilities()
    isLandscape.value = landscape
    
    signaturePadInstance.value = new SignaturePad(signatureCanvas.value, signaturePadOptions)

    // 绑定事件
    signaturePadInstance.value.addEventListener("beginStroke", () => {
      isSignatureEmpty.value = false
    })
    
    // 先调整画布大小
    nextTick(() => {
      resizeCanvas()
      
      // 防止触摸事件导致的页面滚动
      preventTouchScroll()
    })
  } catch (e) {
    console.error('初始化签名板失败', e)
  }
}

// 防止触摸事件导致的页面滚动
const preventTouchScroll = () => {
  const canvas = signatureCanvas.value
  if (!canvas) return
  
  const options = { passive: false }
  
  // 阻止画布区域的触摸事件传播到页面
  canvas.addEventListener('touchstart', (e) => {
    if (e.cancelable) e.preventDefault()
  }, options)
  
  canvas.addEventListener('touchmove', (e) => {
    if (e.cancelable) e.preventDefault()
  }, options)
  
  // 确保签名区域容器也不会触发滚动
  const signatureArea = canvas.closest('.signature-area')
  if (signatureArea) {
    signatureArea.addEventListener('touchmove', (e) => {
      if (e.cancelable) e.preventDefault()
    }, options)
  }
}

// 重置签名画布
const resizeCanvas = () => {
  if (!signatureCanvas.value || !signaturePadInstance.value) return

  try {
    const canvas = signatureCanvas.value
    
    // 使用更高的分辨率比例，确保签名清晰
    const ratio = Math.max(window.devicePixelRatio || 1, 3)

    // 保存当前签名数据
    const data = signaturePadInstance.value.isEmpty() ? null : signaturePadInstance.value.toData()

    // 获取当前画布区域实际尺寸
    const containerWidth = canvas.parentElement.clientWidth || canvas.offsetWidth
    const containerHeight = canvas.parentElement.clientHeight || canvas.offsetHeight

    // 确保尺寸为偶数，以避免半像素渲染问题
    const width = Math.floor(containerWidth * ratio)
    const height = Math.floor(containerHeight * ratio)
    canvas.width = width - (width % 2)
    canvas.height = height - (height % 2)
    
    // 设置CSS尺寸
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    
    // 配置绘图上下文
    const ctx = canvas.getContext("2d")
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(ratio, ratio)
    
    // 设置抗锯齿参数，提高绘制质量
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // 清空画布
    signaturePadInstance.value.clear()

    // 如果有之前的签名数据，恢复它
    if (data) {
      signaturePadInstance.value.fromData(data)
    }
  } catch (e) {
    console.error('调整画布大小失败', e)
  }
}

// 创建临时画布并生成旋转的签名图片
const createRotatedSignatureImage = () => {
  if (!signaturePadInstance.value || signaturePadInstance.value.isEmpty()) {
    return null
  }

  try {
    const canvas = signatureCanvas.value
    const data = signaturePadInstance.value.toData()
    
    if (!data || !data.length) return null
    
    // 创建临时画布，用于旋转签名
    const tempCanvas = document.createElement('canvas')
    const sourceWidth = canvas.width
    const sourceHeight = canvas.height
    
    // 横屏模式下不需要旋转
    if (isLandscape.value) {
      tempCanvas.width = sourceWidth
      tempCanvas.height = sourceHeight
      
      const ctx = tempCanvas.getContext('2d')
      
      // 设置高质量绘制
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      
      // 直接绘制（不旋转）
      ctx.drawImage(canvas, 0, 0)
      
    } else {
      // 竖屏模式下需要旋转90度
      // 交换宽高，因为我们要旋转90度
      tempCanvas.width = sourceHeight
      tempCanvas.height = sourceWidth
      
      const ctx = tempCanvas.getContext('2d')
      
      // 设置高质量绘制
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      
      // 旋转90度
      ctx.save()
      ctx.translate(tempCanvas.width / 2, tempCanvas.height / 2)
      ctx.rotate(-Math.PI / 2) // 90度
      ctx.translate(-sourceWidth / 2, -sourceHeight / 2)
      
      // 绘制原始签名
      ctx.drawImage(canvas, 0, 0)
      ctx.restore()
    }
    
    // 返回高质量PNG
    return tempCanvas.toDataURL('image/png', 1.0)
  } catch (e) {
    console.error('创建旋转签名失败', e)
    return null
  }
}

// 更新屏幕状态并调整界面
const updateScreenState = () => {
  if (!showSignatureArea.value) return
  
  const { isLandscape: landscape } = detectScreenCapabilities()
  const orientationChanged = isLandscape.value !== landscape
  isLandscape.value = landscape
  
  if (orientationChanged) {
    // 方向变化时重新初始化签名板
    nextTick(() => {
      if (signaturePadInstance.value) {
        const wasEmpty = signaturePadInstance.value.isEmpty()
        signaturePadInstance.value.off()
        signaturePadInstance.value = new SignaturePad(signatureCanvas.value, signaturePadOptions)
        if (!wasEmpty) {
          isSignatureEmpty.value = false
        }
        signaturePadInstance.value.addEventListener("beginStroke", () => {
          isSignatureEmpty.value = false
        })
      }
      resizeCanvas()
    })
  } else {
    // 如果只是尺寸变化但方向未变，只需调整画布大小
    nextTick(resizeCanvas)
  }
}

// 添加屏幕方向监听
const addOrientationListeners = () => {
  // 立即检测一次当前方向
  updateScreenState()
  
  window.addEventListener('resize', updateScreenState)
  if (window.screen?.orientation) {
    window.screen.orientation.addEventListener('change', updateScreenState)
  } else if (window.orientation !== undefined) {
    window.addEventListener('orientationchange', updateScreenState)
  }
}

// 移除屏幕方向监听
const removeOrientationListeners = () => {
  window.removeEventListener('resize', updateScreenState)
  
  if (window.screen?.orientation) {
    window.screen.orientation.removeEventListener('change', updateScreenState)
  } else if (window.orientation !== undefined) {
    window.removeEventListener('orientationchange', updateScreenState)
  }
}

// 显示全屏签名框
const handleShowSignatureArea = () => {
  if (customerSigned.value) return
  
  // 初始化状态
  showSignatureArea.value = true
  isSignatureEmpty.value = true
  nextTick(initSignaturePad)
}

// 取消签名
const handleCancelSignature = () => {
  showSignatureArea.value = false
  if (signaturePadInstance.value) {
    signaturePadInstance.value.clear()
  }
  isLandscape.value = false
}

// 清空签名
const handleClearSignature = () => {
  if (!signaturePadInstance.value) return
  signaturePadInstance.value.clear()
  isSignatureEmpty.value = true
}

// 确认签名
const handleConfirmSignature = () => {
  if (!signaturePadInstance.value) return Toast('签名区域不存在，请重试')
  if (signaturePadInstance.value.isEmpty()) return Toast('请先签名')

  try {
    // 生成旋转90度的签名图片
    const rotatedSignatureData = createRotatedSignatureImage()
    
    // 检查生成的数据URL是否有效
    if (!rotatedSignatureData || rotatedSignatureData === 'data:,' || rotatedSignatureData.length < 100) {
      Toast('生成签名图像失败，请重新签名')
      return
    }
    
    emits('updateSignatureUrl', rotatedSignatureData)
    customerSignature.value = rotatedSignatureData
    customerSigned.value = true
    showSignatureArea.value = false
  } catch (e) {
    console.error('handleConfirmSignature', e)
    Toast('签名生成失败，请重签')
  }
}

// 重置签名
const handleResetSignature = () => {
  customerSigned.value = false
  customerSignature.value = ''
  contractUpload.value = false
  inspectionUpload.value = false
  emits('updateSignatureUrl', '')
}

// 上传合同相关函数
const handleUploadContract = () => {
  if (!props.signatureUrl) {
    Dialog({ message: '请客户签名' })
    return
  }
  contractSubmitting.value = true
  isInspectionDisabled.value = true
  isSubmitContractDisabled.value = true
  handleCreateContract()
}

const handleUploadInspection = () => {
  if (!props.signatureUrl) {
    Dialog({ message: '请客户签名' })
    return
  }
  inspectionSubmitting.value = true
  isContractDisabled.value = true
  isSubmitContractDisabled.value = true
  handleCreateVehicleInspectionForm()
}

const handleSubmitContract = () => {
  if (submitting.value) return
  if (!props.signatureUrl) {
    Dialog({ message: '请客户签名' })
    return
  }
  
  if (!contractUpload.value) {
    Dialog({
      message: '请上传合同',
      beforeClose: () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
          handleUploadContract()
        }, 500);
      }),
    })
    return
  }
  
  if (!inspectionUpload.value) {
    Dialog({
      message: '请上传验车单',
      beforeClose: () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
          handleUploadInspection()
        }, 500);
      }),
    })
    return
  }
  
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    emits('toggleShowContract')
  }, 500)
}

const handleCreateContract = () => {
  const fragment = document.createDocumentFragment()
  const parent = document.getElementById('protocol-contract')
  const content = document.getElementById('contract-content').cloneNode(true)
  const signature = document.getElementById('contract-signature').cloneNode(true)
  fragment.append(content)
  fragment.append(signature)
  parent.append(fragment)
  handleCreateImage(parent, 'contract')
}

const handleCreateVehicleInspectionForm = () => {
  const fragment = document.createDocumentFragment()
  const parent = document.getElementById('inspection-contract')
  const form = document.getElementById('vehicle-inspection-form').cloneNode(true)
  const signature = document.getElementById('contract-signature').cloneNode(true)
  fragment.append(form)
  fragment.append(signature)
  parent.append(fragment)
  handleCreateImage(parent, 'inspection')
}

// 保留原有的上传图片功能
const handleCreateImage = (target, type) => {
  // 根据 dom 结构生成图片，上传并保存 url 到本地
  html2canvas(target, {
    taintTest: false,
    useCORS: true,
    allowTaint: true,
    scale: 1,
  }).then(canvas => {
    const imgContent = canvas.toDataURL()
    const base64 = imgContent.split(',')[1]
    
    if (supportNativeUpload) {
      const request = nativeUploadBase64({
        data: base64,
        name: `${user.value.merchantId}-${new Date().getTime()}.jpg`
      })
      request.then((res) => {
        if (type === 'contract') {
          emits('updateContractUrl', res[0])
          contractUpload.value = true
          contractSubmitting.value = false
          isInspectionDisabled.value = false
          isSubmitContractDisabled.value = false
        } else {
          emits('updateInspectionUrl', res[0])
          inspectionUpload.value = true
          inspectionSubmitting.value = false
          isContractDisabled.value = false
          isSubmitContractDisabled.value = false
        }
        while (target.firstChild) {
          target.removeChild(target.firstChild);
        }
      })
    } else {
      Media.base64ToBlob({
        b64data: base64,
        contentType: 'image/png',
      }).then(res => {
        Toast(`${type === 'contract' ? '合同' : '验车单'}上传中...`)
        // 转换后的blob对象
        CommonEntity.upload(res).then((url) => {
          if (type === 'contract') {
            emits('updateContractUrl', url)
            contractUpload.value = true
            contractSubmitting.value = false
            isInspectionDisabled.value = false
            isContractDisabled.value = false
            isSubmitContractDisabled.value = false
          } else {
            emits('updateInspectionUrl', url)
            inspectionUpload.value = true
            inspectionSubmitting.value = false
            isInspectionDisabled.value = false
            isContractDisabled.value = false
            isSubmitContractDisabled.value = false
          }
          while (target.firstChild) {
            target.removeChild(target.firstChild);
          }
        }).catch(e => {
          console.error('handleCreateImage', e)
          Toast(`${type === 'contract' ? '合同' : '验车单'}上传失败`)
          contractSubmitting.value = false
          inspectionSubmitting.value = false
          isInspectionDisabled.value = false
          isContractDisabled.value = false
          isSubmitContractDisabled.value = false
        })
      })
    }
  }).catch((e) => {
    console.error('合同生成失败', e)
    Toast(e || '合同生成失败')
    submitting.value = false
  })
}

// 监听显示状态变化
watch(showSignatureArea, (newVal) => {
  if (newVal) {
    addOrientationListeners()
  } else {
    removeOrientationListeners()
  }
})

// 组件挂载时的处理
onMounted(() => {
  if (showSignatureArea.value) {
    addOrientationListeners()
    initSignaturePad()
  }
})

// 组件卸载前的清理
onBeforeUnmount(() => {
  if (signaturePadInstance.value) {
    signaturePadInstance.value.off()
    signaturePadInstance.value = null
  }
})

function formatOilLiter(value, maxOilLiter) {
  if (!value) return '-'
  const full = maxOilLiter == null ? 20 : maxOilLiter
  const percent = Math.floor(value / full * 100)
  return `${value}/${full} ${percent}%`
}
</script>

<template>
  <div class="contract-wrapper" id="contract-wrapper">
    <div class="contract-content-wrapper" id="contract-content">
      <h1 v-if="type === 'pickup'">汽车租赁合同</h1>
      <h2 v-if="type === 'pickup'">租车单</h2>
      <h2 v-else>验车单</h2>
      <div v-if="contractInfo?.rentForm?.orderInfoItemList?.length">
        <h3>客户信息</h3>
        <div v-for="(orderInfoItem) in contractInfo.rentForm.orderInfoItemList" v-bind:key="orderInfoItem.item"
          class="item">
          <span>{{ orderInfoItem.itemName }}</span>
          <span>{{ orderInfoItem.value }}</span>
        </div>
        <van-divider />
      </div>
      <div v-if="contractInfo?.rentForm?.vehicleInfoItemList.length">
        <div style="display: flex; justify-content: flex-start; align-items: center;">
          <h3>取车信息</h3>
          <text style="font-size: 0.32rem">（实际车牌号详见验车图片）</text>
        </div>
        <div v-for="(orderInfoItem) in contractInfo.rentForm.vehicleInfoItemList" v-bind:key="orderInfoItem.item"
          class="item">
          <span><text v-if="orderInfoItem.itemName == '车牌号' || orderInfoItem.itemName == '车型'">预排</text>{{
            orderInfoItem.itemName }}</span>
          <span>{{ orderInfoItem.value }}</span>
        </div>
        <div class="item">
          <span>取车油/电量</span>
          <span>{{ formatOilLiter(pickupOilLiter, maxOilLiter) }}</span>
        </div>
        <div class="item">
          <span>取车公里数</span>
          <span>{{ pickupMileage }}公里</span>
        </div>
        <div class="item">
          <span>实际取车时间</span>
          <span>{{ actualPickupTime }}</span>
        </div>
        <van-divider />
      </div>
      <div v-if="contractInfo?.rentForm?.servicePriceItemList.length">
        <h3>租金信息</h3>
        <div v-for="(orderInfoItem) in contractInfo.rentForm.servicePriceItemList" v-bind:key="orderInfoItem.item"
          class="item">
          <span>{{ orderInfoItem.itemName }}</span>
          <span>{{ orderInfoItem.value }}</span>
        </div>
      </div>
      <div v-if="contractInfo?.vehicleForm" class="info-card font-sm">
        <div>
          <h3>还车信息</h3>
          <div class="item">
            <span>取车油/电量</span>
            <span>{{ formatOilLiter(pickupOilLiter, maxOilLiter) }}</span>
          </div>
          <div class="item">
            <span>取车公里数</span>
            <span>{{ pickupMileage }}公里</span>
          </div>
          <div v-if="type === 'return'" class="item">
            <span>还车油/电量</span>
            <span>{{ formatOilLiter(oilElectric, oilElectric2) }}</span>
          </div>
          <div v-if="type === 'return'" class="item">
            <span>还车公里数</span>
            <span>{{ returnMileage }}公里</span>
          </div>
          <div v-if="type === 'return'" class="item">
            <span>实际还车时间</span>
            <span>{{ actualReturnTime }}</span>
          </div>
          <div v-if="type === 'return'" class="item">
            <span>车牌号</span>
            <span>{{ vehicleNo }}</span>
          </div>
          <van-divider />
        </div>
        <van-row class="py-xs border-bottom-base border-color-6">
          <van-col span="6">项目</van-col>
          <van-col class="text-right" span="6">数量</van-col>
          <van-col class="text-right" span="6">付款方式</van-col>
          <van-col class="text-right" span="6">小计</van-col>
        </van-row>
        <van-row v-for="item in contractInfo?.vehicleForm.amountItemList" :key="item.id"
          class="py-xs border-bottom-base border-color-3">
          <van-col span="6">{{ item.itemName }}</van-col>
          <van-col class="text-right" span="6">{{ item.unitStr }}</van-col>
          <van-col class="text-right" span="6">{{ item.payMode }}</van-col>
          <van-col class="text-right" span="6">￥{{ item.value }}</van-col>
        </van-row>
        <van-row class="my-base mt-sm">
          <van-col class="text-right" span="18">已支付</van-col>
          <van-col class="text-right" span="6">￥{{ Figure.toYuan(receivableAmount) }}</van-col>
        </van-row>
      </div>
      <div>
        <h2 v-if="contractInfo?.rentalAgreement">租车协议</h2>
        <div :innerHTML="contractInfo?.rentalAgreement"></div>
        <h2 v-if="contractInfo?.specialItem">特殊条款</h2>
        <div :innerHTML="contractInfo?.specialItem"></div>
      </div>
      <van-divider />
    </div>
    <div class="vehicle-inspection-form-wrapper" id="vehicle-inspection-form">
      <div v-if="type === 'pickup'">
        <h3>验车单</h3>
        <div v-if="interiorList.length" class="info-card font-sm mt-sm">
          <van-row class="py-xs border-bottom-base border-color-6">
            <van-col span="12" class="font-md">固定物件</van-col>
            <van-col span="12" class="font-md">取车状态</van-col>
          </van-row>
          <van-row v-for="item in interiorList" :key="item.inspectionId" class="py-xs border-bottom-base border-color-3">
            <van-col span="12">{{ item.name }}</van-col>
            <van-col span="12" :class="item.damaged === 1 ? 'color-red' : 'color-green'">{{ item.damaged === 1 ? '损坏' :
              '完好'
              }}</van-col>
          </van-row>
        </div>
        <div v-if="appearanceList.length" class="info-card font-sm mt-sm">
          <van-row class="py-xs border-bottom-base border-color-6">
            <van-col span="12" class="font-md">车辆外观</van-col>
            <van-col span="12" class="font-md">状态</van-col>
          </van-row>
          <van-row v-for="item in appearanceList" :key="item.appearanceNo"
            class="py-xs border-bottom-base border-color-3">
            <van-col span="12">{{ item.appearanceName }}</van-col>
            <van-col span="12" :class="item.damaged === 1 ? 'color-red' : 'color-green'">{{ item.damaged === 1 ? '损坏' :
              '完好' }}</van-col>
          </van-row>
        </div>
      </div>
      <div v-else>
        <h3 class="font-md">验车单</h3>
        <div v-if="interiorList.length" class="info-card font-sm mt-sm">
          <van-row class="py-xs border-bottom-base border-color-6">
            <van-col span="8" class="font-md">验车项</van-col>
            <van-col span="8" class="font-md">取车</van-col>
            <van-col span="8" class="font-md">还车</van-col>
          </van-row>
          <van-row v-for="item in interiorList" :key="item.inspectionId" class="py-xs border-bottom-base border-color-3">
            <van-col span="8">{{ item.name }}</van-col>
            <van-col span="8" :class="item.damaged === 1 ? 'color-red' : 'color-green'">{{ item.damaged === 1 ? '损坏' :
              '完好'
              }}</van-col>
            <van-col span="8" :class="item.newDamaged === 1 ? 'color-red' : 'color-green'">{{ item.newDamaged === 1 ? '损坏'
              :
              '完好' }}</van-col>
          </van-row>
        </div>
        <div v-if="appearanceList.length" class="info-card font-sm mt-sm">
          <van-row class="py-xs border-bottom-base border-color-6">
            <van-col span="8" class="font-md">车辆外观</van-col>
            <van-col span="8" class="font-md">取车</van-col>
            <van-col span="8" class="font-md">还车</van-col>
          </van-row>
          <van-row v-for="item in appearanceList" :key="item.appearanceNo"
            class="py-xs border-bottom-base border-color-3">
            <van-col span="8">{{ item.appearanceName }}</van-col>
            <van-col span="8" :class="item.damaged === 1 ? 'color-red' : 'color-green'">{{ item.damaged === 1 ? '损坏' :
              '完好'
              }}</van-col>
            <van-col span="8" :class="item.newDamaged === 1 ? 'color-red' : 'color-green'">{{ item.newDamaged === 1 ? '损坏'
              :
              '完好' }}</van-col>
          </van-row>
        </div>
      </div>
      <div class="info-card font-sm mt-lg">
        <van-row class="mt-sm">
          <van-col span="6" class="font-md">外观备注：</van-col>
          <van-col span="18">{{ appearanceRemark }}</van-col>
        </van-row>
        <van-divider />
      </div>
    </div>
    <div class="contract-signature-wrapper" id="contract-signature">
      <h3>出租方/服务方签署区域：</h3>
      <div class="signature-box" 
        :style="{
          backgroundImage: `url(${contractInfo.signatureBase64})`, 
          backgroundPosition: 'center', 
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }">
        <img class="signature" crossorigin="anonymous" :src="contractInfo.signatureBase64" alt="出租方签名" />
      </div>
      <h3>日期：{{ currentDateStr }}</h3>
      <h3>承租方签署区域：</h3>
      <div class="signature-box" id="customer-signature-box" v-on:click="handleShowSignatureArea">
        <img v-if="customerSigned" :src="customerSignature" class="customer-signature-image" fit="contain"
          alt="承租方签名" />
        <span v-else class="customer-signature-tip">点击此处，让用户签合同</span>
      </div>
      <h3>日期：{{ currentDateStr }}</h3>
    </div>
    <div v-if="!showSignatureArea" class="footer">
      <van-button size="small" v-on:click="handleResetSignature">
        重新签名
      </van-button>
      <van-button type="primary" size="small" :disabled="isContractDisabled" :loading="contractSubmitting"
        loading-text="合同上传中..." v-on:click="handleUploadContract">
        上传合同
      </van-button>
      <van-button type="primary" size="small" :disabled="isInspectionDisabled" :loading="inspectionSubmitting"
        loading-text="验车单上传中..." v-on:click="handleUploadInspection">
        上传验车单
      </van-button>
      <van-button type="primary" size="small" :disabled="isSubmitContractDisabled" :loading="submitting"
        loading-text="签署完成..." v-on:click="handleSubmitContract">
        签署完成
      </van-button>
    </div>
  </div>

  <!-- 全屏签名区域 -->
  <template v-if="!isLandscape">
    <div v-if="showSignatureArea" class="signature-fullscreen">
      <!-- 左侧按钮区 -->
      <div class="signature-actions">
        <van-button class="rotated-button" size="small" @click="handleCancelSignature">取消</van-button>
        <van-button class="rotated-button" size="small" @click="handleClearSignature">清除</van-button>
        <van-button class="rotated-button" size="small" type="primary" @click="handleConfirmSignature">确定</van-button>
      </div>
      
      <!-- 右侧签名区 -->
      <div class="signature-area">
        <canvas ref="signatureCanvas" class="signature-pad"></canvas>
        <div v-if="isSignatureEmpty" class="signature-hint">请在此区域签名</div>
      </div>
    </div>
  </template>
  <template v-else>
    <div v-if="showSignatureArea" class="signature-fullscreen-web">
      <div class="signature-area">
        <canvas ref="signatureCanvas" class="signature-pad"></canvas>
        <div v-if="isSignatureEmpty" class="signature-hint">请在此区域签名</div>
      </div>
      <div class="signature-actions">
        <van-button size="small" @click="handleCancelSignature">取消</van-button>
        <van-button size="small" @click="handleClearSignature">清除</van-button>
        <van-button type="primary" size="small" @click="handleConfirmSignature">确定</van-button>
      </div>
    </div>
  </template>
  <div id="protocol-contract"></div>
  <div id="inspection-contract"></div>
</template>

<style lang="less" scoped>
/* 状态颜色样式 */
.color-green {
  color: #07c160 !important;
  font-weight: 500;
}

.color-red {
  color: #ee0a24 !important;
  font-weight: 500;
}

.contract-wrapper,
#protocol-contract,
#inspection-contract {
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #ffffff;
  z-index: 999;
  overflow-x: hidden;

  h1 {
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    margin: 16px 0;
  }

  h3 {
    font-size: 14px;
    font-weight: bold;
    margin: 12px 0;
  }

  .contract-content-wrapper {
    margin: 12px;

    h1,
    h2 {
      text-align: center;
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px 0;
      padding: 4px 0;
      font-size: 13px;
      line-height: 1.4;
    }

    // 合同条款样式
    div[innerHTML] {
      font-size: 12px;
      line-height: 1.6;
      text-align: justify;
      margin: 16px 0;

      p {
        margin: 8px 0;
        text-indent: 0;
      }

      strong {
        font-weight: 600;
      }
    }

  }

  .vehicle-inspection-form-wrapper {
    margin: 12px;
    box-sizing: border-box;

    .info-card {
      margin: 12px 0;

      .van-row {
        padding: 3px 0;
        font-size: 12px;

        &.border-bottom-base {
          border-bottom: 1px solid #ebedf0;
        }

        &.border-color-6 {
          background-color: #f7f8fa;
          font-weight: 600;
          padding: 4px 0;
        }

        .van-col {
          line-height: 1.3;
          padding: 0 2px;
        }
      }

      .font-md {
        font-weight: 600;
        font-size: 12px;
      }
    }

    h3 {
      font-size: 13px;
      font-weight: bold;
      margin: 12px 0 8px 0;
      text-align: center;
    }
  }

  .contract-signature-wrapper {
    margin: 12px;
    box-sizing: border-box;

    .signature-box {
      padding: 12px;
      box-sizing: border-box;
      border: 1px solid #333;
      width: 100%;
      height: 150px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      .signature {
        max-height: 148px;
      }

      .customer-signature-image {
        margin: 0 auto;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .customer-signature-tip {
        color: red;
      }
    }
  }
}

.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 36px;
}

/* 全屏签名样式-native */
.signature-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
  display: flex;
  flex-direction: row;

  /* 左侧按钮区 */
  .signature-actions {
    width: 80px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
    border-right: 1px solid #e0e0e0;
    
    .rotated-button {
      margin: 15px 0;
      width: 36px;
      height: 100px;
      transform-origin: center center;
      white-space: nowrap;
      
      ::v-deep .van-button__text {
        transform: rotate(90deg);
        display: inline-block;
        font-weight: 500;
        letter-spacing: 2px;
      }
    }
  }

  /* 右侧签名区 */
  .signature-area {
    flex: 1;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    touch-action: none;

    .signature-pad {
      width: 100%;
      height: 100%;
      touch-action: none;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      border: 1px solid #ddd;
      background-color: #fff;
      border-radius: 8px;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }

    .signature-hint {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(90deg);
      transform-origin: center center;
      color: #aaa;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 2px;
      background-color: rgba(255, 255, 255, 0.7);
      padding: 12px 24px;
      border-radius: 8px;
      white-space: nowrap;
      pointer-events: none;
    }
  }
}
/* 全屏签名样式-web */
.signature-fullscreen-web {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  .signature-area {
    flex: 1;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    .signature-pad {
      width: 100%;
      height: 100%;
      touch-action: none;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      border: 1px solid #ddd;
      background-color: #fff;
      border-radius: 4px;
    }

    .signature-hint {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #909399;
      font-size: 18px;
      pointer-events: none;
      opacity: 0.5;
    }
  }

  .signature-actions {
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 16px;
    background: #fff;
    border-top: 1px solid #eee;

    .van-button {
      margin: 0 8px;
      min-width: 80px;
      height: 24px;
    }
  }
}
</style>
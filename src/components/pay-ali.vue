<template>
    <!--支付宝收款码-->
    <van-popup v-model:show="isShowMsg" position="bottom" :close-on-click-overlay="false" round>
        <div class="text-center text-[14px] bg-white">
            <div class="my-2">仅支持支付宝扫码</div>
            <div class="relative w-[180px] h-[180px] p-1 mx-auto border rounded bg-slate-50">
                <!-- 支付二维码-->
                <qrcode-svg v-if="payInfo" :value="payInfo.payUrl" level="H" width="100%" height="100%" />
                <!-- 加载loading -->
                <div v-if="isLoading" class="flex justify-center items-center h-full">
                    <van-loading type="spinner" size="1rem" />
                </div>
                <!-- 支付结果-->
                <div v-if="payStatus" class="absolute inset-0 bg-white bg-opacity-95 rounded">
                    <div class="flex justify-center items-center h-full">
                        <van-icon :name="payStatus === 'success' ? 'passed' : 'close'"
                            :color="payStatus === 'success' ? '#1989fa' : 'red'" size="0.6rem" />
                        <span class="mx-[6px]">{{ STATUS_MAP[payStatus]?.message }}</span>
                        <van-button v-if="payStatus === 'invalid'" text plain size="mini" icon="replay"
                            @click="refresh">刷新</van-button>
                    </div>
                </div>
            </div>
            <div class="my-2 min-h-[20px]">
                <template v-if="payInfo">
                    总费用合计: <b class="text-amber-500">￥{{ (payInfo.payAmount / 100).toFixed(2) }}</b>
                </template>
            </div>
        </div>
        <footer class="flex justify-between mx-4 mb-2">
            <van-button plain size="small" class="w-[48%]" :disabled="payStatus === 'success'" @click="handleCancelPay">
                {{ cancelTxt }}</van-button>
            <van-button type="primary" size="small" class="w-[48%]" :disabled="payStatus !== 'success'"
                @click="handleFinishPay">{{ okTxt }}</van-button>
        </footer>
    </van-popup>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { QrcodeSvg } from 'qrcode.vue'
import API from '@/services/apis/order'
import { pick } from 'lodash-es'
import { Toast, Dialog, Loading as VanLoading, Icon as VanIcon, Button as VanButton } from 'vant'

/**
 * 接收参数
 * 1. type:付款码场景类型：1=创建订单，2=取车加购，3=续租，4=还车
 * 2. orderId: 订单Id，续租时传续租Id
 * 3. payParams: 取车和还车支付项
 * 输出事件
 * onPayStatus: 返回支付结果
 */
const props = defineProps({
    isShow: Boolean,
    okTxt: {
        type: String,
        default: '支付完成'
    },
    cancelTxt: {
        type: String,
        default: '取消支付'
    },
    cancelMsg: {
        type: String,
        default: '取消支付将自动取消订单，您真的要取消吗？'
    },
    type: {
        type: Number
    },
    orderId: {
        type: Number,
    },
    payParams: {
        type: Object
    }
})
const emit = defineEmits(['onPayFinish', 'onPayCancel'])
const { orderId, type, payParams, cancelMsg, isShow } = props
const isLoading = ref(true) // 获取收款码loading
const payInfo = ref(null)   // 收款码信息
const payStatus = ref('') // 扫码场景下支付状态
const isShowMsg = ref(isShow)
// 支付状态映射
const STATUS_MAP = {
    success: { message: '订单支付完成' },
    invalid: { message: '二维码超时' },
    error: { message: '订单支付异常' },
    cancel: { message: '订单支付取消' },
    over: { message: '订单交易关闭' },
}

// 获取支付二维码
const getPayQrcode = async (params = {}) => {
    try {
        isLoading.value = true
        const res = await API.getPayQrcode(params.payFeeItemsVo || {}, pick(params, ['orderId', 'type']))
        if (res) {
            payInfo.value = res
            // 获取支付结果
            loopPayResult()
        } else {
            payStatus.value = 'error'
            Toast(res.message || '获取二维码失败')
        }
        isLoading.value = false
    } catch (msg) {
        Toast('获取二维码失败')
        isLoading.value = false
        payStatus.value = 'error'
        console.log('getPayQrcode err', msg)
    }
}

// 获取支付状态
const getPayStatus = async (params = {}) => {
    try {
        const res = await API.getPayStatus(params)
        // 待支付
        if (+res.status === 0) return

        if (+res.status === 2) {
            payStatus.value = 'success'
        } else if (+res.status === 7) {
            payStatus.value = 'error'
        } else if (+res.status === 9) {
            payStatus.value = 'over'
        }
    } catch (msg) {
        payStatus.value = 'error'
        console.log('getPayStatus err', msg)
    }
}

// 轮询支付结果
const loopPayResult = () => {
    if (payStatus.value) return

    getPayStatus({ orderId, payNo: payInfo.value.payNo })
    const timer = setTimeout(() => {
        loopPayResult()
        clearTimeout(timer)
    }, 3000)
}

// 取消支付
const handleCancelPay = () => {
    Dialog.confirm({ message: cancelMsg })
        .then(async () => {
            try {
                emit('onPayCancel')
                await API.cancelPayOrder({ orderId, payNo: payInfo.value.payNo })
            } catch (err) {
                console.log('handleCancelPay error', err)
            }
        }).catch(() => { console.log('handleCancelPay cancel') })
}

// 支付完成
const handleFinishPay = () => {
    emit('onPayFinish', { status: payStatus.value })
}

// 刷新二维码
const refresh = () => {
    payInfo.value = null
    payStatus.value = ''
    getPayQrcode({ orderId, type, payFeeItemsVo: payParams })
}

// 初始化
getPayQrcode({ orderId, type, payFeeItemsVo: payParams })

// 卸载时终止轮询
onUnmounted(() => payStatus.value = 'cancel')
</script>
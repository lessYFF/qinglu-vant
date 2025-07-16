<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { Toast } from 'vant'
import config from '@/utils/config'

const props = defineProps({
  send: { type: Function }, // () => Promise<boolean>
})
const emits = defineEmits([])

const verifying = ref(false)
const elementId = ref('')
async function loadScript() {
  if (!window.awscLoading) {
    window.awscLoading = new Promise(resolve => {
      const script = document.createElement('script')
      script.src = 'https://g.alicdn.com/AWSC/AWSC/awsc.js'
      script.addEventListener('load', () => resolve())
      document.body.appendChild(script)

      const style = document.createElement('style')
      style.innerHTML = `
        .sm-btn-wrapper > * {
          box-sizing: content-box;
          text-align: center;
        }
      `
      document.body.appendChild(style)
    })
  }
  return window.awscLoading
}
onBeforeMount(() => {
  loadScript()
})

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const countdown = ref(0)
const countdownId = ref(null)
onBeforeMount(() => {
  countdownId.value = setInterval(() => {
    if (countdown.value > 0) countdown.value = countdown.value - 1
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(countdownId.value)
})

const sending = ref(false)

const Events = {
  startVerify() {
    elementId.value = 'aliyun-verify-' + Math.round(Math.random() * 100000000).toString()
    verifying.value = true

    void loadScript().then(() => {
      window.AWSC.use('ic', function (state, module) {
        if (!verifying.value) return
        // test 模式一下，每次调用返回随机结果
        const test = config.verifyTest
          ? module[['TEST_PASS', 'TEST_BLOCK', 'TEST_NC_PASS', 'TEST_NC_BLOCK'][randomNumber(0, 3)]]
          : false
        const instance = module.init({
          test,
          appkey: config.verifyAppKey,
          scene: 'nvc_register',
          renderTo: elementId.value,
          success(data) {
            console.log('阿里云验证通过', data)
            setTimeout(() => {
              if (!verifying.value) return
              verifying.value = false
              Events.send()
            }, 500)
          },
          fail(failCode) {
            console.info('阿里云验证失败', failCode)
          },
          error(errorCode) {
            Toast(`验证码加载异常${errorCode ? '：' + errorCode : ''}`)
          },
        })
      })
    })
  },
  async send() {
    if (!sending.value && props.send) {
      sending.value = true
      const success = await props.send()
      sending.value = false
      if (success) {
        Toast('验证码已发送')
        countdown.value = 60
      }
    }
  },
}
</script>
<template>
  <van-button v-if="countdown <= 0" @click="Events.startVerify">发送验证码</van-button>
  <van-button v-else disabled>{{ countdown }}S 后可重发</van-button>

  <van-dialog
    v-model:show="verifying"
    title="安全验证"
    :show-confirm-button="false"
    :close-on-click-overlay="true"
    width="90vw"
    :lazy-render="true"
  >
    <div v-if="verifying" class="verify-container">
      <div :id="elementId" class="verify-element"></div>
    </div>
  </van-dialog>
</template>
<style lang="less" scoped>
.verify-container {
  display: flex;
  justify-content: center;
  padding: 1.5em 0 1.2em;
}
</style>

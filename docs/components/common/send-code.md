# FaceSendCode

发送验证码组件，用于手机验证码发送和倒计时显示。

## 基础用法

```vue
<template>
  <div class="send-code-container">
    <van-field
      v-model="phone"
      label="手机号"
      placeholder="请输入手机号"
    />

    <FaceSendCode
      :phone="phone"
      @send="handleSendCode"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FaceSendCode } from 'qinglu-vant'

const phone = ref('')

const handleSendCode = (phoneNumber) => {
  console.log('发送验证码到:', phoneNumber)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| phone | 手机号码 | String | - |
| seconds | 倒计时秒数 | Number | 60 |
| text | 按钮文字 | String | '获取验证码' |
| countText | 倒计时文字模板 | String | '{s}秒后重新获取' |
| type | 按钮类型 | String | 'primary' |
| size | 按钮大小 | String | 'small' |
| disabled | 是否禁用 | Boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| send | 发送验证码时触发 | phone: 手机号码 |
| finish | 倒计时结束时触发 | - |

### Methods

通过ref可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| start | 开始倒计时 | - |
| reset | 重置倒计时 | - |

## 示例

### 基础验证码发送

```vue
<template>
  <div class="verification-form">
    <van-field
      v-model="phone"
      label="手机号"
      placeholder="请输入手机号"
      :rules="[{ required: true, message: '请填写手机号' }]"
    />

    <div class="code-field">
      <van-field
        v-model="code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <FaceSendCode
            :phone="phone"
            @send="sendVerificationCode"
          />
        </template>
      </van-field>
    </div>

    <div class="submit-button">
      <van-button type="primary" block @click="verifyCode">
        验证
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const phone = ref('')
const code = ref('')

const sendVerificationCode = (phoneNumber) => {
  if (!phoneNumber) {
    Toast.fail('请输入手机号')
    return false
  }

  if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
    Toast.fail('手机号格式不正确')
    return false
  }

  Toast.success(`验证码已发送至 ${phoneNumber}`)
  return true
}

const verifyCode = () => {
  if (!phone.value) {
    Toast.fail('请输入手机号')
    return
  }

  if (!code.value) {
    Toast.fail('请输入验证码')
    return
  }

  Toast.success('验证成功')
}
</script>

<style scoped>
.verification-form {
  padding: 16px;
}

.code-field {
  margin-top: 16px;
}

.submit-button {
  margin-top: 24px;
}
</style>
```

### 自定义样式

```vue
<template>
  <div class="custom-style-demo">
    <van-field
      v-model="phone"
      label="手机号"
      placeholder="请输入手机号"
    />

    <div class="code-field">
      <van-field
        v-model="code"
        label="验证码"
        placeholder="请输入验证码"
      >
        <template #button>
          <FaceSendCode
            :phone="phone"
            text="发送验证码"
            count-text="重新发送({s}s)"
            type="success"
            size="normal"
            @send="handleSend"
          />
        </template>
      </van-field>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const phone = ref('')
const code = ref('')

const handleSend = (phoneNumber) => {
  Toast.success(`自定义样式验证码发送至 ${phoneNumber}`)
  return true
}
</script>

<style scoped>
.custom-style-demo {
  padding: 16px;
}

.code-field {
  margin-top: 16px;
}
</style>
```

### 手动控制倒计时

```vue
<template>
  <div class="manual-control-demo">
    <van-field
      v-model="phone"
      label="手机号"
      placeholder="请输入手机号"
    />

    <div class="code-field">
      <van-field
        v-model="code"
        label="验证码"
        placeholder="请输入验证码"
      >
        <template #button>
          <FaceSendCode
            ref="sendCodeRef"
            :phone="phone"
            :seconds="30"
            @send="handleManualSend"
            @finish="handleCountdownFinish"
          />
        </template>
      </van-field>
    </div>

    <div class="control-buttons">
      <van-button size="small" @click="startCountdown">
        开始倒计时
      </van-button>
      <van-button size="small" @click="resetCountdown">
        重置倒计时
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

const phone = ref('')
const code = ref('')
const sendCodeRef = ref(null)

const handleManualSend = (phoneNumber) => {
  Toast.success(`手动控制发送验证码至 ${phoneNumber}`)
  // 不自动开始倒计时
  return false
}

const startCountdown = () => {
  sendCodeRef.value?.start()
  Toast.success('手动开始倒计时')
}

const resetCountdown = () => {
  sendCodeRef.value?.reset()
  Toast.success('手动重置倒计时')
}

const handleCountdownFinish = () => {
  Toast.success('倒计时结束')
}
</script>

<style scoped>
.manual-control-demo {
  padding: 16px;
}

.code-field {
  margin-top: 16px;
}

.control-buttons {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}
</style>
```

## 特性

- 📱 **手机验证**: 专为手机验证码设计
- ⏱️ **倒计时**: 内置倒计时功能，防止频繁发送
- 🎨 **自定义样式**: 支持自定义按钮类型和大小
- 📝 **文本定制**: 支持自定义按钮文字和倒计时文字
- 🔄 **手动控制**: 提供手动控制倒计时的方法
- 🎯 **事件丰富**: 提供发送和倒计时结束事件
- ⚡ **验证集成**: 支持手机号格式验证

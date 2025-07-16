<!--
 * @Author: shijunzi
 * @Date: 2025-04-19
 * @Description: 文字上传图片、视频组件
-->
<script setup>
import { Toast, Dialog } from 'vant'
import Compressor from 'compressorjs'
import TypeChecker from '@lihzsky/type-checker'
import { computed, ref, useAttrs, watch } from 'vue'
import { FaceMediaPreview } from '..'
import CommonEntity from '@/services/entities/CommonEntity'
import { Media } from '@/utils'
import { nativeUploadVideo, nativeUploadImage, supportNativeUpload } from '@/utils/native'

const attrs = useAttrs()
const props = defineProps({
  modelValue: {
    type: [Array, String],
  },
  type: {
    type: String,
    default: 'image',
    validator: value => ['image', 'video'].includes(value),
  },
  maxCount: {
    type: Number,
    default: 1,
  },
  isPreparation: {
    type: Boolean,
  },
  optimize: {
    type: [Object, Boolean],
    default: undefined,
  },
  formatValue: {
    type: String,
    default: undefined
  }
})

const emits = defineEmits(['update:modelValue', 'uploadCompleted'])

// 基础状态配置
const show = ref(false)
const previewList = ref([])
const fileList = ref([])

// 计算属性
const hasUploaded = computed(() => fileList.value.length > 0)
const typeText = computed(() => props.type === 'video' ? '视频' : '图片')
const accept = computed(() => props.type === 'video' ? 'video/*' : 'image/*')

// 事件处理
const handleViewMedia = () => show.value = true
const handleDelete = () => {
  if (props.isPreparation) return
  
  Dialog.confirm({
    message: '删除后不可恢复，确定要删除吗？',
  }).then(() => {
    emits('update:modelValue', props.formatValue === 'Array' ? [] : '')
    emits('uploadCompleted')
  })
}

// 文件优化
const optimizeFile = file => {
  if (TypeChecker.isBoolean(props.optimize) && TypeChecker.isFalsy(props.optimize)) {
    return Promise.resolve(file)
  }

  const options = TypeChecker.isObject(props.optimize) ? props.optimize : undefined
  return new Promise(resolve => {
    new Compressor(file, {
      quality: 0.2,
      ...options,
      success: result => resolve(result),
      error: error => {
        console.warn(error.message)
        resolve(file)
      },
    })
  })
}

// Web上传处理
const handleWebUpload = (fileInfo, detail) => {
  if (supportNativeUpload) return

  if (TypeChecker.isArray(fileInfo)) {
    Promise.all(
      fileInfo.map((fileItem, index) => {
        fileItem.status = 'uploading'
        
        return optimizeFile(fileItem.file)
          .then(file => CommonEntity.upload(file))
          .then(url => ({ url, index, success: true }))
          .catch(error => {
            console.error(error, fileInfo, index)
            Toast(`${typeText.value}${(props.modelValue?.length ?? 0) + index}上传失败`)
            return { url: '', index, success: false }
          })
      })
    ).then(uploadInfos => {
      const urls = uploadInfos.filter(item => item.success).map(item => item.url)
      const values = props.modelValue 
        ? (TypeChecker.isArray(props.modelValue) ? props.modelValue.concat(urls) : [props.modelValue, ...urls]) 
        : urls

      emits('update:modelValue', values)
      emits('uploadCompleted')
    })
  } else {
    fileInfo.status = 'uploading'
    
    optimizeFile(fileInfo.file)
      .then(file => CommonEntity.upload(file))
      .then(url => {
        if (props.maxCount === 1) {
          emits('update:modelValue', props.formatValue === 'Array' ? [url] : url)
        } else {
          const values = props.modelValue 
            ? (TypeChecker.isArray(props.modelValue) ? props.modelValue.concat([url]) : [props.modelValue, url]) 
            : [url]
          emits('update:modelValue', values)
        }
        emits('uploadCompleted')
      })
      .catch(error => {
        Toast.fail('上传失败')
        console.error(detail, error)
      })
  }
}

// Native上传处理
const handleNativeUpload = e => {
  if (!supportNativeUpload || props.isPreparation) return
  
  e.preventDefault()
  const rest = props.maxCount - fileList.value.length
  if (!rest) return
  
  const request = props.type === 'video' ? nativeUploadVideo({ max: rest }) : nativeUploadImage({ max: rest })
  request.then(urls => {
    if (props.maxCount === 1) {
      emits('update:modelValue', props.formatValue === 'Array' ? urls : urls[0])
    } else {
      const currentValue = Array.isArray(props.modelValue) 
      ? [...props.modelValue] 
      : (typeof props.modelValue === 'string' && props.modelValue ? [props.modelValue] : [])
      emits('update:modelValue', [...currentValue, ...urls])
    }
    
    emits('uploadCompleted')
  })
}

// 监听数据变化
watch(
  () => props.modelValue,
  () => {
    const options = { width: 80, height: 80 }

    if (TypeChecker.isArray(props.modelValue)) {
      fileList.value = props.modelValue.map(item => ({ url: Media.generateMediaThumbPath(item, options) }))
      previewList.value = props.modelValue
    } else if (TypeChecker.isString(props.modelValue) && props.modelValue) {
      fileList.value = [{ url: Media.generateMediaThumbPath(props.modelValue, options) }]
      previewList.value = [props.modelValue]
    } else {
      fileList.value = []
      previewList.value = []
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="w-10 flex-center content-area">
    <!-- 未上传状态 -->
    <template v-if="!hasUploaded">
      <van-uploader
        v-model="fileList"
        :name="attrs.name"
        result-type="file"
        :accept="accept"
        :max-count="maxCount"
        :preview-size="['1.9rem', '1.9rem']"
        :preview-full-image="false"
        :multiple="maxCount > 1"
        :readonly="attrs.readonly"
        :disabled="attrs.disabled"
        :show-upload="true"
        :preview-image="false"
        @click-upload="handleNativeUpload"
        :after-read="handleWebUpload"
      >
        <div class="text-blue-600">上传{{typeText}}</div>
      </van-uploader>
    </template>
    
    <!-- 已上传状态 -->
    <template v-else>
      <div class="media-actions">
        <div class="text-blue-600" @click="handleViewMedia">
          查看{{typeText}}
        </div>
        <div class="text-red-600" @click="handleDelete">
          删除
        </div>
      </div>
    </template>
  </div>

  <face-media-preview
    v-model:show="show"
    :medias="previewList"
    :start-position="0"
    :loop="false"
  ></face-media-preview>
</template>

<style lang="less" scoped>
.content-area {
  width: 100%;
}
.media-actions {
  display: flex;
  gap: 10px;
}
</style> 
<!--
 * @Author: duhuo
 * @Date: 2022-11-06 13:26:38
 * @LastEditors: duhuo
 * @LastEditTime: 2022-11-06 16:29:44
 * @Description: Do not edit
-->
<script setup>
import TypeChecker from '@lihzsky/type-checker'
import Compressor from 'compressorjs'
import { Toast, Dialog } from 'vant'
import { computed, ref, useAttrs, watch, onMounted, onUpdated } from 'vue'
import { FaceMediaPreview } from '..'
import CommonEntity from '../../services/entities/CommonEntity'
import { Media } from '../../utils'

const attrs = useAttrs()
const props = defineProps({
  modelValue: {
    type: [Array, String],
  },
  accept: {
    type: String,
    default: 'image',
  },
  maxCount: {
    type: Number,
    default: 1,
  },
  capture: {
    type: String,
  },
  // 证件类型：1: 身份证正面 2: 身份证反面 3: 驾驶证 4:行驶证正页 5:行驶证副页
  ocrType: {
    type: [String, Number],
  },
  uploadType: {
    type: String,
    default: 'normal',
    validator: value => ['normal', 'card'].includes(value),
  },
  custom: {
    type: Boolean,
    default: false,
  },
  imageFit: {
    type: String,
  },
  uploadText: {
    type: String,
  },
  previewSize: {
    type: [String, Array],
  },
  optimize: {
    type: [Object, Boolean],
    default: undefined,
  },
  uploadIcon: {
    type: String,
  },
  isPreparation: {
    type: Boolean,
  },
  formatValue: {
    type: String,
    default: undefined
  }
})
const emits = defineEmits(['update:modelValue', 'update', 'finished','uploadCompleted'])
// 预览配置
const show = ref(false)
const previewList = ref([])
const previewDetail = ref({
  index: 0,
})
// 图片上传配置
const fileList = ref([])
const accept = computed(() => {
  const IMAGE_ACCEPT = 'image/*'
  const VIDEO_ACCEPT = 'video/*,'

  // NOTE 开启OCR识别或者上传类型为card时，不支持视频上传
  if (TypeChecker.isString(props.ocrType) || props.uploadType === 'card') {
    return IMAGE_ACCEPT
  }

  switch (props.accept) {
    case 'image':
      return IMAGE_ACCEPT
    case 'video':
      return VIDEO_ACCEPT
    case 'mix':
      return [IMAGE_ACCEPT, VIDEO_ACCEPT].join(',')
    default:
  }

  return props.accept
})
const maxCount = computed(() => {
  // NOTE 未开启OCR识别且上传类型不为card时，支持多图
  if (TypeChecker.isVoid(props.ocrType) && props.uploadType !== 'card') {
    return props.maxCount
  }

  return 1
})
const previewSize = computed(() => {
  if (props.previewSize) {
    return props.previewSize
  }

  if (props.uploadType === 'card') {
    return ['9.22rem', '5.7rem']
  }

  return ['1.9rem', '1.9rem']
})
// NOTE 开启OCR识别或者上传类型为card时，不支持多图上传
const multiple = computed(() => TypeChecker.isVoid(props.ocrType) || props.uploadType === 'card')
const Fns = {
  optimize(file) {
    if (TypeChecker.isBoolean(props.optimize) && TypeChecker.isFalsy(props.optimize)) {
      return Promise.resolve(file)
    }

    const options = TypeChecker.isObject(props.optimize) ? props.optimize : undefined
    return new Promise(resolve => {
      // https://github.com/fengyuanchen/compressorjs
      new Compressor(file, {
        quality : 0.2,
        ...options,
        success: result => {
          resolve(result)
        },
        error: error => {
          console.warn(error.message)
          resolve(file)
        },
      })
    })
  },
}
const EventHandler = {
  onHandleUpload(fileInfo, detail) {
    console.log('上传文件信息', fileInfo, detail)

    if (props.custom) {
      // 支持自定义图片上传
      emits('update', fileInfo, detail)
    } else {
      if (TypeChecker.isArray(fileInfo)) {
        Promise.all(
          fileInfo.map(
            // 优化 -> 上传
            (fileItem, index) => {
              fileItem.status = 'uploading'
              fileItem.message = '上传中'
              return Fns.optimize(fileItem.file)
                .then(file => CommonEntity.upload(file))
                .then(url => ({
                  url,
                  index,
                  success: true,
                }))
                .catch(error => {
                  console.error(error, fileInfo, index)
                  Toast(`图${(props.modelValue?.length ?? 0) + index}上传失败`)

                  return {
                    url: '',
                    index,
                    success: false,
                  }
                })
            }
          )
        ).then(uploadInfos => {
          const urls = uploadInfos.filter(item => item.success).map(item => item.url)
          // 更新数据
          const values = props.modelValue.concat(urls)

          emits('update:modelValue', values)
          emits('finished', { url: urls, ocr: null })
          emits('uploadCompleted')
        })
      } else {
        fileInfo.status = 'uploading'
        fileInfo.message = '上传中'
        // 优化 -> 上传 -> OCR识别
        Fns.optimize(fileInfo.file)
          .then(file => CommonEntity.upload(file))
          .catch(error => {
            emits('update:modelValue', [...props.modelValue])
            return Promise.reject(error)
          })
          .then(url => {
            // 更新数据
            if (maxCount.value === 1) {
              emits('update:modelValue', props.formatValue === 'Array' ? [url] : url)
            } else {
              const values = props.modelValue.concat([url])

              emits('update:modelValue', values)
            }

            if (props.ocrType) {
              // 开启OCR识别
              CommonEntity.ocr(url, props.ocrType)
                .then(data => {
                  emits('finished', { url, ocr: data })
                })
                .catch(error => {
                  console.error('OCR识别失败, 请重新上传', error)
                  Toast.fail('OCR识别失败, 请重新上传')
                })
            } else if (props.uploadText === 'card') {
              // 卡片模式
              emits('finished', { url, ocr: null })
            } else {
              // 默认模式
              emits('finished', { url: [url], ocr: null })
            }
            emits('uploadCompleted')
          })
          .catch(error => {
            Toast.fail('上传失败')
            console.error(detail, error)
          })
      }
    }
  },

  onHandleDeleteThumb(item) {
    if (props.isPreparation == true) {
      return
    }
    return Dialog.confirm({
      message: '删除后不可恢复，确定要删除吗？',
    }).then(() => {
      fileList.value = fileList.value.filter(v => v !== item)
      emits(
        'update:modelValue',
        fileList.value.map(v => v.url)
      )
      emits('uploadCompleted')
    })
  },

  onHandlePreview(_, detail) {
    console.log(_,detail)
    show.value = true
    previewDetail.value = detail
  },
}

watch(
  () => props.modelValue,
  () => {
    const options = {
      width: 80,
      height: 80,
    }

    // 根据modelValue的数据类型进行结构化，使之成为uploader组件要求的数据结构
    // 数据格式统一处理成[{ url }]
    if (TypeChecker.isArray(props.modelValue)) {
      fileList.value = props.modelValue.map(item => ({ url: Media.generateMediaThumbPath(item, options) }))
      previewList.value = props.modelValue
    } else if (TypeChecker.isString(props.modelValue) && props.modelValue) {
      // NOTE 上传类型为card时，不对图片展示做缩略图处理
      if (props.uploadType === 'card') {
        fileList.value = [{ url: props.modelValue }]
      } else {
        fileList.value = [{ url: Media.generateMediaThumbPath(props.modelValue, options) }]
      }

      previewList.value = [props.modelValue]
    } else {
      fileList.value = []
      previewList.value = []
    }
  },
  { immediate: true }
)

onUpdated(() => {
  setTimeout(() => {
    if (props.uploadIcon !== '') {
      let vanBadgeWrapper = document.querySelectorAll('.van-uploader__upload-icon')
      vanBadgeWrapper.forEach(element => {
        element.style.width = '100%'
        element.style.height = '100%'
      })
      let vanIconImage = document.querySelectorAll('.van-icon__image')
      vanIconImage.forEach(element => {
        element.style.width = '100%'
        element.style.height = '100%'
        element.style.objectFit = 'fill'
      })
      let vanIconPhotograph = document.querySelectorAll('.van-icon-photograph')
      vanIconPhotograph.forEach(element => {
        element.style.width = '24px'
        element.style.height = '24px'
      })
    }
  }, 300)
})
onMounted(() => {
 
  setTimeout(() => {
    if (props.uploadIcon !== '') {
      let vanBadgeWrapper = document.querySelectorAll('.van-uploader__upload-icon')
      vanBadgeWrapper.forEach(element => {
        element.style.width = '100%'
        element.style.height = '100%'
      })
      let vanIconImage = document.querySelectorAll('.van-icon__image')
      vanIconImage.forEach(element => {
        element.style.width = '100%'
        element.style.height = '100%'
        element.style.objectFit = 'fill'
      })
      let vanIconPhotograph = document.querySelectorAll('.van-icon-photograph')
      vanIconPhotograph.forEach(element => {
        element.style.width = '24px'
        element.style.height = '24px'
      })
    }
  }, 300)
})

</script>

<template>
  <van-field v-bind="attrs" class="custom-form-field">
    <template #input>
      <van-uploader
        v-model="fileList"
        :class="{
          'single-uploader': maxCount === 1,
          'card-uploader': props.uploadType === 'card',
        }"
        :name="attrs.name"
        :upload-text="props.uploadText"
        :image-fit="props.imageFit"
        result-type="file"
        :accept="accept"
        :max-count="maxCount"
        :preview-size="previewSize"
        :preview-full-image="false"
        :capture="props.capture"
        :multiple="multiple"
        :readonly="attrs.readonly"
        :disabled="attrs.disabled"
        :before-delete="EventHandler.onHandleDeleteThumb"
        :after-read="EventHandler.onHandleUpload"
        @click-preview="EventHandler.onHandlePreview"
        :upload-icon="props.uploadIcon"
      ></van-uploader>
    </template>
  </van-field>

  <!-- <div>123<img src="@/views/order/selfPickupReturn/img/jn.png" alt=""></div> -->
  <face-media-preview
    v-model:show="show"
    :medias="previewList"
    :start-position="previewDetail.index"
    :loop="false"
  ></face-media-preview>
</template>

<style lang="less" scoped>
.single-uploader {
  :deep(.van-uploader__upload),
  :deep(.van-uploader__preview) {
    margin: 0;
  }
}

.card-uploader {
  border-radius: 8px;
  overflow: hidden;

  :deep(.van-uploader__preview-delete) {
    top: 12px;
    right: 12px;
    padding: 3px;
    font-size: 0;
    border-radius: 20px;
  }

  :deep(.van-uploader__preview-delete-icon) {
    position: static;
    transform: none;
  }
}
// :deep(.van-badge__wrapper) {
//   width: 100% !important;
//   height: 100% !important;
//   .van-icon__image {
//     width: 100% !important;
//     height: 100% !important;
//     object-fit: fill;
//   }
// }
</style>

<script setup>
import { Dialog } from 'vant'
import { ref, useAttrs, watch, onMounted, onUpdated } from 'vue'
import { FaceMediaPreview } from '..'
import { Media } from '../../utils'
import { nativeUploadVideo, nativeUploadImage } from '../../utils/native'


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
  uploadIcon: {
    type: String,
  },
  isPreparation: {
    type: Boolean,
  },
})
const emits = defineEmits(['update:modelValue','uploadCompleted'])

const thumbs = ref([]) // 缩略图列表
const previews = ref([]) // 预览用原始文件列表（相比于 modelValue，此值经过了整理）
const previewing = ref(false) // 是否正在预览
const previewIndex = ref(0) // 正在预览的文件序号

watch(
  () => props.modelValue,
  () => {
    // 把 modelValue 规范成数组
    const values = Array.isArray(props.modelValue)
      ? [...props.modelValue]
      : typeof props.modelValue === 'string' && props.modelValue
      ? [props.modelValue]
      : []

    previews.value = values

    // 生成缩略图
    const thumbOptions = { width: 80, height: 80 }
    thumbs.value = values.map(url => ({
      url: Media.generateMediaThumbPath(url, thumbOptions),
    }))
  },
  { immediate: true }
)

// 把 thumb URL 还原回原始文件 URL
function revertThumb(thumbUrl) {
  return thumbUrl.split('?')[0]
}

const EventHandler = {
  delete(item) {
    if (props.isPreparation == true) {
      return
    }
    Dialog.confirm({
      message: '删除后不可恢复，确定要删除吗？',
    }).then(() => {
      emits(
        'update:modelValue',
        thumbs.value.filter(v => v !== item).map(v => revertThumb(v.url))
      )
      emits('uploadCompleted')
    })
    return false // 终止组件自己的删除行为
  },
  upload(e) {
    if (props.isPreparation == true) {
      return
    }
    e.preventDefault() // 终止组件自己的上传行为

    const rest = props.maxCount - thumbs.value.length
    if (!rest) return
    const request = props.type === 'video' ? nativeUploadVideo({ max: rest }) : nativeUploadImage({ max: rest })
    request.then(urls => {
      emits('update:modelValue', [...previews.value, ...urls])
      emits('uploadCompleted')
    })
  },
  preview(file, detail) {
    previewIndex.value = detail.index
    previewing.value = true
  },
 
}

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
        :class="{
          'single-uploader': maxCount === 1,
        }"
        v-model="thumbs"
        result-type="file"
        :preview-size="['1.9rem', '1.9rem']"
        :preview-full-image="false"
        :max-count="maxCount"
        :multiple="true"
        :name="attrs.name"
        :readonly="attrs.readonly"
        :disabled="attrs.disabled"
        @click-upload="EventHandler.upload"
        :before-delete="EventHandler.delete"
        @click-preview="EventHandler.preview"
        :upload-icon="props.uploadIcon"
      ></van-uploader>
    </template>
  </van-field>

  <face-media-preview v-model:show="previewing" :medias="previews" :start-position="previewIndex" :loop="false" />
</template>

<style lang="less" scoped>
.single-uploader {
  :deep(.van-uploader__upload),
  :deep(.van-uploader__preview) {
    margin: 0;
  }
}
</style>

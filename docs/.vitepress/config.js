import { defineConfig } from 'vitepress'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindConfig from './tailwind.config.js'

export default defineConfig({
  title: '擎路H5组件库',
  description: '基于Vue3 + Vant的移动端组件库',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }]
  ],

  // 添加PostCSS配置，支持Tailwind
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwindcss(tailwindConfig),
          autoprefixer()
        ]
      }
    }
  },

  themeConfig: {
    nav: [
      { text: '组件文档', link: '/' }
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    sidebar: [
      {
        text: '表单组件',
        items: [
          { text: 'ActionSheetField', link: '/components/form/action-sheet-field' },
          { text: 'CalendarField', link: '/components/form/calendar-field' },
          { text: 'CustomFieldValue', link: '/components/form/custom-field-value' },
          { text: 'DatetimeField', link: '/components/form/datetime-field' },
          { text: 'RadioField', link: '/components/form/radio-field' },
          { text: 'SelectField', link: '/components/form/select-field' },
          { text: 'SlideField', link: '/components/form/slide-field' },
          { text: 'StoreField', link: '/components/form/store-field' },
          { text: 'TagsField', link: '/components/form/tags-field' },
          { text: 'TextUploadField', link: '/components/form/text-upload-field' },
          { text: 'UploadField', link: '/components/form/upload-field' },
          { text: 'UploadFieldNative', link: '/components/form/upload-field-native' }
        ]
      },
      {
        text: '业务组件',
        items: [
          { text: 'ArrangeDrivers', link: '/components/business/arrange-drivers' },
          { text: 'CancelPolicyModal', link: '/components/business/cancel-policy-modal' },
          { text: 'ComboFeePanel', link: '/components/business/combo-fee-panel' },
          { text: 'DepositPolicyModal', link: '/components/business/deposit-policy-modal' },
          { text: 'LongOrderLeachBar', link: '/components/business/long-order-leach-bar' },
          { text: 'LongOrderSearchBar', link: '/components/business/long-order-search-bar' },
          { text: 'OrderContract', link: '/components/business/order-contract' },
          { text: 'OrderContractContent', link: '/components/business/order-contract-content' },
          { text: 'OrderLeachBar', link: '/components/business/order-leach-bar' },
          { text: 'OrderSearchBar', link: '/components/business/order-search-bar' },
          { text: 'RentalCarDepositPanel', link: '/components/business/rental-car-deposit-panel' },
          { text: 'ServiceDetailModal', link: '/components/business/service-detail-modal' },
          { text: 'TaskDate', link: '/components/business/task-date' },
          { text: 'VehicleAppearance', link: '/components/business/vehicle-appearance' }
        ]
      },
      {
        text: '通用组件',
        items: [
          { text: 'CalendarPicker', link: '/components/common/calendar-picker' },
          { text: 'IntervalProgress', link: '/components/common/interval-progress' },
          { text: 'MediaPreview', link: '/components/common/media-preview' },
          { text: 'MediaThumbs', link: '/components/common/media-thumbs' },
          { text: 'NavigateBar', link: '/components/common/navigate-bar' },
          { text: 'PageLoading', link: '/components/common/page-loading' },
          { text: 'PayAli', link: '/components/common/pay-ali' },
          { text: 'Roles', link: '/components/common/roles' },
          { text: 'Selector', link: '/components/common/selector' },
          { text: 'SendCode', link: '/components/common/send-code' }
        ]
      }
    ]
  }
})

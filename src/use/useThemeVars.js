import { ref, computed } from 'vue'

const themeVars = ref({
  // 主色调
  primaryColor: '#00b96b',
  secondaryColor: '#52c41a',
  accentColor: '#1890ff',
  
  // 中性色
  textColor: '#323233',
  textColorSecondary: '#646566',
  textColorTertiary: '#969799',
  
  // 背景色
  backgroundColor: '#f7f8fa',
  backgroundColorLight: '#ffffff',
  
  // 边框
  borderColor: '#ebedf0',
  borderRadius: '4px',
  
  // 字体大小
  fontSizeXs: '10px',
  fontSizeSm: '12px',
  fontSizeMd: '14px',
  fontSizeLg: '16px',
  fontSizeXl: '18px',
  
  // 间距
  paddingXs: '8px',
  paddingSm: '12px',
  paddingMd: '16px',
  paddingLg: '24px',
  paddingXl: '32px'
})

export function useThemeVars() {
  const setThemeVar = (key, value) => {
    themeVars.value[key] = value
  }

  const getThemeVar = (key) => {
    return themeVars.value[key]
  }

  const resetTheme = () => {
    // 重置为默认主题
    themeVars.value = {
      primaryColor: '#00b96b',
      secondaryColor: '#52c41a',
      accentColor: '#1890ff',
      textColor: '#323233',
      textColorSecondary: '#646566',
      textColorTertiary: '#969799',
      backgroundColor: '#f7f8fa',
      backgroundColorLight: '#ffffff',
      borderColor: '#ebedf0',
      borderRadius: '4px',
      fontSizeXs: '10px',
      fontSizeSm: '12px',
      fontSizeMd: '14px',
      fontSizeLg: '16px',
      fontSizeXl: '18px',
      paddingXs: '8px',
      paddingSm: '12px',
      paddingMd: '16px',
      paddingLg: '24px',
      paddingXl: '32px'
    }
  }

  const cssVars = computed(() => {
    const vars = {}
    Object.keys(themeVars.value).forEach(key => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      vars[`--qinglu-${cssKey}`] = themeVars.value[key]
    })
    return vars
  })

  return {
    themeVars,
    setThemeVar,
    getThemeVar,
    resetTheme,
    cssVars
  }
}

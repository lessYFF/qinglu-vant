import { ref } from 'vue'

const loading = ref(false)

export function usePageLoading() {
  const show = () => {
    loading.value = true
  }

  const hide = () => {
    loading.value = false
  }

  const toggle = () => {
    loading.value = !loading.value
  }

  return {
    loading,
    show,
    hide,
    toggle
  }
}

import { onBeforeMount, ref, watch } from 'vue'
import { AccountAPI } from '../services/apis'

export const user = ref(null)

// 需保证此函数至少被触发一次，user 才会有值
let userPromise
export function getUser() {
  if (!userPromise) {
    userPromise = AccountAPI.getCurrent()
    userPromise.then(res => {
      if (res) user.value = res
    })
  }
  return userPromise
}

export async function usePageAuth(role) {
  onBeforeMount(() => getUser())

  watch(user, () => {
    if (user.value && !user.value.menuAutos.includes(role)) {
      console.warn(`用户没有权限访问: ${role}`)
    }
  })
}

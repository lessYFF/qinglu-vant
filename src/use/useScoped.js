import { getCurrentInstance, withCtx } from 'vue'

export function useScoped () {
  const instance = getCurrentInstance()

  return fn => withCtx(fn, instance)
}

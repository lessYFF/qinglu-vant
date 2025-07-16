// 导出所有组件
export * from './components'

// 导出工具函数
export * from './utils'

// 导出常量
export * from './constants'

// 导出基础样式变量（可选）
// import './styles/index.less'

// 组件库版本
export const version = '1.0.0'

// 默认导出
import * as components from './components'

const install = (app) => {
  Object.keys(components).forEach(key => {
    const component = components[key]
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

export default {
  install,
  version,
  ...components
}

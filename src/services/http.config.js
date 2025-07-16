// HTTP配置文件
import axios from 'axios'

// 获取环境变量的安全方法
const getEnv = () => {
  // 在浏览器环境中，使用 import.meta.env 或默认值
  if (typeof window !== 'undefined') {
    return {
      NODE_ENV: import.meta.env?.MODE || 'development'
    }
  }

  // Node.js 环境
  if (typeof process !== 'undefined' && process.env) {
    return process.env
  }

  // 默认环境
  return { NODE_ENV: 'development' }
}

const env = getEnv()

// 创建axios实例
const http = axios.create({
  baseURL: env.NODE_ENV === 'development' ? '/api' : 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data } = response
    
    // 如果是Mock环境，直接返回数据
    if (process.env.NODE_ENV === 'development') {
      return data
    }
    
    // 统一处理响应格式
    if (data.code === 200) {
      return data.data || data
    } else {
      throw new Error(data.message || '请求失败')
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // 未授权，跳转到登录页
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          throw new Error('没有权限访问')
        case 404:
          throw new Error('请求的资源不存在')
        case 500:
          throw new Error('服务器内部错误')
        default:
          throw new Error(data?.message || '网络错误')
      }
    } else if (error.request) {
      throw new Error('网络连接失败')
    } else {
      throw new Error(error.message || '请求失败')
    }
    
    return Promise.reject(error)
  }
)

export default http

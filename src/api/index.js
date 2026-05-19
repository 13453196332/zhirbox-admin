import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : '/api',
})

// 请求拦截：自动注入 token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('zhir_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截：401 跳登录
api.interceptors.response.use(
  res => res.data,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('zhir_admin_token')
      localStorage.removeItem('zhir_admin_user')
      window.location.href = '/admin/#/login'
    }
    return Promise.reject(err)
  }
)

export default api

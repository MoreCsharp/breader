import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9080',
  timeout: 30000,
})

request.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.isSuccess) {
      return data.data
    }
    return Promise.reject(new Error(data.errorMsg || '请求失败'))
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request

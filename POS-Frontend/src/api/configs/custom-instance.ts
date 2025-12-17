import axios from 'axios'
import baseConfig from '@/configs/base'

export const axiosInstance = axios.create({
  baseURL: baseConfig.apiEndpoint,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
)

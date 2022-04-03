import axios from 'axios'

// 创建axios实例
export const Axios = axios.create({
    baseURL: process.env.REACT_APP_API,
    // timeout: 15000 // 请求超时时间
});
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5 * 1000 * 10
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000 * 10
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (
        res.status === 50008 ||
        res.status === 50012 ||
        res.status === 50014
      ) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const base = ''
const postRequest = (url, params) => {
  return service({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = ''
        for (const it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

const uploadFileRequest = (url, params) => {
  return service({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
const putRequest = (url, params) => {
  return service({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = ''
        for (const it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

const deleteRequest = url => {
  return service({
    method: 'delete',
    url: `${base}${url}`
  })
}
const getRequest = url => {
  return service({
    method: 'get',
    url: `${base}${url}`
  })
}

export default {
  postRequest,
  uploadFileRequest,
  putRequest,
  deleteRequest,
  getRequest
}

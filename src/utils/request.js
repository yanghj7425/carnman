import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// built a  axios instance
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5 * 1000 * 10
})

service.defaults.headers['crossDomain'] = true
service.defaults.headers['xhrFields'] = {
  withCredentials: true
}

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // by this way ,force each requst have a token
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    /**
     * if status not equals with 2000, That it`s error
     */
    if (res.status !== 2000) {
      // 2006: invalidation token;
      if (res.status === 2006) {
        MessageBox.confirm('验证错误，' + res.message, '确定登出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // avoid bug reinstantiation vue-router object
          })
        })
      }
      // alert error message
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res.message)
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    store.dispatch('FedLogOut').then(() => {
      location.reload() // avoid bug reinstantiation vue-router object
    })
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

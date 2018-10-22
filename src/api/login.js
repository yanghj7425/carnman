import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'login',
    method: 'post',
    data: {
      username,
      password
    },
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

export function getInfo(token) {
  return request({
    url: 'user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

import http from '@/utils/request'

export function login(username, password) {
  return http.postRequest('sys/login', { username, password })
}

export function getInfo(token) {
  var baseUrl = 'sys/login?token=' + token
  return http.getRequest(baseUrl)
}

export function logOut() {
  return http.postRequest('sys/logout')
}

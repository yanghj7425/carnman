import http from '@/utils/request'

export function login(username, password) {
  return http.postRequest('sys/login', { username, password })
}

export function getInfo(token) {
  var baseUrl = 'user/info?' + token
  return http.getRequet(baseUrl)
}

export function logout() {
  return http.postRequest('logout', {})
}

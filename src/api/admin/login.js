import http from '@/utils/request'

export function login(username, password) {
  return http.postRequest('user/login', { username, password })
}

export function getInfo(token) {
  return http.getRequest('user/info')
}

export function logOut() {
  return http.getRequest('user/logout')
}

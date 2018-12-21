import http from '@/utils/request'

export function login(username, password) {
  return http.postRequest('sys/login', { username, password })
}

export function getInfo(token) {
  return http.getRequest('sys/userInfo')
}

export function logOut() {
  return http.getRequest('sys/logout')
}

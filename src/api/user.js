import http from '@/utils/request'

export function queryAllUsers() {
  return http.getRequest('sys/users')
}

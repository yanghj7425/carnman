import http from '@/utils/request'

export function queryAllUsers() {
  return http.getRequest('user/lists')
}

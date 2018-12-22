import http from '@/utils/request'

export function queryAllResInfo() {
  return http.getRequest('res/resInfo')
}

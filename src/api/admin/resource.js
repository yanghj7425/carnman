import http from '@/utils/request'

/**
 * @description 查询左侧资源树
 */
export function queryAllResInfo() {
  return http.getRequest('res/resTree')
}

export function createNewResNode(treeNode) {
  return http.postRequest('res/addRes', treeNode)
}

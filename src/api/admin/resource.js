import http from '@/utils/request'

/**
 * @description query left tree node information
 */
function queryResTree() {
  return http.getRequest('res/resTree')
}

/**
 * @description create a new tree node after the checked node
 * @param { tree node information } treeNode
 */
function createNewTreeNode(treeNode) {
  return http.postRequest('res/addRes', treeNode)
}

/**
 * @description update a resource node information
 * @param {tree node information} treeNode
 */
function updateTreeNode(treeNode) {
  return http.postRequest('res/updateRes', treeNode)
}

/**
 *@description query the table of sys_role information
 */
function querySysRoles() {
  return http.getRequest('user/roles')
}

const Resource = {
  queryResTree,
  createNewTreeNode,
  updateTreeNode,
  querySysRoles
}

export default Resource

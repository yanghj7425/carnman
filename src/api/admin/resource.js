import http from '@/utils/request'

/**
 * @description query left tree node information
 */
function queryResTree() {
  return http.getRequest('res/tree')
}

/**
 * @description create a new tree node after the checked node
 * @param { tree node information } treeNode
 */
function createNewTreeNode(treeNode) {
  return http.postRequest('res/create', treeNode)
}

/**
 * @description update a resource node information
 * @param {tree node information} treeNode
 */
function updateTreeNode(treeNode) {
  return http.postRequest('res/update', treeNode)
}

/**
 * @description assign resource to a role
 * @param {The ID of the assigned resource} resId
 * @param {The IDs of assigned roles} roleIds
 */
function assignResRole(resId, roleIds) {
  return http.postRequest('res/assign', { resId, roleIds })
}

/**
 * @description queryResource that have been assigned roles
 * @param {SysResource Id} redId
 */
function queryResAssignedRole(redId) {
  return http.getRequest('res/assigned/' + redId)
}

/**
 *@description query the table of sys_role information
 */
function querySysRoles() {
  return http.getRequest('role/lists')
}

const Resource = {
  queryResTree,
  createNewTreeNode,
  updateTreeNode,
  querySysRoles,
  assignResRole,
  queryResAssignedRole
}

export default Resource

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

const Resource = {
  queryResTree,
  createNewTreeNode,
  updateTreeNode
}

export default Resource

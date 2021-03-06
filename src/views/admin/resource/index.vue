<template>
  <div>
    <div class="access-container">
      <!-- resource view start -->
      <div class="left-tree">
        <el-input v-model="filterNodeName" placeholder="输入关键字进行过滤"/>
        <el-tree
          ref="rTree"
          :data="treeData"
          :expand-on-click-node="false"
          :render-content="renderContent"
          :filter-node-method="filterNode"
          default-expand-all
          node-key="id"
          @node-click="clickNodeCallBack"
        />
      </div>
      <!-- resource view end -->
      <!-- role view start -->
      <div class="right-role">
        <el-tabs v-model="activeTab" type="border-card" @tab-click="tabClick">
          <el-tab-pane name="resMaintenance">
            <span slot="label">
              <i class="el-icon-date"/> 资源维护
            </span>
            <div>
              <div class="res-view">
                <div class="res-info">
                  <el-form ref="treeNode" :model="treeNode" :rules="rules" label-width="80px">
                    <el-form-item label="操作类型">
                      <el-radio-group
                        v-model="option"
                        :disabled="isDisableOption"
                        @change="optionChange"
                      >
                        <el-radio label="insert">新增</el-radio>
                        <el-radio label="update">修改</el-radio>
                        <el-radio label="delete">删除</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="父级资源">
                      <el-input v-model="treeNode.resFname" :disabled="true"/>
                    </el-form-item>
                    <el-form-item label="本级资源" prop="label">
                      <el-input v-model="treeNode.label"/>
                    </el-form-item>
                    <el-form-item label="资源URL" prop="resUrl">
                      <el-input v-model="treeNode.resUrl"/>
                    </el-form-item>
                    <el-form-item label="是否有效">
                      <el-switch v-model="treeNode.resStatus" active-value="1" inactive-value="0"/>
                    </el-form-item>
                    <el-form-item label="资源描述" prop="resDesc">
                      <el-input v-model="treeNode.resDesc" type="textarea"/>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmitSaveNode('treeNode',option)">保存</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <el-button @click="() => append(clickedNode.obj)">添加</el-button>
              <el-button @click="() => remove(clickedNode.node, clickedNode.obj)">删除</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane name="roleAssign">
            <span slot="label">
              <i class="el-icon-date"/> 角色分配
            </span>
            <div class="res-role">
              <el-transfer v-model="resRoleIds" :data="sysRoleIds" :titles="['可分配角色', '可访问角色']"/>
              <el-button @click="() => saveAssignResourceRole()">保存</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import Resource from '@/api/admin/resource'
export default {
  name: 'Resource',

  data() {
    return {
      treeData: [], // left tree`s data array
      clickedNode: {},
      filterNodeName: '', // The node`s name of the tree,want to filter
      option: 'update', // which option you want to do, insert or update.default value is insert
      isDisableOption: false, // the signal of whether disable radio group
      list: [],
      sysRoleIds: [], // sysRoles list
      resRoleIds: [], // whiche resource can access
      activeTab: 'resMaintenance',
      treeNode: {
        id: '',
        label: '',
        resUrl: '',
        resDesc: '',
        resStatus: 1,
        resFid: '',
        resType: 'URL',
        resFname: ''
      },
      rules: {
        label: [
          { required: true, message: '请输入资源名称', trigger: 'change' }
        ],
        resUrl: [
          { required: true, message: '请输入资源URL', trigger: 'change' }
        ],
        resDesc: [
          { required: true, message: '请输入资源描述', trigger: 'change' }
        ]
      },
      dataLoading: true
    }
  },
  mounted() {
    // loading tree info
    this.fetchTreeData()
  },
  methods: {
    /**
     *Assign resources to a selected role
     */
    saveAssignResourceRole() {
      console.log(this.resRoleIds)
      const roleIds = this.resRoleIds
      const resId = this.clickedNode.obj.id
      Resource.assignResRole(resId, roleIds).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },

    /**
     * click tab callback
     */
    tabClick(tab) {
      // if clicked tab is role`s tab and that the length id zero
      if (this.activeTab === 'roleAssign' && this.sysRoleIds.length === 0) {
        Resource.querySysRoles().then(response => {
          const roles = response.data.roles
          roles.forEach((role, index) => {
            this.sysRoleIds.push({
              label: role.roleDesc,
              key: role.id
            })
          })
        })
      }
    },

    // resource information update style
    optionChange(option) {
      if (option === 'insert') {
        this.treeNode.resFid = this.treeNode.id
      } else {
        if (this.clickedNode.obj) { this.treeNode = this.clickedNode.obj }
      }
      this.isDisableOption = true
    },

    /** ***************************************/
    /* Tree option method                     */
    /** ***************************************/

    // The resource-tree check event
    clickNodeCallBack(data, node, _this) {
      this.$forceUpdate()

      this.clickedNode['obj'] = data
      this.clickedNode['node'] = node

      // for debug
      Message({
        message: JSON.stringify(data.id),
        type: 'msg',
        duration: 1000 * 1
      })

      // query resource has been assigned roles
      Resource.queryResAssignedRole(data.id).then(response => {
        if (response && response.data) {
          this.resRoleIds = response.data.roleIds
        }
      }).catch(error => {
        console.log(error)
      })

      const option = this.option
      if (option === 'insert') {
        this.treeNode.resFid = data.id
        this.treeNode.resFname = data.label
      } else if (option === 'update') {
        this.treeNode = data
        this.treeNode.resFid = node.parent.data.id || 0
        this.treeNode.resFname = node.parent.data.label || ''
      }
    },

    // add a tree node
    append(data) {
      const newChild = { id: data.KEY, label: data.label, children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    // remove a tree node
    remove(node, data) {
      if (!(node && data)) {
        Message.warning({
          message: '请选择要删除的节点',
          type: 'warning',
          duration: 1000 * 1
        })
        return
      }
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    // render tree constructor
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
        </span>)
    },
    // save a resource node
    onSubmitSaveNode(treeNode, option) {
      this.$refs[treeNode].validate((valid) => {
        // if validate failure return false and interrupt commit
        if (!valid) {
          return false
        }
        // deep copy the treeNode that you want to save
        const node = Object.assign({}, this.treeNode)

        // remove children property to avoid server`s pojo convertor exception
        delete node.children

        // continue commit node info
        if (option === 'insert') { // add new tree node
          // if option is insert we put the selected node`s id as fid then insert a record
          Resource.createNewTreeNode(node).then(response => {
            node.id = response.data.Key
            // append new a new sub node on selected tree`s node
            this.append(node)
            Message({
              type: 'success',
              message: '添加成功',
              duration: 1000 * 1
            })
          }).catch(() => {
            Message({
              type: 'warning',
              message: '添加失败'
            })
          })
        } else if (option === 'update') {
          Resource.updateTreeNode(node).then(response => {
            // refresh tree info
            this.clickedNode.obj = node
            Message({
              type: 'success',
              message: '修改成功',
              duration: 1000 * 1
            })
          }).catch(error => {
            console.log(error)
          })
        } else if (option === 'delete') {
          console.log(option)
        }
      })
    },

    // filter special note
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    fetchTreeData() {
      Resource.queryResTree().then(response => {
        this.treeData = response.data.tree
        console.log(this.treeData)
      }).catch(error => {
        console.log(error) // for debug
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.access-container {
  width: 100%;
  height: 500px;
  float: left;
  .left-tree {
    float: left;
    width: 20%;
  }
  .right-role {
    width: 78%;
    height: 100%;
    float: right;
    .res-view {
      width: 100%;
      background-color: blanchedalmond;
      .res-info {
        width: 45%;
        float: left;
      }
      .res-role {
        width: 45%;
        float: right;
      }
    }
  }
}
</style>

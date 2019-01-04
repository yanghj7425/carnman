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
        <el-tabs type="border-card" @tab-click="tabClick">
          <el-tab-pane label="资源详情">
            <div>
              <el-button @click="fetchTreeData()">刷新</el-button>
              <el-table :data="list">
                <el-table-column prop="roleName" label="角色" width="180"/>
                <el-table-column prop="label" label="资源名称" width="100"/>
                <el-table-column prop="resDesc" label="资源描述" width="180"/>
                <el-table-column prop="resUrl" label="资源URL" width="180"/>
                <el-table-column width="180">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane>
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
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-date"/> 角色分配
            </span>
            <div class="res-role">
              <el-transfer v-model="resRoles" :data="sysRoles" :titles="['可分配角色', '可访问角色']"/>
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
      option: 'insert', // which option you want to do, insert or update.default value is insert
      isDisableOption: false, // the signal of whether disable radio group
      list: [],
      sysRoles: [], // sysRoles list
      resRoles: [1, 2, 3], // whiche resource can access
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
      console.log(this.resRoles)
      console.log(this.treeNode)
    },

    /**
     * click tab callback
     */
    tabClick(tab) {
      const paneName = tab.paneName
      // if clicked tab is role`s tab and that the length id zero
      if (paneName === '2' && this.sysRoles.length === 0) {
        Resource.querySysRoles().then(response => {
          const roles = response.data.roles
          roles.forEach((role, index) => {
            this.sysRoles.push({
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
      } else if (option === 'update') {
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
        message: JSON.stringify(data),
        type: 'msg',
        duration: 1000 * 1
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
          })
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

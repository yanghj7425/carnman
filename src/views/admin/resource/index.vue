<template>
  <div>
    <div class="access-container">
      <!-- resource view start -->
      <div class="left-tree">
        <el-input v-model="filterText" placeholder="输入关键字进行过滤"/>
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
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-date"/> 资源维护
            </span>
            <div>
              <div class="res-view">
                <el-form ref="treeNode" :model="treeNode" :rules="rules" label-width="80px">
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
                    <el-button type="primary" @click="onSubmitSaveNode('treeNode','insert')">新增</el-button>
                    <el-button @click="onSubmitSaveNode('treeNode','update')">修改</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <el-button @click="() => append(clickedNode.obj)">添加</el-button>
              <el-button @click="() => remove(clickedNode.node, clickedNode.obj)">删除</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="角色信息">
            <div>
              <el-button @click="fetchTreeData()">刷新</el-button>
              <el-table :data="list">
                <el-table-column prop="roleName" label="角色" width="180"/>
                <el-table-column prop="resName" label="资源名称" width="100"/>
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
      treeData: [],
      clickedNode: {},
      id: 1000,
      filterText: '',
      list: [],
      treeNode: {
        id: '',
        label: '',
        resUrl: '',
        resDesc: '',
        resStatus: 1,
        resFid: '',
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
    this.fetchTreeData()
  },
  methods: {
    handleClick(data) {
      console.log(data)
    },

    /** ***************************************/
    /* Tree option method                     */
    /** ***************************************/

    // The resource-tree check event
    clickNodeCallBack(obj, node, _this) {
      this.$forceUpdate()
      this.clickedNode['obj'] = obj
      this.clickedNode['node'] = node
      this.treeNode.id = obj.id
      this.treeNode.label = obj.label
      this.treeNode.resUrl = obj.resUrl
      this.treeNode.resDesc = obj.resDesc
      this.treeNode.resFid = node.parent.data.id
      this.treeNode.resFname = node.parent.data.label

      Message({
        message: JSON.stringify(this.treeNode),
        type: 'msg',
        duration: 1000 * 1
      })
    },

    // add a tree node
    append(data) {
      const newChild = { id: this.id++, label: 'testTree', children: [] }
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
        // fi validate failure return false and interrupt commit
        if (!valid) {
          return false
        }
        // continue commit node info
        if (option === 'insert') { // add new tree node
          Resource.createNewTreeNode(this.treeNode).then(response => {
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
          console.log('s')
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
        this.treeData = JSON.stringify(response.data.tree)
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
      width: 48%;
      background-color: blanchedalmond;
    }
  }
}
</style>

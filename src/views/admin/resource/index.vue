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
      <div v-if="treeNode.resId" class="right-role">
        <div class="res-view">
          <el-form ref="form" :model="treeNode" label-width="80px">
            <el-form-item label="父级资源">
              <el-input v-model="treeNode.resfName" :disabled="true"/>
            </el-form-item>
            <el-form-item label="本级资源">
              <el-input v-model="treeNode.resName"/>
            </el-form-item>
            <el-form-item label="资源URL">
              <el-input v-model="treeNode.resUrl"/>
            </el-form-item>
            <el-form-item label="是否有效">
              <el-switch v-model="treeNode.resStatus" active-value="1" inactive-value="0"/>
            </el-form-item>
            <el-form-item label="资源描述">
              <el-input v-model="treeNode.resDesc" type="textarea"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitNewNode">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-button @click="() => append(clickedNode.obj)">添加</el-button>
        <el-button @click="() => remove(clickedNode.node, clickedNode.obj)">删除</el-button>
      </div>

      <div>
        <el-button @click="fetchData()">按钮</el-button>
        <el-table :data="list" style="width: 80%">
          <el-table-column prop="roleName" label="角色" width="180"/>
          <el-table-column prop="resName" label="资源名称" width="180"/>
          <el-table-column prop="resDesc" label="资源描述" width="180"/>
          <el-table-column prop="resUrl" label="资源URL" width="180"/>
          <el-table-column fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { queryAllResInfo, createNewResNode } from '@/api/admin/resource'
export default {
  name: 'Resource',
  data() {
    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
    return {
      treeData: JSON.parse(JSON.stringify(data)),
      clickedNode: {},
      id: 1000,
      filterText: '',
      list: [],
      treeNode: {
        resId: '',
        resfName: '',
        resName: '',
        resDesc: '',
        resUrl: '',
        resStatus: false
      },
      dataLoading: true
    }
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
      this.treeNode.resId = obj.id
      this.treeNode.resfName = obj.label

      Message({
        message: this.treeNode.resfName,
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
    // 保存一个新资源节点
    onSubmitNewNode() {
      createNewResNode(this.treeNode).then(response => {
        console.log(response)
      })
    },
    // filter special note
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    fetchData() {
      queryAllResInfo().then(response => {
        this.list = response.data.list
        console.log(this.list)
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

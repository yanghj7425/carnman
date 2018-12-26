<template>
  <div class="left-tree">
    <el-input v-model="filterText" placeholder="输入关键字进行过滤"/>
    <el-tree
      ref="rTree"
      :data="treeData"
      :expand-on-click-node="false"
      :render-content="renderContent"
      :filter-node-method="filterNode"
      show-checkbox
      node-key="id"
      default-expand-all
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>

export default {

  name: 'ResourceTree',
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
      id: 1000,
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.rTree.filter(val)
    }
  },
  methods: {

    // add a tree node
    append(data) {
      const newChild = { id: this.id++, label: 'testTree', children: [] }
      if (!data.children) {
        this.$set(data, 'children', '')
      }
      data.children.push(newChild)
    },
    // remove a tree node
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={() => this.append(data)}>Append</el-button>
            <el-button size='mini' type='text' on-click={() => this.remove(node, data)}>Delete</el-button>
          </span>
        </span>)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<style scoped>
.left-tree {
  float: left;
  width: 20%;
}
</style>


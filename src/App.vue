<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      @change="changeInput"
      :value="inputValue"
    />
    <a-button type="primary" @click="handleAddList">添加事项</a-button>

    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="e => handeleCheckedList(e, item.id)"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="handleRemoveList(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>0条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button>未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',

  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue'])
  },
  methods: {
    changeInput(e) {
      // console.log(e)
      this.$store.commit('changeInput', e.target.value)
    },
    handleAddList() {
      if (this.inputValue.trim() === '') {
        return this.$message.warning('添加事项不能为空！')
      }
      this.$store.commit('addToList')
    },
    handleRemoveList(id) {
      this.$store.commit('removeList', id)
    },
    handeleCheckedList(e, id) {
      // console.log(e.target.checked)
      // console.log(id)
      const param = {
        done: e.target.checked,
        id: id
      }
      this.$store.commit('changeCheckedList', param)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

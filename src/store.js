import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: '',
    nextId: 5
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    changeInput(state, input) {
      state.inputValue = input
    },
    addToList(state) {
      const obj = {
        id: state.nextId,
        done: false,
        info: state.inputValue
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeList(state, id) {
      const index = state.list.findIndex(x => x.id === id)
      state.list.splice(index, 1)
    },
    changeCheckedList(state, obj) {
      const index = state.list.findIndex(x => x.id === obj.id)
      state.list[index].done = obj.done
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {}
})

import { createStore } from 'vuex'
import {ref} from 'vue'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      user: null,
      selectedValue: [],
      StateSearch: ref(true), // 定义 StateSearch 为全局响应式变量
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.user = payload;
    },
    logout(state) {
      state.user = null; // 清空用户信息
      // 如果有其他需要清除的状态，也可以在这里处理
    },
    setSelectedValue(state, value) {
      state.selectedValue = value;
    },
    setStateSearch(state, value) {
      state.StateSearch.value = value; // 提供一个 mutation 来更新 StateSearch
    },
    
  },
  actions: {
    updateSelectedValue({ commit }, value) {
      commit('setSelectedValue', value);
    }
  },
  getters: {
    getSelectedValue: state => state.selectedValue
  }
})


export default store;
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registers: {

    }
  },
  mutations: {
    add(state, registers) {
      state.registers = registers
    }
  },
  getters: {
    registers: state => state.registers
  },
  actions: {
  },
  modules: {
  }
})

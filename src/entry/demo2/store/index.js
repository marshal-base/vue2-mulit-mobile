import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import profileState from './state'
import profileActions from './actions'
import profileMutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: Object.assign({}, profileState),
  actions: Object.assign({}, profileActions),
  mutations: Object.assign({}, profileMutations),
  plugins: [
    createPersistedState({
      key: 'DEMO-PROGRAM',
      storage: window.sessionStorage
    })
  ]
})

window.store = store

export default store

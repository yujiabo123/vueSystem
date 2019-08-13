import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    token: "",
    WordsConfig: {}
}

const mutations = {
    SetToken(state, t) {
        state.token = t;
        sessionStorage.token = t
    },
    RemoveToken(state) {
        state.token = ''
        sessionStorage.removeItem('token')
    },

}

export default new Vuex.Store({
    state,
    mutations
})
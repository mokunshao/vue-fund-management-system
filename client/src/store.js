import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const types = {
  SET_IS_AUTHENTICATED: "SET_IS_AUTHENTICATED",
  SET_USER_INFO: "SET_USER_INFO"
};

const state = {
  isAuthenticatived: false,
  userInfo: {}
};
const getters = {
  isAuthenticatived: state => state.isAuthenticatived,
  userInfo: state => state.userInfo
};
const mutations = {
  [types.SET_IS_AUTHENTICATED](state, isAuthenticatived) {
    isAuthenticatived
      ? (state.isAuthenticatived = isAuthenticatived)
      : (state.isAuthenticatived = false);
  },
  [types.SET_USER_INFO](state, userInfo) {
    userInfo ? (state.userInfo = userInfo) : (state.userInfo = {});
  }
};
const actions = {
  setIsAuthenticated({ commit }, isAuthenticatived) {
    commit(types.SET_IS_AUTHENTICATED, isAuthenticatived);
  },
  setUserInfo({ commit }, userInfo) {
    commit(types.SET_USER_INFO, userInfo);
  }
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

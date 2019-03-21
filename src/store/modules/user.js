import * as types from "../mutation-types";

const state = {
  authorization: ""
};
const getters = {
  authorization: state => state.authorization
};
const mutations = {
  [types.SET_AUTHORIZATION]: (state, payload) => {
    state.authorization = payload.authorization;
  }
};
const actions = {
  setAuthorization: ({ commit }, payload) => {
    commit(types.SET_AUTHORIZATION, payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

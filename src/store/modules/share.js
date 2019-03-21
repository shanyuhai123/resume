import * as types from "../mutation-types";

const state = {
  profile: ""
};
const getters = {
  profile: state => state.profile
};
const mutations = {
  [types.SET_SHARE_PROFILE]: (state, payload) => {
    state.profile = payload.profile;
  }
};
const actions = {
  setShareProfile: ({ commit }, payload) => {
    commit(types.SET_SHARE_PROFILE, payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

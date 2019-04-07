import * as types from "../mutation-types";

const state = {
  profileId: "",
  name: "",
  base: {},
  skills: [],
  workExp: [],
  projectExp: [],
  educationExp: [],
  evaluation: ""
};
const getters = {
  profileId: state => state.profileId,
  nickname: state => state.name,
  name: state => {
    if (state.base.name) {
      return state.base.name;
    } else {
      return state.name;
    }
  },
  base: state => state.base,
  skills: state => state.skills,
  workExp: state => state.workExp,
  projectExp: state => state.projectExp,
  educationExp: state => state.educationExp,
  evaluation: state => state.evaluation
};
const mutations = {
  [types.SET_PROFILEID]: (state, payload) => {
    state.profileId = payload.profileId;
  },
  [types.SET_NAME]: (state, payload) => {
    state.name = payload.name;
  },
  [types.SET_BASE]: (state, payload) => {
    state.base = payload.base;
  },
  [types.SET_SKILLS]: (state, payload) => {
    state.skills = payload.skills;
  },
  [types.SET_EXPERIENCE]: (state, payload) => {
    state.workExp = payload.experience;
  },
  [types.SET_PROJECTS]: (state, payload) => {
    state.projectExp = payload.projects;
  },
  [types.SET_EDUCATION]: (state, payload) => {
    state.educationExp = payload.education;
  },
  [types.SET_EVALUATION]: (state, payload) => {
    state.evaluation = payload.evaluation;
  }
};
const actions = {
  setProfileId: ({ commit }, payload) => {
    commit(types.SET_PROFILEID, payload);
  },
  setName: ({ commit }, payload) => {
    commit(types.SET_NAME, payload);
  },
  setBase: ({ commit }, payload) => {
    commit(types.SET_BASE, payload);
  },
  setSkills: ({ commit }, payload) => {
    commit(types.SET_SKILLS, payload);
  },
  setExperience: ({ commit }, payload) => {
    commit(types.SET_EXPERIENCE, payload);
  },
  setProjects: ({ commit }, payload) => {
    commit(types.SET_PROJECTS, payload);
  },
  setEducation: ({ commit }, payload) => {
    commit(types.SET_EDUCATION, payload);
  },
  setEvaluation: ({ commit }, payload) => {
    commit(types.SET_EVALUATION, payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import home from "./modules/home";
import share from "./modules/share";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user,
    home,
    share
  }
});

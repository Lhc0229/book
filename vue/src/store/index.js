import Vue from "vue";
import Vuex from "vuex";

import img from './result/img';
import student from "./news/student";
import download from "./result/download";
import upload from "./result/upload";
import login from "./login";
import main from "./main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth:localStorage['auto']
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    img,
    download,
    upload,
    student,
    login,
    main
  }
});

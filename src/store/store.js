import Vue from 'vue'
import Vuex from 'vuex'

import todo from "@/store/modules/todo";
import { SnotifyPosition, SnotifyStyle } from 'vue-snotify';

Vue.use(Vuex)

const state = {
}

const mutations = {
  handleExceptions(state, error) {
    if (error.response) {
      if (error.response.data && error.response.data.error) {
        if (error.response.data.code != 422) {
          this.commit(
            "showAlert",
            {
              title: "Error!",
              msg: error.response.data.error,
              type: "error",
              position: "centerTop"
            },
            { root: true }
          );
        }
      }
    } else {
      this.commit(
        "showAlert",
        {
          title: "Error!",
          msg: "Oops..something went wrong.Please check your internet connectivity",
          type: "error",
          position: "centerTop"
        },
        { root: true }
      );
    }
  },
  showAlert: (state, data) => {
    let type = '';
    let position = '';
    switch (data.type) {
      case "error": {
        type = SnotifyStyle.error;
        break;
      }
      case "success": {
        type = SnotifyStyle.success;
        break;
      }
      case "info": {
        type = SnotifyStyle.info;
        break;
      }
      case "warning": {
        type = SnotifyStyle.warning;
        break;
      }
      case "async": {
        type = SnotifyStyle.async;
        break;
      }
      case "confirm": {
        type = SnotifyStyle.confirm;
        break;
      }
      case "prompt": {
        type = SnotifyStyle.prompt;
        break;
      }

      default: {
        type = SnotifyStyle.simple;
        break;
      }
    }
    switch (data.position) {
      case "leftTop": {
        position = SnotifyPosition.leftTop;
        break;
      }
      case "leftCenter": {
        position = SnotifyPosition.leftCenter;
        break;
      }
      case "leftBottom": {
        position = SnotifyPosition.leftBottom;
        break;
      }
      case "rightTop": {
        position = SnotifyPosition.rightTop;
        break;
      }
      case "rightCenter": {
        position = SnotifyPosition.rightCenter;
        break;
      }
      case "rightBottom": {
        position = SnotifyPosition.rightBottom;
        break;
      }
      case "centerCenter": {
        position = SnotifyPosition.centerCenter;
        break;
      }
      case "centerTop": {
        position = SnotifyPosition.centerTop;
        break;
      }
      case "centerBottom": {
        position = SnotifyPosition.centerBottom;
        break;
      }

      default: {
        position = SnotifyPosition.rightTop;
        break;
      }
    }
    Vue.$snotify.clear();

    Vue.$snotify.create({
      title: data.title,
      body: data.msg,
      config: {
        position: position,
        type: type,
        timeout: 2000,
        closeOnClick: true,
        pauseOnHover: true,
      }
    })
  },
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {

    todo

  },
})

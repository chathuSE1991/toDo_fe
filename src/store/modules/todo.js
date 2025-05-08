import router from "@/routes/router";
import { http } from "@/config/http";
import _ from "lodash";

const namespaced = true;

const getDefaultState = () => {
  return {
    errors: [],
  };
};

const state = {
  toDoDetails: {},
};

const getters = {
  loggedIn() {
    return state.tryo_otp_access_token != null;
  },
};

const mutations = {
  clearObj(state) {
    Object.assign(state, getDefaultState());
  },
  setFormErrors(state, data) {
    state.errors = [];
    if (data) {
      state.errors = data.details;
    }
  },

  setTodoDetails(state, data) {
    state.toDoDetails = data;
  },
};

const actions = {
  async addTo({ commit }, data) {
    return new Promise((resolve, reject) => {
      http
        .post("to_do/save", data)
        .then((response) => {
          if (response.data.success) {
          }
          resolve(response);
        })
        .catch((error) => {
          commit("handleExceptions", error, { root: true });
          resolve(error.response);
        });
    });
  },

  async viewTodo({ commit }) {
    return new Promise((resolve) => {
      http
        .get("to_do/list/", null)
        .then((response) => {
          if (response) {
            commit("setTodoDetails", response.data);
          }
          resolve(response);
        })
        .catch((error) => {
          // commit("setFormErrors", error, { root: true });
          resolve(error.response);
        });
    });
  },

  async updateStatus({ commit }, id) {
    return new Promise((resolve) => {
      http
        .get("to_do/update_status/" + id, null)
        .then((response) => {
          if (response) {
          }
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  },
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

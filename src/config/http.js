/**
 * src/api/http.js
 */

import axios from "axios";
import qs from "qs";
import router from '../routes/router';
import store from "../store/store";

/**
 * axios instance
 */
let instance = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  paramsSerializer: function (params) {
    return qs.stringify(params, { indices: false });
  }
});

// request header
instance.interceptors.request.use(
  config => {
    // Do something before request is sent

    // api token
    const apiToken = "Bearer " + localStorage.getItem("tryo_otp_access_token");
    config.headers = {
      Authorization: apiToken,
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  /*handle unauthenticated request*/ 
  if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
    store.commit('login/doLogout');
   /* router.push({
      path: '/login'
    })*/
    //router.go('/wizard');
    
  }
  return Promise.reject(error)
})

export const http = instance;

import Vue from 'vue';
import Vuex from 'vuex';

import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import router from './routes/router';
import { ValidationObserver, ValidationProvider, configure } from 'vee-validate/dist/vee-validate.full';
import { extend } from 'vee-validate/dist/vee-validate.full';
import store from './store/store';
import vSelect from 'vue-select';
import VueI18n from "vue-i18n";
import Multiselect from 'vue-multiselect';
import Numeral  from 'numeral'
import Moment from 'moment'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import Vueditor from 'vueditor'
import 'vueditor/dist/style/vueditor.min.css'
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
//import css
import 'vue-select/dist/vue-select.css';
import "vue-multiselect/dist/vue-multiselect.min.css";

import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
// router setup

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(Vuex);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('v-select', vSelect);
Vue.component('multiselect', Multiselect);
Vue.use(VueI18n);
Vue.use(Numeral);
Vue.use(Moment);
var moment = require('moment');
import money from 'v-money';
Vue.use(money, { precision: 0 });



let lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : null;

if (lang == null) {
    lang = "en";
    localStorage.setItem("lang", lang);
}

const i18n = new VueI18n({
  locale: lang, // set locale
  fallbackLocale: "en", // set fallback locale,
});

let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView'
  ],
  fontName: [
    {val: 'arial black'},
    {val: 'times new roman'},
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  uploadUrl: ''
};
Vue.use(Vuex);
Vue.use(Vueditor, config);
// create a root instance
new Vue({
  el: '#editorContainer'
});

import Snotify from 'vue-snotify';
import "vue-snotify/styles/material.css";
Vue.use(Snotify);

import VueSignaturePad from 'vue-signature-pad';
Vue.use(VueSignaturePad);

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component('loading', Loading);

// Uppercase Directive
Vue.directive('uppercase', {
  bind(el, _, vnode) {
      el.addEventListener('keyup', (e1) => {
          e1.target.value = e1.target.value.toUpperCase()
          vnode.componentInstance.$emit('input', e1.target.value.toUpperCase())
      })
  }
})

// Lowercase Directive
Vue.directive('lowercase', {
  bind(el, _, vnode) {
      el.addEventListener('keyup', (e1) => {
          e1.target.value = e1.target.value.toLowerCase()
          vnode.componentInstance.$emit('input', e1.target.value.toLowerCase())
      })
  }
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('tryo_otp_access_token')
  // If logged in, or going to the Login page.
  if (token) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      var base64Url = localStorage.getItem('tryo_otp_access_token').split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      let payload = JSON.parse(jsonPayload);
      let permissions = payload.scopes;
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!to.meta.permission.every(i => permissions.includes(i)) && to.meta.permission) {
           store.commit('login/doLogout');
          // next({ name: 'Online Term Product' });

        } else {
          next()
        }
      } else {
        next()
      }
    } else {
      next()
    }
  } else {

    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  i18n,
  router,
  store,
  beforeCreate() {
    Vue.$snotify = this.$snotify;
  }
});

import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import VueCookies from "vue-cookies"
Vue.use(VueCookies);
import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormRadioPlugin,
  DropdownPlugin,
  FormCheckboxPlugin,
  IconsPlugin,
  ModalPlugin,
  InputGroupPlugin,
  FormTextareaPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormRadioPlugin,
  DropdownPlugin,
  FormCheckboxPlugin,
  IconsPlugin,
  ModalPlugin,
  InputGroupPlugin,
  FormTextareaPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      if (error.response.status == 419) {
        //session expired
        shared_data.logoutFromFront();
        router.replace("/auth/login");
      }
    }
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  server_domain: "http://localhost:3000",  // https://recipesbynitzanandmalka.cs.bgu.ac.il
  search_result: localStorage.search_result,
  query: localStorage.search_query,

  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    setTimeout(() => { this.logout() }, 23.5 * 60 * 60 * 1000);
  },
  async logout() {
    try {
      const response = await axios.put(
        this.server_domain + "/auth/logout", {}, { withCredentials: true }
      );
      this.logoutFromFront();
      return true;
    } catch (err) {
      console.log(err.response);
      return false;
    }
  },
  logoutFromFront() {
    localStorage.removeItem("username");
    this.username = undefined;
  },
  setSearchResult(search_query, search_result) {
    localStorage.setItem('search_query', JSON.stringify(search_query));
    localStorage.setItem('search_result', JSON.stringify(search_result));
    this.search_result = search_result;
    this.search_query = search_query;
  },
  getSearchResult() {
    return JSON.parse(localStorage.getItem('search_result'));
  },
  getSearchQuery() {
    return JSON.parse(localStorage.getItem('search_query'));
  }
};

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
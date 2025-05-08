<template>
  <base-nav container-classes="container-fluid" class="navbar-top navbar-expand"
    :class="{ 'navbar-dark': type === 'default' }">
    <a href="#" aria-current="page" class="
        h4
        mb-0
         text-uppercase
        d-none d-lg-inline-block
        active
        router-link-active
      ">

    </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-md-auto">
      <!-- This item dont have <b-nav-item> because item have data-action/data-target on tag <a>, wich we cant add -->
      <li class="nav-item d-sm-none">
        <a class="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
          <i class="ni ni-zoom-split-in"> </i>
        </a>
      </li>

    </b-navbar-nav>
    <b-navbar-nav class="align-items-center ml-auto ml-md-0">

      <b-button size="sm" @click="logout()" variant="dark" class="nav-item mb-4 ml-2">Logout</b-button>
      <span id="userName"> <i class="user icon"></i> {{ userName }} </span>
    </b-navbar-nav>

  </base-nav>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { CollapseTransition } from "vue2-transitions";
import { BaseNav } from "@/components";


export default {
  components: {
    CollapseTransition,
    BaseNav,

  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      prefredLang: "en",
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      selected: "radio1",
      userName: ''


    };
  },
  methods: {
    ...mapGetters("login", ["loggedIn"]),
    ...mapActions("login", ["destoryToken"]),
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    logout() {
      this.destoryToken();
    },

    setLocale() {
      this.$root.$i18n.locale = this.prefredLang;
      localStorage.setItem("lang", this.prefredLang);
    },


  },
  mounted() {
    this.userName = localStorage.getItem("userName")
    if (localStorage.getItem("lang") != null) {
      this.prefredLang = localStorage.getItem("lang");
    } else {
      localStorage.setItem("lang", this.prefredLang);
    }
    this.$root.$i18n.locale = this.prefredLang;
  },
};
</script>
<style scoped>
.main-content .navbar-top {
  position: inherit;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: transparent;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

#userName {
  margin-left: 10px;
  padding-bottom: 20px;
}
</style>

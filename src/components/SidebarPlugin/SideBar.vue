<template>
  <nav
    class="
      navbar navbar-vertical
      fixed-left
      navbar-expand-md navbar-light
      bg-white
    "
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar"> </navbar-toggle-button>
      <router-link class="navbar-brand" to="/dashbord">
        <img src="img/logo.png" class="navbar-brand-img mr-2" alt="..." />
      </router-link>

      <slot name="mobile-right">
       

        <!-- <ul v-if="loggedIn()" class="nav align-items-center mb-4 d-md-none">
          <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
            <a slot="title-container" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <i class="ni ni-settings-gear-65"></i>
              </div>
            </a>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <a href="#" @click="logout()" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </base-dropdown>
        </ul> -->
        <b-button
         
          size="sm"
          variant="dark"
          class="nav-item mb-4 mt-1 ml-2 d-md-none"
          @click="openLoginModal"
          >Login</b-button
        >
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="img/logo.png" class="navbar-brand-img mr-2" alt="..." />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button
                @click.native="closeSidebar"
              ></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>
        <!--Divider-->
        <hr class="my-3" />
        <!--Heading-->
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import NavbarToggleButton from "@/components/NavbarToggleButton";

export default {
  name: "sidebar",
  components: {
    NavbarToggleButton,
  },
  props: {
    logo: {
      type: String,
      default: "img/brand/green.png",
      description: "Sidebar app logo",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item",
    },
  },
  data() {
    return {
      prefredLang: "en",
   
    };
  }, 
  methods: {
    ...mapGetters("login", ["loggedIn"]),
    ...mapActions("login", ["destoryToken"]),
    openLoginModal() {
      if (!this.loggedIn()) {
        this.$parent.$refs.login_modal_ref.openModal();
      }
    },
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
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
    if (localStorage.getItem("lang") != null) {
      this.prefredLang = localStorage.getItem("lang");
    } else {
      localStorage.setItem("lang", this.prefredLang);
    }
    this.$root.$i18n.locale = this.prefredLang;
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>

<style>
@media (min-width: 1366px) {
  .navbar-brand-img {
    max-height: 9.5rem !important;
    margin-top: -20px;
  }
}

@media (max-width: 567px) {
  .navbar-brand-img {
    max-height: 5.5rem !important;
    margin-top: -20px;
  }
}
</style>

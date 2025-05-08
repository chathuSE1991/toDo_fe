<template>
<div class="wrapper">
    <!-- <notifications></notifications> -->
   
    <div class="main-content">
        <!-- login form -->
     <div class="container">
        <Login />
    </div>


    </div>
</div>
</template>

<script>


import Login from "@/components/Auth/Login.vue";
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
import {
    FadeTransition
} from "vue2-transitions";

export default {
    components: {
        Login,
        FadeTransition,
    },
    methods: {
        ...mapGetters("login", ["loggedIn"]),
        
    },
    mounted() {
       
    },
};
</script>

<style lang="scss">
// .description-style{
//   background-color: #f0f1f2;
//   border: 1px solid #1990FC ;
//   margin-left: 20px;
//   margin-right: 20px;
//   padding-top: 10px;
//   padding-bottom: 10px;
// }

.navbar-vertical.navbar-expand-md .navbar-nav .nav-link:hover {
    background-color: #2F50E6;
    color: #ffffff;
    transition-duration: 0.2s;
    transition-timing-function: linear;
    transition-delay: 0.1s;
    font-size: 1rem;

}
</style>

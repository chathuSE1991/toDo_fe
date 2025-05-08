<template>
    <div class="wrapper">

        <div class="main-content">

            <addTodo/>
        </div>
    </div>
    </template>

    <script>


    import addTodo from "@/components/Todo/AddTodo.vue";

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
          addTodo,

        },
        methods: {


        },
        mounted() {

        },
    };
    </script>

    <style lang="scss">

    .navbar-vertical.navbar-expand-md .navbar-nav .nav-link:hover {
        background-color: #2F50E6;
        color: #ffffff;
        transition-duration: 0.2s;
        transition-timing-function: linear;
        transition-delay: 0.1s;
        font-size: 1rem;

    }
    </style>

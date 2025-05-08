<template>
    <side-bar>
        <template slot="links">

            <b-nav-item v-show="permissionCheck('DASHBOARD') == true" :to="{ path: '/dashbord' }"> <i
                    class="file icon mb-2 mr-3"></i>Dashbord</b-nav-item>

            <b-nav-item v-show="permissionCheck('MY_ACTION_LIST') == true" :to="{ path: '/my_action/list' }"><i
                    class="file icon mb-2 mr-3"></i>My Action (Dev Team)</b-nav-item>
            <b-nav-item v-show="permissionCheck('DEMO_LIST') == true" :to="{ path: '/demo_request/list' }"><i
                    class="file icon mb-2 mr-3"></i>Lead/Prospect Management</b-nav-item>
            <b-nav-item v-show="permissionCheck('PROPOSAL_LIST') == true" :to="{ path: '/proposal/list' }"><i
                    class="file icon mb-2 mr-3"></i>Proposal/PO Management</b-nav-item>
            <b-nav-item v-show="permissionCheck('VENDOR_LIST') == true" :to="{ path: '/vendor/list' }"><i
                    class="file icon mb-2 mr-3"></i>Client Management</b-nav-item>

            <b-nav-item v-show="permissionCheck('PROJECT_LIST') == true" :to="{ path: '/project/list' }"><i
                    class="file icon mb-2 mr-3"></i>Project/Prospect List</b-nav-item>
            <b-nav-item v-show="permissionCheck('INVOICE_LIST') == true" :to="{ path: '/invoice/list' }">
                <i class="file icon mb-2 mr-3"></i>Invoice Management</b-nav-item>

            <b-nav-item v-show="permissionCheck('ACTIVE_INACTIVE_LIST') == true" :to="{ path: '/exceded/invoice/list' }">
                <i class="file icon mb-2 mr-3"></i>Active/Inactive Recurring Invoices</b-nav-item>

            <b-nav-item-dropdown v-show="permissionCheck('USER_LIST') == true || permissionCheck('ROLE_LIST') == true"  id="my-nav-dropdown" toggle-class="nav-link-custom" right>
                <template #button-content>
                    <i class="file icon mb-2 mr-3"></i>User / Role Management
                </template>
                <b-dropdown-item v-show="permissionCheck('USER_LIST') == true"
                    :to="{ path: '/user/list' }">User</b-dropdown-item>
                <b-dropdown-item v-show="permissionCheck('ROLE_LIST') == true"
                    :to="{ path: '/role/list' }">Role</b-dropdown-item>

            </b-nav-item-dropdown>


        </template>
    </side-bar>
</template>
<script>
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
    },
    computed: {
        ...mapGetters("login", ["checkUserPermission"]),
    },

    mounted() {

    },
    methods: {
        ...mapGetters("login", ["loggedIn"]),
        permissionCheck(permission) {
            return this.checkUserPermission(permission);
        },
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

<template>
  <div>
        <template slot="links">
            <sidebar-item  :link="{
            name: 'Dashbord',
            path: '/dashbord',
            icon: 'ni ni-single-copy-04 text-blue',
          }">
            </sidebar-item>

            <sidebar-item  :link="{
            name: 'Student',
            path: '/student/list',
            icon: 'ni ni-single-copy-04 text-blue',
          }">
            </sidebar-item>
            <sidebar-item  :link="{
            name: 'Vendor',
            path: '/vendor/list',
            icon: 'ni ni-single-copy-04 text-blue',
          }">
            </sidebar-item>

        </template>
    </div>
</template>
<script>

  export default {
        components: {
          
           
        },
    }
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
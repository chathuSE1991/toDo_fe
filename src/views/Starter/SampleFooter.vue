<template>
  <footer class="footer px-4 mx-2">
    <b-row align-v="center" class="justify-content-lg-between">
      <b-col lg="6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{year}} <a href="https://www.tryonics.com" class="font-weight-bold ml-1" target="_blank">Tryonics</a>
        </div>
      </b-col>
      <b-col lg="6">
        <b-nav class="nav-footer justify-content-center justify-content-lg-end">
          <b-nav-item ref="https://www.tryonics.com" target="_blank">
            Tryonics
          </b-nav-item>
          <b-nav-item href="https://www.tryonics.com/presentation" target="_blank">
           About Us
          </b-nav-item>
          <b-nav-item href="http://blog.creative-tim.com" target="_blank">
            Blog
          </b-nav-item>
          <b-nav-item href="https://www.tryonics.com/license" target="_blank">
            License
          </b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      };
    }
  };
</script>
<style></style>

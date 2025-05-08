<template>
  <footer class="footer px-4">
    <b-row align-v="center" class="justify-content-lg-between">
      <b-col lg="6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{year}} <a href="https://www.tryonics.com" class="font-weight-bold ml-1" target="_blank">Tryonics</a>
        </div>
      </b-col>
      <b-col lg="6">
        <b-nav align="center" class="nav-footer justify-content-lg-end">
          <b-nav-item href="https://www.tryonics.com"  target="_blank">
            Tryonics
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
<style>

footer {
  position: fixed;
  clear: both;
  z-index: 0;
  left: 0;
  bottom: 0 !important ;
  width: 100%;
  padding: 12px !important;
  font-size: 14px !important;
}

</style>

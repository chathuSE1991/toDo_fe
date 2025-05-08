<template>
  <div>
  <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Open Modal</b-button>

    <b-modal id="bv-modal-example" centered hide-footer>

        <div class="d-block text-center">
            <img src="img/brand/white.jpeg" class="navbar-brand-img" alt="...">
        </div>
        <h2 class="mb-4">Sign Up</h2>

        <div class="form-group">
            <label class="form-control-label" size="lg">Your Name</label>
            <b-input type="text" placeholder="Enter Your Name">
            </b-input>
        </div>
          <div class="form-group">
            <label class="form-control-label" size="lg">Mobile Number *</label>
            <b-input type="text" placeholder="Enter Your Mobile Number">
            </b-input>
        </div>
          <div class="form-group">
            <label class="form-control-label" size="lg">Email Address</label>
            <b-input type="text" placeholder="Enter Your Email Address">
            </b-input>
        </div>
        <b-button class="mt-5" size="lg" variant="primary" block>Sign Up</b-button>
        <b-button class="mt-3" size="lg" variant="dark" block @click="$bvModal.hide('bv-modal-example')">Close</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar-brand-img {
    width: 100px;
    height: 100px;
    margin-top: -47px;
    margin-bottom: 30px;
}
</style>
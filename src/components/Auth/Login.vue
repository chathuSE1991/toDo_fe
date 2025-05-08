<template>
  <div>
    <!-- <vue-snotify></vue-snotify> -->
    <!--     <b-button id="show-btn" @click="$bvModal.show('register-modal')"
      >Open Modal</b-button
    > -->
    <b-row>
    <b-col align-self="center"><br/>
      <b-col md="6" offset-md="3">
         <h1 class="text-center" style="font-size: 45px">Login</h1>
      <div class="d-block text-center">
      <img src="../../../public/img/logo.png" />
      </div>
      <!-- login form -->
      <ValidationObserver ref="login_form" v-if="formType == 'login'">
        <div class="form-group" id="log-form">



              <ValidationProvider rules="" v-slot="{ errors }" name="email">
                <label class="form-control-label" size="lg">Enter Email</label>
                <b-input type="text" placeholder="Enter Email" v-model="loginForm.email">
                </b-input>
                <div v-if="errors[0]" class="error-text">
                  <span class="msg-paragraph" v-for="(error, index) in errors" v-bind:key="index">{{ error }}</span>
                </div>
              </ValidationProvider>

          <div class="row">
            <div class="col-md-12">
              <div v-if="loginForm.nonFormLoginErrors" class="error-text">
                <span class="msg-paragraph">
                  {{ loginForm.nonFormLoginErrors }}
                </span>
              </div>
            </div>
          </div>
        </div>


      </ValidationObserver>



        <b-button @click="login" class="mt-3" size="lg" variant="primary" block  :disabled="actionBtn">Login</b-button>
      </b-col>
 </b-col>
 </b-row>
  </div>
</template>

<script>
import router from "@/routes/router";
import { mapState, mapActions, mapGetters } from "vuex";
var intervalTimer;
export default {
  name: "Login",
  data: () => {
    return {
      formType: "login",

      loginForm: {

        email: "",
        nonFormLoginErrors: "",
      },
      otp_code: "",
      actionBtn:false,
    };
  },
  computed: {
    ...mapState("login", ["tryo_otp_access_token"]),

  },
  methods: {
    ...mapGetters("login", ["loggedIn"]),
    ...mapActions("login", ["otpSignin", "otpSignup", "otpVerification"]),



    // login function
    async login() {

      const loginData = {
        email: this.loginForm.email.toLowerCase(),
      };
      localStorage.setItem('email', this.loginForm.email)
      this.actionBtn=true;
      await this.otpSignin(loginData).then((response) => {

        if (response.data.success) {

          this.$router.push('otp_verification')
        } else {
          if (response.data.code == 400 && response.data.error) {

            this.loginForm.nonFormLoginErrors = response.data.error;

          }
          if (response.data && response.data.errors) {

            this.$refs.login_form.setErrors(response.data.errors);
          }

          this.actionBtn=false;
        }
      });
    },



    switchForms(type) {
      this.formType = type;
      this.resetErrorFields();
    },
  },
  mounted() {

  },


};
</script>

<style scoped>
.msg-paragraph {
  display: block;
}

.navbar-brand-img {
  width: 100px;
  height: 100px;
  margin-top: -47px;
  margin-bottom: 30px;
}

.mobile-number-sec {
  padding-left: 10px !important;
}

.error-text {
  color: red;
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.country-code-slot {
  padding-right: 1px !important;
}

.disable-link {
  pointer-events: none !important;
}

#log-form{
margin-top: 50px;
}
</style>
<style>
.country-code-select .vs__dropdown-toggle {
  min-height: 36px !important;
}

@media (max-width: 575.98px) {
  .country-code-select .vs__dropdown-toggle {
    min-height: 40px !important;
    width: 96% !important;
    margin-bottom: 20px !important;
  }
}
</style>

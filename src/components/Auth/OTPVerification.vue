<template>
  <div>
    <vue-snotify></vue-snotify>
    <!--     <b-button id="show-btn" @click="$bvModal.show('register-modal')"
        >Open Modal</b-button
      > -->




    <b-row>
      <b-col align-self="center">
        <b-col md="4" offset-md="4">
          <br />
          <h1 class="text-center" style="font-size: 45px">OTP Verification</h1>
          <div class="d-block text-center">
            <img src="../../../public/img/logo.png" />
          </div>

          <p class="text-muted mb-4">
            Please enter the verification code sent to your email
          </p>

          <ValidationObserver ref="otp_form">
            <div class="form-group">
              <ValidationProvider vid="otp_code" v-slot="{ errors }" name="OTP Code" rules="required|numeric|min:7|max:7">
                <b-input type="tel" v-model="otp_code" placeholder="Enter One-time passcode here …">
                </b-input>
                <div v-if="errors[0]" class="error-text">
                  <span class="msg-paragraph" v-for="(error, index) in errors" v-bind:key="index">{{ error }}</span>
                </div>
              </ValidationProvider>
            </div>
          </ValidationObserver>
          <p class="text-muted text-center mb-4" v-if="endTime == 0">
            Didn’t received an OTP ?
            <a :class="endTime != 0 ? 'disable-link' : ''" class="resend-align" href="#" @click="resendOtp">Resend OTP</a>
          </p>

          <div class="text-center" v-if="endTime != 0">
            <small>The OTP will be expired in </small>
            <label>{{ timeLeft }}</label>
          </div>
          <b-button @click="submitOtp" class="mt-5" size="lg" variant="primary" block>Submit</b-button><br />
          <!-- <a class="resend-align" href="#">Resend OTP</a> -->
          
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
      registerForm: {
        countryCode: "94",
        mobileNumber: "",
        name: "",
        email: "",
        nonFormRegisterErrors: "",
      },
      loginForm: {
        countryCode: "94",
        mobileNumber: "",
        nonFormLoginErrors: "",
      },
      otp_code: "",
      countryCodeOptions: [],
      selectedTime: 0,
      timeLeft: "00:00",
      endTime: "0",
      otpExpiryTime: 120,
    };
  },
  computed: {
    ...mapState("login", ["tryo_otp_access_token"]),

  },
  methods: {
    ...mapGetters("login", ["loggedIn"]),
    ...mapActions("login", ["otpSignin", "otpSignup", "otpVerification"]),
    ...mapActions("master", ["countryCodeList", "documentTypeList", "hospitalList"]),
    resetErrorFields() {

    },

    async submitOtp() {
      const varifyData = {
        email: localStorage.getItem('email'),
        otp_code: this.otp_code,
      };

      await this.otpVerification(varifyData).then((response) => {
        if (response.data.success) {
          this.$router.push('dashbord')
        } else {
          this.$refs.otp_form.setErrors(response.data.errors);
        }
      });
    },

    switchForms(type) {
      this.formType = type;
      this.resetErrorFields();
    },
    setTime(seconds) {
      clearInterval(intervalTimer);
      this.timer(seconds);
    },

    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      // this.initialTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
    },
    countdown(end) {
      // this.initialTime = this.selectedTime;
      intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft === 0) {
          this.endTime = 0;
        }

        if (secondsLeft < 0) {
          clearInterval(intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${this.zeroPadded(minutes)}:${this.zeroPadded(seconds)}`;
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();

      this.endTime = `${this.hourConvert(hour)}:${this.zeroPadded(minutes)}`;
    },
    zeroPadded(num) {
      // 4 --> 04
      return num < 10 ? `0${num}` : num;
    },

    hourConvert(hour) {
      // 15 --> 3
      return hour % 12 || 12;
    },
    async resendOtp() {
      const loginData = {
        email: localStorage.getItem('email'),
      };

      this.actionBtn = true;
      await this.otpSignin(loginData).then((response) => {

        if (response.data.success) {
          this.setTime(this.otpExpiryTime);
          this.$router.push('otp_verification')
        } else {
          if (response.data.code == 400 && response.data.error) {
            this.actionBtn = false;
            this.loginForm.nonFormLoginErrors = response.data.error;

          }
          if (response.data && response.data.errors) {
            this.actionBtn = false;
            this.$refs.login_form.setErrors(response.data.errors);
          }
        }
      });
    }
  },
  mounted() {
    this.setTime(this.otpExpiryTime);
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
  
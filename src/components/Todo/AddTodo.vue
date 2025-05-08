<template>
  <!-- Create & update both handled by this form -->
  <div>
    <vue-snotify></vue-snotify>
    <b-col lg="12" class="toDo">
    <ValidationObserver ref="projectDetailsForm">
      <b-row>
        <b-col lg="6">
          <h2>Add a Task</h2>
          <b-card>


            <ValidationProvider vid="title" name="title" v-slot="{ errors }" rules="required|min:3|max:120">
              <div class="form-group">
                <label class="form-control-label">
                  Title <span class="text-danger">*</span></label>
                <b-input type="text" placeholder="Project Name" v-model="title">
                </b-input>
                <div v-if="errors[0]" class="error-text">
                  <span class="msg-paragraph" v-for="(error, index) in errors" v-bind:key="index">{{ error }}</span>
                </div>
              </div>
            </ValidationProvider>

            <ValidationProvider vid="description" name="Description" v-slot="{ errors }" rules="max:500">
              <div class="form-group">
                <label class="form-control-label">
                  Description</label>
                <b-textarea type="text" placeholder="Description" v-model="description">
                </b-textarea>
                <div v-if="errors[0]" class="error-text">
                  <span class="msg-paragraph" v-for="(error, index) in errors" v-bind:key="index">{{ error }}</span>
                </div>
              </div>
            </ValidationProvider>


            <b-col cols="12" id="filter-btn">
              <div class="float-right col-md-2">
                <b-button class="mt-3 mb-3" size="sm" @click="submitTodo" variant="primary" :disabled="actionDisabled"
                  v-show="action != 'view'" block>Save</b-button>
              </div>
              <div class="float-right col-md-2">

              </div>
            </b-col>

          </b-card>
        </b-col>

        <b-col lg="6">
          <b-card>

            <b-col lg="8">
                  <div class="form-group">

                      <div v-for="todo in toDoDetails">
                    <b-card >
                      <b-row>
                      <b-col lg="12" class="pb-2">
                      <b-card-text>
                          {{ todo.title }}
                      </b-card-text>

                      <b-card-text>   <p>  {{ todo.description }}</p></b-card-text>
                      </b-col>
                      <b-col lg="4" class="pb-2"></b-col>
                      <b-col lg="4" class="pb-2"></b-col>
                      <b-col lg="4" class="pb-2"> <b-button @click="updateTodoStatus(todo.id)"  size="sm" variant="outline-primary">Done</b-button></b-col>
                    </b-row>
                    </b-card>
                  </div>
                  </div>
                  </b-col>
          </b-card>
        </b-col>
      </b-row>
    </ValidationObserver>
</b-col>
    <b-row>

    </b-row>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";
var intervalTimer;
export default {
  name: "add",
  data: () => {
    return {
      actionDisabled: false,
      action: "create",
      formType: "",
      otp_code: "",
      countryCodeOptions: [],
      selectedTime: 0,
      timeLeft: "00:00",
      endTime: "0",
      otpExpiryTime: 120,
      title: "",
      description: ""
    };
  },

  computed: {

    ...mapState("todo", ["toDoDetails"])
  },


  async mounted() {
    // await this.clearProjectDetails();
    // this.action = this.$route.query.action;
    // this.projectDetails.id = this.$route.query.id;
    this.viewTodo();
  },

  methods: {

    ...mapActions("todo", ["addTo", "viewTodo","updateStatus"]),

    submitTodo(type = null) {
      this.actionDisabled = true;
      const toDoData = {
        title: this.title,
        description: this.description
      }

      this.addTo(toDoData).then((response) => {

        if (response.data.success) {
          this.$snotify.clear();
          this.$snotify.success(response.data.success, "", {
            position: "centerTop",
          })
          this.viewTodo();
          this.actionDisabled = false;
          this.title = "",
            this.description = ""
        } else {

          this.actionDisabled = false;
          if (response.data && response.data.errors) {
            this.$refs.projectDetailsForm.setErrors(response.data.errors);
          }
        }
      });

    },

    updateTodoStatus(id) {
      this.actionDisabled = true;
      this.updateStatus(id).then((response) => {
        if (response.data.success) {
          this.$snotify.clear();
          this.$snotify.success(response.data.success, "", {
            position: "centerTop",
          })
          this.viewTodo();
          this.actionDisabled = false;
        } else {

          this.actionDisabled = false;
          if (response.data && response.data.errors) {
            this.$refs.projectDetailsForm.setErrors(response.data.errors);
          }
        }
      });

    }

  }
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

.login {
  margin: auto;
}
.toDo{
 margin-top: 30px;
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

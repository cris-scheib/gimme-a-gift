<template>
  <layout>
    <b-container fluid>
      <div class="avatar">
        <div class="icon">
          <b-icon icon="person"></b-icon>
        </div>
      </div>
      <b-row class="center">
        <b-col cols="12" md="6">
          <b-form>
            <section>
              <b-form-group>
                <b-form-input
                  id="name"
                  v-model="name"
                  type="text"
                  placeholder="name"
                  required
                  disabled
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  required
                  disabled
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <b-form-input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Current Password"
                  class="mt-3"
                  required
                  autocomplete="on"
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  id="newPassword"
                  v-model="newPassword"
                  type="password"
                  placeholder="New Password"
                  required
                  autocomplete="on"
                ></b-form-input>
              </b-form-group>
            </section>
            <footer class="center">
              <b-button
                class="button is-primary"
                @click="changePassword()"
                :disabled="loading"
                >Change password</b-button
              >
            </footer>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </layout>
</template>

<script>
import Layout from "../layout/Layout.vue";

export default {
  components: {
    Layout,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      newPassword: "",
      account: this.hasAccount,
      loading: false,
      errors: [],
      errorsDuration: 12000,
    };
  },
  methods: {
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: (variant === "danger") ? "Error": "Success",
        variant: variant,
        solid: true,
      });
    },
    changePassword() {
      let { password, newPassword, email } = this;
      this.$api
        .put(`/api/user/password/`, { password, newPassword, email })
        .then((res) => {
          this.makeToast("success", res.data.message);
          this.password = "";
          this.newPassword = "";
        })
        .catch((error) => {
          this.makeToast("danger", error.message);
          console.log("error", error);
        });
    },
  },
  created: function () {
    this.$api
     .get(`/api/user/me`)
        .then((res) => res.data)
        .then((data) => {
          this.name = data.name;
          this.email = data.email;
        })
    
  },
};
</script>
<style scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
  border-bottom: 1px solid #f4f2ea;
}
.icon {
  padding: 1.5em;
  background-color: #2d2d33;
  border-radius: 100%;
  margin-bottom: 2rem;
}
.icon .b-icon.bi {
  color: white;
  font-size: 5rem;
}
</style>
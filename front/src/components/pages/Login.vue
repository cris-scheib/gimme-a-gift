<template>
  <div class="content">
    <b-container fluid class="form">
      <b-row class="h-100">
        <b-col lg="4" cols="7" class="m-auto">
          <b-card>
            <b-form>
              <header>
                <div class="center">
                  <img class="icon" src="@/assets/icon.svg" alt="Icon" />
                </div>
                <h3 class="title mt-3">Welcome</h3>
              </header>
              <section>
                <b-form-group v-if="!account">
                  <b-form-input
                    id="username"
                    v-model="username"
                    type="text"
                    placeholder="Username"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group>
                  <b-form-input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="Email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <b-form-input
                    id="password"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    autocomplete="on"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <b-form-checkbox v-model="account"
                    >I already have an account</b-form-checkbox
                  >
                </b-form-group>
              </section>
              <footer class="center">
                <b-button
                  class="button is-primary"
                  @click="check()"
                  :disabled="loading"
                >
                  {{ account ? "Login" : "Sign in" }}</b-button
                >
              </footer>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: ["hasAccount"],
  data() {
    return {
      username: "",
      email: "",
      password: "",
      account: this.hasAccount,
      loading: false,
    };
  },
  methods: {
    makeToast() {
      this.$bvToast.toast("Email or password invalid", {
        title: "Error",
        variant: "danger",
        solid: true,
      });
    },
    check() {
      this.loading = true;
      let { username, email, password } = this;
      this.$api
        .post(`/api/auth/${this.account ? "login" : "register"}`, {
          username,
          email,
          password,
        })
        .catch((error) => {
          console.log("error", error);
        })
        .then((res) => {
          if (res != undefined) {
            localStorage.setItem("token", res.data.token.token);
            localStorage.setItem("refreshToken", res.data.token.refreshToken);
            localStorage.setItem("username", res.data.username);
            this.$router.push("/dashboard");
          } else {
            this.makeToast();
            this.loading = false;
          }
        });
    },
  },
};
</script>

<style scoped>
.icon {
  width: 12em;
}
.title {
  color: #d78db3;
  letter-spacing: 1px;
  margin-bottom: 2rem;
  text-align: center;
}
.content {
  background-color: #f4f2ea;
}
.form {
  background-image: url(/img/icon_blue.f6c8f295.svg);
    background-position: center;
    background-size: cover;
    height: 100vh;
}
.card {
  border-radius: 1em;
  border: unset;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
}
.card-body {
  padding: 3em 4em;
}
</style>
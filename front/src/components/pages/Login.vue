<template>
  <div class="content">
    <b-container fluid class="form position-relative">
      <div class="btn-back">
        <b-link to="/" title="Voltar ao site">
          <b-icon icon="arrow-left"></b-icon>
        </b-link>
      </div>
      <b-row class="h-100">
        <b-col cols="12" xl="5" lg="6" md="7" sm="9" class="m-auto">
          <b-card>
            <b-form>
              <header>
                <div class="center">
                  <img class="icon" src="@/assets/icon.svg" alt="Icon" />
                </div>
                <h3 class="title mt-3">Bem vindo</h3>
              </header>
              <section>
                <b-form-group v-if="account">
                  <b-form-input
                    id="name"
                    v-model="name"
                    type="text"
                    placeholder="Nome"
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
                    placeholder="Senha"
                    autocomplete="on"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <b-form-checkbox v-model="account"
                    >Não possuo uma conta</b-form-checkbox
                  >
                </b-form-group>
              </section>
              <footer class="center">
                <b-button @click="check()" :disabled="loading" variant="primary"
                  >ENTRAR</b-button
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
      name: "",
      email: "",
      password: "",
      account: this.hasAccount,
      loading: false,
    };
  },
  methods: {
    makeToast() {
      this.$bvToast.toast("Email ou senha inválida", {
        title: "Error",
        variant: "danger",
        solid: true,
      });
    },
    check() {
      this.loading = true;
      let { name, email, password } = this;
      this.$api
        .post(`/${this.account ? "register" : "login"}`, {
          name,
          email,
          password,
        })
        .catch((error) => {
          console.log("error", error);
        })
        .then((res) => {
          if (res != undefined) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("photo", res.data.photo);
            this.$router.push("/listas-de-presentes");
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
  color: #69b0b1;
  letter-spacing: 1px;
  margin-bottom: 2rem;
  text-align: center;
}
.content {
  background-color: #f4f2ea;
}
.form {
  background-image: url("../../assets/icon_blue.svg");
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
.bi-arrow-left {
  color: #69b0b1;
  font-size: 1.5em;
 
}
.btn-back{
 position: absolute;
 top: 1em;
 left: 1em;
}
</style>
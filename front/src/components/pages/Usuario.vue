<template>
  <layout>
    <b-container>
      <b-row class="center pt-5 pb-5">
        <b-col cols="12" lg="10" md="9">
          <b-row class="center">
            <b-col cols="12" md="4" class="mb-auto">
              <img :src="this.image" alt="Avatar" class="image-user" />
            </b-col>
            <b-col cols="12" md="8">
              <b-form>
                <section>
                  <b-form-group label="Nome" label-for="name">
                    <b-form-input
                      id="name"
                      v-model="name"
                      type="text"
                      placeholder="name"
                      required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group label="Email" label-for="email">
                    <b-form-input
                      id="email"
                      v-model="email"
                      type="email"
                      placeholder="Email"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-3"
                    label="Gênero:"
                    label-for="genre"
                  >
                    <b-form-select
                      id="genre"
                      v-model="genre"
                      :options="genres"
                      required
                    ></b-form-select>
                  </b-form-group>

                  <b-form-group label="CPF" label-for="cpf">
                    <b-form-input
                      id="cpf"
                      v-model="cpf"
                      type="text"
                      placeholder="CPF"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-checkbox
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="updatePassword"
                    id="updatePassword"
                    >Atualizar senha</b-form-checkbox
                  >
                  <b-form-group v-if="updatePassword">
                    <b-form-input
                      id="password"
                      v-model="password"
                      type="password"
                      placeholder="Senha atual"
                      class="mt-3"
                      required
                      autocomplete="on"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group v-if="updatePassword">
                    <b-form-input
                      id="newPassword"
                      v-model="newPassword"
                      type="password"
                      placeholder="Nova senha"
                      required
                      autocomplete="on"
                    ></b-form-input>
                  </b-form-group>
                </section>
              </b-form>
            </b-col>
          </b-row>
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
      cpf: "000.000.000-00",
      genre: "Feminino",
      loading: false,
      errors: [],
      errorsDuration: 12000,
      genres: ["Masculino", "Feminino", "Outros", "Prefiro não dizer"],
      updatePassword: false,
    };
  },
  methods: {
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
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
    this.name = "Cristine";
    this.image = "https://avatars.githubusercontent.com/u/61483993?v=4";
    this.email = "cris.scheib@hotmail.com";
    this.name = "Cristine";
    // this.$api
    //  .get(`/api/user/me`)
    //     .then((res) => res.data)
    //     .then((data) => {
    //       this.name = data.name;
    //       this.email = data.email;
    //     })
  },
};
</script>
<style scoped>
.image-user {
  width: 100%;
  border-radius: 100%;
}
</style>
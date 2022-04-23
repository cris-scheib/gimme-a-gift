<template>
  <layout>
    <b-container>
      <b-row class="center pt-5 pb-5">
        <b-col cols="12" lg="10" md="9">
          <b-row class="center">
            <b-col cols="12" md="4" class="mb-auto">
              <img
                alt="Avatar"
                class="photo-user"
                :src="this.photo"
                v-b-modal.modal-photo
              />
              <modal-photo :photo.sync="photo" :id="id"/>
            </b-col>
            <b-col cols="12" md="8">
              <b-form>
                <section>
                  <b-form-group label="Nome" label-for="name">
                    <b-form-input
                      id="name"
                      v-model="form.name"
                      type="text"
                      placeholder="Nome"
                      required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group label="Email" label-for="email">
                    <b-form-input
                      id="email"
                      v-model="form.email"
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
                      v-model="form.genre"
                      :options="genres"
                      required
                    ></b-form-select>
                  </b-form-group>

                  <b-form-group label="CPF" label-for="cpf">
                    <b-form-input
                      id="cpf"
                      v-model="form.cpf"
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
                <div class="center">
                  <b-button
                    class="button is-primary w-unset mt-4"
                    @click="saveUser()"
                    :disabled="loading"
                    variant="primary"
                    >Salvar</b-button
                  >
                </div>
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
import ModalPhoto from "../modals/modalPhoto.vue";

export default {
  components: {
    Layout,
    ModalPhoto,
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        cpf: "",
        genre: "Masculino",
      },
      password: "",
      newPassword: "",
      id: null,
      photo: "",
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
    save(data) {
      this.loading = true;
      this.$api
        .patch(`/users/${this.id}/`, data)
        .then((res) => {
          this.makeToast("success", res.data.message);
          localStorage.setItem("name", this.name);
          this.loading = false;
          this.password = "";
          this.newPassword = "";
          this.updatePassword = false;
        })
        .catch((error) => {
          this.makeToast("danger", error.message);
          console.log("error", error);
          this.loading = false;
        });
    },
    saveUser() {
      let data = this.form;
      if (this.updatePassword) {
        data.oldPassword = this.password;
        data.password = this.newPassword;
      }
      this.save(data);
    },
  },
  created: function () {
    this.$api
      .get(`/profile`)
      .then((res) => res.data)
      .then((data) => {
        this.id = data.id;
        this.form.name = data.name;
        this.form.email = data.email;
        this.form.cpf = data.cpf;
        this.form.genre = data.genre === null ? "Masculino" : data.genre;
        this.photo =
          data.photo === null
            ? require("@/assets/user-icon.svg")
            : require("@/assets/user-icon.svg");
      });
  },
};
</script>
<style scoped>
.photo-user {
  width: 100%;
  border-radius: 100%;
  background: linear-gradient(45deg, #d78db3, #69b0b1);
  padding: 0.5em;
  cursor: pointer;
}
</style>
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
              <b-modal
                ref="modal-photo"
                id="modal-photo"
                title="Update your user image"
              >
                <b-form-file
                  ref="file"
                  v-model="newPhoto"
                  placeholder="Escolha uma imagem ..."
                  drop-placeholder="Arraste a imagem aqui..."
                  @change="uploadFile"
                ></b-form-file>

                <template #modal-footer>
                  <div class="w-100 flex-end">
                    <b-button
                      variant="secondary"
                      @click="close()"
                      class="btn-cancel mr-2"
                    >
                      Cancelar
                    </b-button>
                    <b-button variant="primary" @click="savePhoto()">
                      Salvar
                    </b-button>
                  </div>
                </template>
              </b-modal>
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

export default {
  components: {
    Layout,
  },
  data() {
    return {
      id: null,
      name: "",
      email: "",
      password: "",
      newPassword: "",
      photo: "",
      cpf: "",
      genre: "Feminino",
      loading: false,
      newPhoto: null,
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
    uploadFile() {
      this.newPhoto = this.$refs.file.files[0];
    },
    saveUser() {
      let data = {
        name: this.name,
        email: this.email,
        cpf: this.cpf,
        genre: this.genre,
      };
      if (this.updatePassword) {
        data.oldPassword = this.password;
        data.password = this.newPassword;
      }
      this.save(data);
    },
    savePhoto() {
      const data = { photo: null };
      this.save(data);
      this.close()
      // const reader = new FileReader();
      // let file;
      // reader.onloadend = () => {
      //   file = reader.result;
      //   console.log(reader);
      //   const data = { photo: file };
      //   // this.save(data);
      //   console.log(data);
      //   this.photo = this.newPhoto;
      // };
      // reader.readAsDataURL(this.newPhoto);
    },
    close() {
      this.$refs["modal-photo"].hide();
    },
  },
  created: function () {
    this.$api
      .get(`/profile`)
      .then((res) => res.data)
      .then((data) => {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.cpf = data.cpf;
        this.genre = data.genre === null ? "Masculino" : data.genre;
        this.photo = data.photo === null ? require('@/assets/user-icon.svg') : require('@/assets/user-icon.svg');
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
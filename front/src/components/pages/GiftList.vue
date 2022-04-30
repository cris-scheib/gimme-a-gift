<template>
  <layout>
    <div class="list-content">
      <div class="list-header">
        <div>
          <b-link to="/listas-de-presentes">
            <b-icon icon="arrow-left"></b-icon>
          </b-link>
        </div>
        <modal-delete :url="urlDelete" redirect="/listas-de-presentes" />
        <div class="ml-auto">
          <b-dropdown right class="dropdown-no-style">
            <template #button-content>
              <b-icon icon="three-dots-vertical"></b-icon>
            </template>
            <b-dropdown-item v-b-modal.modal-delete
              >Excluir lista</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="7" lg="8">
            <b-form-group class="mb-1">
              <b-form-input
                id="name"
                v-model="list.name"
                type="text"
                placeholder="Nome"
                @input="update({ name: list.name })"
                v-if="list"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                id="description"
                v-model="list.description"
                type="text"
                placeholder="Descrição"
                class="small"
                v-if="list"
                @input="update({ description: list.description })"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="5" lg="4">
            <b-card no-body class="m-3 card-users">
              <b-card-header class="d-flex">
                <b-icon class="mt-auto mb-auto" icon="people-fill"></b-icon>
                <div class="ml-auto">
                  <p class="m-0 text-center"><strong>Pessoas</strong></p>
                  <p class="m-0 text-center">na lista</p>
                </div>
              </b-card-header>
              <div class="p-3">
                <b-list-group>
                  <b-list-group-item
                    v-for="user in users"
                    :key="user.id"
                    class="list-users"
                  >
                    <img
                      alt="Avatar"
                      :src="
                        user.photo == null
                          ? require('@/assets/user-icon.svg')
                          : dir + user.photo
                      "
                      class="photo"
                    />
                    <p class="m-0 pl-2">{{ user.name }}</p>
                  </b-list-group-item>
                  <modal-invite />
                  <b-list-group-item class="list-users add-user center" v-b-modal.modal-invite>
                    <b-icon icon="plus"></b-icon> Adicionar pessoa
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import ModalDelete from "../modals/modalDelete.vue";
import ModalInvite from '../modals/modalInvite.vue';

export default {
  components: {
    Layout,
    ModalDelete,
    ModalInvite,
  },
  data() {
    return {
      list: null,
      userList: null,
      isAdmin: false,
      users: [],
      dir: `http://${process.env.VUE_APP_API_URL}:${+process.env
        .VUE_APP_API_PORT}/`,
      urlDelete: `/lists/${this.$route.params.id}`,
    };
  },
  created: function () {
    this.$api
      .get(`/lists/${this.$route.params.id}`)
      .then((res) => res.data)
      .then((data) => {
        this.list = data.list;
        this.userList = data.userList;
        this.users = data.users;
        this.isAdmin = this.userList.permission === "admin"
      });
  },
  methods: {
    update(field) {
      this.$api.patch(`/lists/${this.$route.params.id}`, field);
    },
  },
};
</script>
<style scoped>
.list-content {
  margin-left: 1em;
  margin-top: 1em;
  border-top-left-radius: 1rem;
  min-height: calc(100vh - 6em);
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  background-color: white;
}
.list-header {
  background: linear-gradient(90deg, #69b0b1, #f4d562, #cc90b2);
  border-top-left-radius: 1rem;
  display: flex;
  padding: 1rem;
}

.form-control {
  font-size: 1.5em;
  margin-top: 0.7em;
  border-bottom: unset;
}
.form-control.small {
  font-size: 1em;
  margin-top: 0;
}

.form-control:active,
.form-control:focus {
  border: unset;
  border-radius: unset;
  color: #0c2e3a;
  border-bottom: 2px solid white;
  -o-border-image: linear-gradient(45deg, #d78db3, #69b0b1) 1;
  border-image: linear-gradient(45deg, #d78db3, #69b0b1) 1;
}
.bi-arrow-left {
  color: white;
  font-size: 1.5em;
}
.card-header {
  color: white;
  background: linear-gradient(45deg, #d78db3, #f4d562);
  border-top-left-radius: 1rem !important;
  border-top-right-radius: 1rem !important;
}
.card-users {
  border: unset;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  border-radius: 1rem;
}
.list-users {
  display: flex;
  box-shadow: 0px 0px 7px 1px #dfdfdf;
  border-radius: 1rem !important;
  border: unset;
  margin: 0.5em 0;
}
.photo {
  border-radius: 100%;
  width: 1.5em;
  height: 1.5em;
  object-fit: cover;
}
.add-user {
  cursor: pointer;
}
.add-user:hover {
  color: white;
  background-color: #d78db3;
}
</style>

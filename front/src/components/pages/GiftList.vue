<template>
  <layout>
    <div class="list-content">
      <div class="list-header">
        <div>
          <b-link to="/listas-de-presentes">
            <b-icon icon="arrow-left"></b-icon>
          </b-link>
        </div>
        <div class="ml-auto">
          <b-dropdown right class="dropdown-no-style">
            <template #button-content>
              <b-icon icon="three-dots-vertical"></b-icon>
            </template>
            <b-dropdown-item
              v-b-modal.modal-delete
              v-if="isAdmin"
              key="delete-modal"
              >Excluir lista</b-dropdown-item
            >
            <b-dropdown-item
              v-if="!isAdmin"
              @click="confirmModal()"
              key="leave-modal"
              >Sair da lista</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
      <b-container fluid>
        <div v-if="isAdmin">
          <modal-delete :url="urlDelete" redirect="/listas-de-presentes" />
          <modal-invite />
        </div>
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
                :disabled="!isAdmin"
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
                :disabled="!isAdmin"
                @input="update({ description: list.description })"
              ></b-form-input>
            </b-form-group>
            <gift-list-products :list="list" v-if="loaded" />
          </b-col>
          <b-col cols="12" md="5" lg="4">
            <gift-list-users :users="users" :isAdmin="isAdmin" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import ModalDelete from "../modals/modalDelete.vue";
import ModalInvite from "../modals/modalInvite.vue";
import GiftListProducts from "../partials/GiftListProducts.vue";
import GiftListUsers from "../partials/GiftListUsers.vue";

export default {
  components: {
    Layout,
    ModalDelete,
    ModalInvite,
    GiftListProducts,
    GiftListUsers,
  },
  data() {
    return {
      list: null,
      userList: null,
      isAdmin: false,
      loaded: false,
      users: [],
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
        this.isAdmin = this.userList.permission === "admin";
        this.loaded = true;
      });
  },
  methods: {
    update(field) {
      this.$api.patch(`/lists/${this.$route.params.id}`, field);
    },
    confirmModal() {
      this.$bvModal
        .msgBoxConfirm(`Deseja sair da lista de presentes?`, {
          title: `Sair da lista de presentes`,
          centered: true,
          okTitle: 'Sair',
          cancelVariant: "info",
          cancelTitle: "Cancelar",
        })
        .then(() => {
          this.leaveList();
        });
    },
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },
    leaveList() {
      this.$api
       .delete(`/user-list/${this.$route.params.id}`)
        .then(() => {
          this.$router.push("/listas-de-presentes");
        })
        .catch((error) => {
          this.close();
          this.makeToast("danger", error.message);
        });
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

.form-control:not(:disabled):active,
.form-control:not(:disabled):focus {
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
.btn-remove-user,
.btn-remove-user:hover {
  margin-left: auto;
  border-radius: 100%;
  padding: 0;
  background-color: transparent;
  border: unset;
  width: unset;
  color: #212529;
}
</style>


<template>
  <b-card no-body class="mt-3 card-users">
    <b-card-header class="d-flex">
      <b-icon class="mt-auto mb-auto" icon="people-fill"></b-icon>
      <div class="ml-auto">
        <p class="m-0 text-center"><strong>Pessoas</strong></p>
        <p class="m-0 text-center">na lista</p>
      </div>
    </b-card-header>
    <b-card-body>
      <b-list-group>
        <b-list-group-item class="list-users">
          <img alt="Avatar" :src="photo" class="photo" />
          <p class="m-0 pl-2">{{ name }}</p>
        </b-list-group-item>

        <b-list-group-item
          v-for="user in users"
          :key="user.id"
          class="list-users"
          :id="user._id"
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
          <b-button
            title="Remover pessoa"
            class="btn-remove-user"
            v-if="isAdmin"
            @click="confirmModal(user)"
            >x</b-button
          >
        </b-list-group-item>
        <b-list-group-item
          v-if="isAdmin"
          class="list-users add-user center"
          v-b-modal.modal-invite
        >
          <b-icon icon="plus"></b-icon> Adicionar pessoa
        </b-list-group-item>
      </b-list-group>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  props: ["users", "isAdmin"],
  data() {
    return {
      name: "",
      photo: "",
      dir: `http://${process.env.VUE_APP_API_URL}:${+process.env
        .VUE_APP_API_PORT}/`,
    };
  },
  created() {
    this.name = localStorage.getItem("name");
    this.photo =
      localStorage.getItem("photo") || require("@/assets/user-icon.svg");
  },
  methods: {
    confirmModal(user) {
      this.$bvModal
        .msgBoxConfirm(`Deseja remover o usuário da lista de presentes?`, {
          title: `Remover o usuário da lista de presentes`,
          centered: true,
          okTitle: "Remover",
          cancelVariant: "info",
          cancelTitle: "Cancelar",
        })
        .then((value) => {
          // Value é true quando confirmado e undefined para quando clica fora do modal 
          if (value) this.removeUser(user);
        });
    },
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },
    removeUser(user) {
      this.$api
        .delete(`/user-list/${this.$route.params.id}/${user._id}`)
        .then(() => {
          const i = this.users.map((object) => object._id).indexOf(user._id);
          this.users.splice(i, 1);
          this.makeToast("success", "Usuário removido com sucesso!");
        })
        .catch((error) => {
          this.makeToast("danger", error.message);
        });
    },
  },
};
</script>
<style scope>
.add-user {
  cursor: pointer;
}
.add-user:hover {
  color: white;
  background-color: #d78db3;
}
.card-header {
  color: white;
  background: linear-gradient(45deg, #d78db3, #f4d562);
  border-top-left-radius: 1rem !important;
  border-top-right-radius: 1rem !important;
}
.photo {
  border-radius: 100%;
  width: 1.5em;
  height: 1.5em;
  object-fit: cover;
  background: linear-gradient(45deg, #d78db3, #69b0b1);
}
.card-users {
  border: unset;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  border-radius: 1rem !important;
}

.b-icon.bi {
  font-size: 1.5em !important;
}
.list-users {
  display: flex !important;
  box-shadow: 0px 0px 7px 1px #dfdfdf;
  border-radius: 1rem !important;
  border: unset;
  margin: 0.5em 0;
}
</style>

<template>
  <b-modal
    ref="modal-invite"
    centered
    id="modal-invite"
    title="Convidar pessoa"
  >
    <b-form-group id="input-group">
      <b-form-input
        id="email"
        v-model="email"
        type="email"
        placeholder="Email"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-3">
      <b-form-select
        id="permission"
        v-model="permission"
        :options="permissions"
        required
      ></b-form-select>
    </b-form-group>
    <template #modal-footer>
      <div class="w-100 flex-end">
        <b-button variant="secondary" @click="close()" class="btn-cancel mr-2">
          Cancelar
        </b-button>
        <b-button variant="primary" @click="sendInvite()">
          Enviar convite
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      permission: "guest",
      permissions: [
        {
          text: "Convidado",
          value: "guest",
        },
        {
          text: "Adminitrador",
          value: "admin",
        },
      ],
      listId: this.$route.params.id,
    };
  },
  methods: {
    close() {
      this.$refs["modal-invite"].hide();
    },
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },
    sendInvite() {
      const { email, listId } = this;
      this.$api
        .post(`/invites`, { email, listId })
        .then((res) => {
          this.email = "";
          this.makeToast("success", res.data.message);
          this.close();
        })
        .catch((error) => {
          console.log("error", error);
          this.makeToast("danger", error.message);
        });
    },
  },
};
</script>
<style scoped>
.form-control {
  border-radius: 1rem !important;
  border: 1px solid #e1e1e1;
}
</style>


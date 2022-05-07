
<template>
  <b-modal ref="modal-delete" id="modal-delete" title="Excluir registro">
    <p class="m-0">Deseja excluir a lista de presentes?</p>
    <template #modal-footer>
      <div class="w-100 flex-end">
        <b-button variant="secondary" @click="close()" class="btn-cancel mr-2">
          Cancelar
        </b-button>
        <b-button variant="primary" @click="deleteRegister()">
          Excluir
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ["url", "redirect"],
  methods: {
    close() {
      this.$refs["modal-delete"].hide();
    },
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },

    deleteRegister() {
      this.$api
        .delete(this.url)
        .then(() => {
          this.$router.push(this.redirect);
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
</style>


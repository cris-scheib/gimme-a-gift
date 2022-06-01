
<template>
  <b-modal ref="modal-photo" id="modal-photo" title="Atualizar foto">
    <b-form-file
      ref="file"
      v-model="newPhoto"
      placeholder="Escolha uma imagem ..."
      drop-placeholder="Arraste a imagem aqui..."
      @change="uploadFile"
    ></b-form-file>
    <template #modal-footer>
      <div class="w-100 flex-end">
        <b-button variant="secondary" @click="close()" class="btn-cancel mr-2">
          Cancelar
        </b-button>
        <b-button variant="primary" @click="savePhoto()"> Salvar </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ["photo"],
  data() {
    return {
      newPhoto: null,
    };
  },
  methods: {
    close() {
      this.$refs["modal-photo"].hide();
    },
    uploadFile() {
      this.newPhoto = this.$refs.file.files[0];
    },
    savePhoto() {
      this.save();
    },
    save() {
      const formData = new FormData();
      formData.append("file", this.newPhoto);
      this.$api
        .put(`/users/photo`, formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          this.newPhoto = null;
          this.close();
          this.$emit("update:photo", res.data.photo);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>
<style scoped>
</style>


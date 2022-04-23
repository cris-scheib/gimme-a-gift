
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
        <b-button
          variant="primary"
          @click="savePhoto()"
        >
          Salvar
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ["photo", "id"],
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
      console.log(formData, this.newPhoto)
      const headers = { "Content-Type": "multipart/form-data" };
       this.$api
         .put(`/users/${this.id}/photo`, { photo: formData }, { headers })
         .then((res) => {
           this.newPhoto = "";
           this.close();
           console.log(res);
           // this.$emit("update:photo", this.newPhoto);
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


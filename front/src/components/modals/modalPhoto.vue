
<template>
  <b-modal ref="modal-photo" id="modal-photo" title="Update your user image">
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
      const data = { photo: null };
      this.save(data);
      this.close();
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
  },
};
</script>
<style scoped>
</style>


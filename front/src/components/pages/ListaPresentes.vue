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
            <b-dropdown-item  v-b-modal.modal-delete>Excluir lista</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <b-container fluid>
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
      </b-container>
    </div>
  </layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import ModalDelete from "../modals/modalDelete.vue";

export default {
  components: {
    Layout,
    ModalDelete,
  },
  data() {
    return {
      list: null,
      urlDelete: `/lists/${this.$route.params.id}`
    };
  },
  created: function () {
    this.$api
      .get(`/lists/${this.$route.params.id}`)
      .then((res) => res.data)
      .then((data) => {
        this.list = data;
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
</style>

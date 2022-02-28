<template>
  <layout>
    <b-container>
      <div class="d-flex align-items-center">
        <h3 class="title">Types of Movements</h3>
        <div class="ml-auto">
          <b-button @click="openEditModal()" class="btn-edit">
            <b-icon icon="plus"></b-icon> Create</b-button
          >
        </div>
      </div>
      <b-modal
        id="modal-edit-create"
        ref="modal-edit"
        :title="this.title"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="action-label" label="Action:" label-for="action">
            <b-form-select
              id="action"
              v-model="action"
              :options="actionList"
            ></b-form-select>
          </b-form-group>
          <b-form-group id="status-label" label="Status:" label-for="status">
            <b-form-select
              id="status"
              v-model="status"
              :options="statusList"
              required
            ></b-form-select>
          </b-form-group>
        </form>
      </b-modal>
      <b-table
        class="text-white"
        striped
        hover
        responsive
        :items="items"
        :fields="fields"
        title=""
      >
        <template #cell(edit)="data">
          <a @click="openEditModal(data.value)" class="action-icon">
            <b-icon icon="pencil-fill"></b-icon
          ></a>
        </template>
        <template #cell(delete)="data">
          <a @click="openDeleteModal(data.value)" class="action-icon"
            ><b-icon icon="x"></b-icon
          ></a>
        </template>
        <template #cell(action)="data">
          {{ data.value ? "In" : "Out" }}
        </template>
        <template #cell(status)="data">
          {{ data.value ? "Enabled" : "Disabled" }}
        </template>
      </b-table>
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
      fields: ["edit", "delete", "name", "action", "status"],
      items: [],
      name: "",
      action: true,
      title: "",
      status: true,
      id: null,
      boxTwo: null,
      actionList: [
        { value: true, text: "In" },
        { value: false, text: "Out" },
      ],
      statusList: [
        { value: true, text: "Enabled" },
        { value: false, text: "Disabled" },
      ],
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
    openEditModal(id = null) {
      if (id == null) {
        this.title = "Create a Movement Type";
        this.name = "";
      } else {
        this.title = "Edit a Movement Type";
        this.id = id;
        let selected = this.items.find((x) => x.edit === id);
        this.action = selected.action;
        this.name = selected.name;
        this.status = selected.status;
      }
      this.$refs["modal-edit"].show();
    },
    openDeleteModal(id) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(
          "Please confirm that you want to delete this Movement Type.",
          {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          this.boxTwo = value;
          if (this.boxTwo) {
            this.$api
              .delete(`/api/movement-type/${this.id}`)
              .then(() => {
                this.makeToast("success", "Movement type deleted with success");
                this.items = [];
                this.getTypes();
              })
              .catch((error) => {
                this.makeToast("danger", error.message);
                console.log("error", error);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.id = id;
    },
    resetModal() {
      this.name = "";
      this.status = true;
      this.action = true;
    },
    handleOk() {
      let { name, status, action } = this;
      if (this.id == null) {
        this.$api
          .post(`/api/movement-type/`, { name, status, action })
          .then((res) => {
            this.makeToast("success", "New movement type created with success");
            console.log(res);
            this.items = [];
            this.getTypes();
          })
          .catch((error) => {
            this.makeToast("danger", error.message);
            console.log("error", error);
          });
      } else {
        this.$api
          .put(`/api/movement-type/${this.id}`, { name, status, action })
          .then((res) => {
            this.makeToast("success", "Movement type updated with success");
            console.log(res);
            this.items = [];
            this.getTypes();
          })
          .catch((error) => {
            this.makeToast("danger", error.message);
            console.log("error", error);
          });
      }
    },
    handleSubmit() {
      // Exit when the form isn't valid
    },
    getTypes() {
      this.$api
        .get(`/api/movement-type/`)
        .then((res) => res.data)
        .then((data) => {
          for (let type of data) {
            let item = {
              edit: type.id,
              delete: type.id,
              name: type.name,
              action: type.action,
              status: type.status,
            };
            this.items.push(item);
          }
        })
        .catch(() => {});
    },
  },
  created: function () {
    this.getTypes();
  },
};
Layout;
</script>
<style scoped>
.title {
  color: white;
  margin: 2rem 0;
}
.action-icon {
  color: white;
}
.action-icon {
  color: white;
  cursor: pointer;
}
.action-icon .bi-pencil-fill {
  font-size: 1.3rem;
}
.action-icon .bi-x {
  font-size: 2rem;
}
</style>

<template>
  <layout>
    <b-container>
      <div class="d-flex align-items-center">
        <h3 class="title">Movements</h3>
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
          <b-form-group
            label="Value"
            label-for="value-input"
            invalid-feedback="Value is required"
          >
            <b-form-input
              id="value-input"
              type="number"
              v-model="value"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="type-label" label="Movement Type:" label-for="movement_type">
            <b-form-select
              id="movement_type"
              v-model="movement_type"
              :options="types"
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
        <template #cell(value)="data">
          ${{ data.value}}
        </template>
        <template #cell(movement_type)="data">
           {{ types.find((x) => x.value === data.value).text }}
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
      fields: ["edit", "delete", "name", "value", "movement_type"],
      items: [],
      name: "",
      value: null,
      movement_type: null,
      title: "",
      types: [],
      id: null,
      boxTwo: null,
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
        this.title = "Create a Movement";
        this.name = "";
      } else {
        this.title = "Edit a Movement";
        this.id = id;
        let selected = this.items.find((x) => x.edit === id);
        this.name = selected.name;
        this.value = selected.value;
        this.movement_type = selected.movement_type;
      }
      this.$refs["modal-edit"].show();
    },
    openDeleteModal(id) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(
          "Please confirm that you want to delete this Movement.",
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
              .delete(`/api/movement/${this.id}`)
              .then(() => {
                this.makeToast("success", "Movement deleted with success");
                this.items = [];
                this.getMovements();
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
      this.value = null;
      this.movement_type = this.types[0].value
    },
    handleOk() {
      let { name, value, movement_type } = this;
      if (this.id == null) {
        this.$api
          .post(`/api/movement/`, { name, value, movement_type_id: movement_type })
          .then((res) => {
            this.makeToast("success", "New movement created with success");
            console.log(res);
            this.items = [];
            this.getMovements();
          })
          .catch((error) => {
            this.makeToast("danger", error.message);
            console.log("error", error);
          });
      } else {
        this.$api
          .put(`/api/movement/${this.id}`, { name, value, movement_type_id: movement_type })
          .then((res) => {
            this.makeToast("success", "Movement updated with success");
            console.log(res);
            this.items = [];
            this.getMovements();
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
            let item = { value: type.id, text: type.name };
            this.types.push(item);
          }
         
          this.movement_type = this.types[0].value
        })
        .catch(() => {});
        
    },
    getMovements() {
      this.$api
        .get(`/api/movement/`)
        .then((res) => res.data)
        .then((data) => {
           for (let movement of data) {
            let item = { 
              edit: movement.id, 
              delete: movement.id, 
              name: movement.name,
              value:  movement.value,
              movement_type: movement.movement_type_id};
            this.items.push(item);
          }
        })
        .catch(() => {});
    },
  },
  created: function () {
    this.getTypes();
    this.getMovements();
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
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>

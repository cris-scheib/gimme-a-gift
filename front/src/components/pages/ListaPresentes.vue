<template>
  <layout>
    <div class="list-content">
      <div class="list-header">
        <svg
          data-v-4855107e=""
          data-v-063de322=""
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 29 151 18"
          preserveAspectRatio="none"
          shape-rendering="auto"
          class="waves"
        >
          <defs data-v-4855107e="" data-v-063de322="">
            <path
              data-v-4855107e=""
              data-v-063de322=""
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            ></path>
          </defs>
          <use
            data-v-4855107e=""
            data-v-063de322=""
            xlink:href="#gentle-wave"
            x="39"
            y="-11"
            fill="#d78db3"
          ></use>
          <use
            data-v-4855107e=""
            data-v-063de322=""
            xlink:href="#gentle-wave"
            x="48"
            y="7"
            fill="#69b0b1"
          ></use>
        </svg>
      </div>
      <b-container fluid>
        <b-form-group>
          <b-form-input
            id="name"
            v-model="list.name"
            type="text"
            placeholder="Nome"
            required
          ></b-form-input>
        </b-form-group>
      </b-container>
    </div>
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
      list: [],
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
  background-color: #69b0b1;
  height: 3em;
  border-top-left-radius: 1rem;
  overflow: hidden;
}

.form-control {
  font-size: 1.5em;
  margin-top: 0.7em;
  border-bottom: unset;
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
</style>

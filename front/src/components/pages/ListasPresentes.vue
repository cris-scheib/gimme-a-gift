<template>
  <layout>
    <b-container fluid>
      <b-row class="pb-5 pt-4">
        <b-col cols="12" sm="6" lg="4" class="mb-3">
          <div>
            <b-card class="new" @click="createNewList()">
              <div>
                <div class="center mb-3">
                  <div class="icon-content">
                    <b-icon icon="gift-fill"></b-icon>
                  </div>
                </div>
                <p class="text-center m-0">
                  Criar nova lista de <br />presentes
                </p>
              </div>
            </b-card>
          </div>
        </b-col>
        <b-col
          cols="12"
          sm="6"
          lg="4"
          v-for="list in lists"
          :key="list.id"
          class="mb-3"
        >
          <div>
            <b-card @click="editList(list._id)">
              <div>
                <div class="list-info">
                  <p>{{ list.name }}</p>
                </div>
                <div class="d-flex justify-content-end mt-3">
                  <b-button variant="primary">Ver mais</b-button>
                </div>
              </div>
            </b-card>
          </div>
        </b-col>
      </b-row>
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
      lists: [],
    };
  },
  methods: {
    editList(id) {
      this.$router.push({ name: "lista-de-presentes", params: { id } });
    },
    createNewList() {
      this.$api
        .post(`/lists`, {
          name: "Nova lista",
        })
        .catch((error) => {
          console.log("error", error);
        })
        .then((res) => {
          this.$router.push({
            name: "lista-de-presentes",
            params: { id: res.data.list._id },
          });
        });
    },
  },
  created: function () {
    this.$api
      .get(`/lists`)
      .then((res) => res.data)
      .then((data) => {
        this.lists = data.docs;
      });
  },
};
</script>
<style scoped>
.card {
  border-radius: 1em;
  border: unset;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  cursor: pointer;
  height: 12em;
  position: relative;
}

.card.new .card-body {
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-primary {
  width: unset;
}
.card:hover .btn-primary {
  color: #fff;
  background-color: #69b0b1 !important;
  border-color: #69b0b1 !important;
}
.icon-content {
  padding: 1.5em;
  background-color: #f4d562;
  height: 1em;
  width: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  color: white;
}

.list-info {
  height: 6em;
}
.card.new::after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 1em;
  background: linear-gradient(45deg, #d78db3, #69b0b1);
  z-index: 0;
  clip-path: circle(5% at 105% -10%);
  transition: all 0.1s ease-out;
}
.card.new:hover::after {
  clip-path: circle(75%);
}
.card.new:hover {
  color: white;
}
.card.new:hover .icon-content {
  color: #69b0b1;
  background-color: white;
}
</style>

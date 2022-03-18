<template>
  <div>
    <Sidebar :colapsed="colapsed" />
    <main>
      <header>
        <b-button class="btn-sidebar" @click="colapsed = !colapsed">
          <b-icon v-if="colapsed" icon="chevron-double-right"></b-icon>
          <b-icon v-else icon="chevron-double-left"></b-icon>
        </b-button>
        <b-icon icon="person"></b-icon>
        <p class="m-0 pl-2">{{ this.name }}</p>
      </header>
      <slot />
      <footer></footer>
    </main>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
export default {
  components: { Sidebar },
  data() {
    return {
      name: "",
      colapsed: true,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  created: function () {
    // this.name = localStorage.getItem("name");
    this.name = "Usuário Teste";
  },
};
</script>
<style scoped>
main {
  height: 100vh;
  margin-left: 13em;
  background-color: #f4f2ea;
}
header {
  padding: 1em;
  background: linear-gradient(45deg, #d78db3, #69b0b1);
}
.user-data {
  width: unset;
}
header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.nav-link {
  display: block;
  padding: 0.3rem 0rem;
  color: #69b0b1;
  font-size: 1.1rem;
}
.btn-sidebar {
  margin-right: auto;
  background-color: unset;
  border-color: white;
  color: white;
}
</style>


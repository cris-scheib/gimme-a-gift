<template>
  <div>
    <b-sidebar id="my-sidebar" :title="this.name" shadow>
      <div class="px-3 py-2">
        <b-nav vertical>
          <b-nav-item to="/me">Meu perfil</b-nav-item>
          <b-nav-item @click="logout()">Sair</b-nav-item>
        </b-nav>
      </div>
    </b-sidebar>
    <main>
      <header>
        <b-button class="user-data" variant="primary" v-b-toggle.my-sidebar>
          <b-icon icon="person"></b-icon>
          <p class="m-0 pl-2">{{ this.name }}</p>
        </b-button>
      </header>
      <slot />
      <footer></footer>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  created: function () {
    this.name = localStorage.getItem("name");
  },
};
</script>
<style scoped>
main {
  height: 100vh;
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
</style>


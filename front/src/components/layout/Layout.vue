<template>
  <div>
    <sidebar />
    <main>
      <header>
        <b-link class="user-data" to="/me">
          <b-icon icon="person"></b-icon>
          <p class="m-0 pl-2">{{ this.username }}</p>
        </b-link>
        <b-button @click="logout()" class="btn-logout"> Logout </b-button>
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
      username: "",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
  created: function () {
    this.username = localStorage.getItem("username");
  },
};
</script>
<style scoped>
main {
  margin-left: 13rem;
  height: 100vh;
  background-color: #3f3f47;
}
header {
  padding: 1em;
  background-color: #f4f2ea;
}
.user-data {
  color: #3f3f47;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btn-logout{
  width: unset;
  background-color: #2d2d33;
  color: #f4f2ea;
  padding: .4rem .9rem;
  margin-left: 1rem;
  font-size: .9rem;
}
header{
  display: flex;
  align-items: center;
      justify-content: flex-end;
}
</style>


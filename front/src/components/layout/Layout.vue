<template>
  <div class="h-100">
    <Sidebar :collapsed="collapsed" />
    <main>
      <header>
        <b-button class="btn-sidebar" @click="collapsed = !collapsed">
          <b-icon icon="list"></b-icon>
        </b-button>

        <b-dropdown class="btn-usuario dropdown-no-style">
          <template #button-content>
            <div class="center">
              <img :src="photo" alt="Avatar" class="photo" />
              <p class="m-0 pl-2">{{ name }}</p>
            </div>
          </template>
          <b-dropdown-item to="/minha-conta">Minha conta</b-dropdown-item>
          <b-dropdown-item @click="logout">Sair</b-dropdown-item>
        </b-dropdown>
      </header>
      <div class="slot">
        <slot />
      </div>
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
      collapsed: true,
      photo: null,
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
    this.photo =
      localStorage.getItem("photo") || require("@/assets/user-icon.svg");
  },
};
</script>
<style scoped>
main {
  min-height: 100%;
  margin-left: 13em;
  background-color: #f4f2ea;
}
header {
  padding: 1em;
  background: linear-gradient(45deg, #d78db3, #69b0b1);
  position: fixed;
  width: calc(100% - 13rem);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
}
.slot {
  padding-top: 5rem;
}
.nav-link {
  display: block;
  padding: 0.3rem 0rem;
  color: #69b0b1;
  font-size: 1.1rem;
}
.btn-sidebar,
.btn-sidebar:hover {
  margin-right: auto;
  background-color: unset;
  border: unset;
  color: white;
  padding: 0.247rem 0.5rem;
}
.btn-usuario {
  display: flex;
  background-color: unset;
  border: unset;
  border-radius: 3rem;
  color: white;
  justify-content: center;
  align-items: center;
}
.btn-usuario:hover {
  background-color: unset;
  border-color: transparent;
}
.btn-usuario img {
  width: 2em;
  height: 2em;
  border-radius: 100%;
  object-fit: cover;
}
.b-icon.bi {
  font-size: 1.5em !important;
}
.photo {
  background: linear-gradient(45deg, #d78db3, #69b0b1);
}
</style>


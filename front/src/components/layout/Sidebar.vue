<template>
  <div class="sidebar" v-bind:class="{ colapsed: colapsed }">
    <nav>
      <b-nav vertical>
        <img class="icon" src="@/assets/icon_white.svg" alt="Icon" />
        <b-nav-item to="dashboard">
          <b-icon class="mr-1" icon="bar-chart-fill"></b-icon>
          <span>Dashboard</span>
        </b-nav-item>
        <b-nav-item to="listas-de-presentes">
          <b-icon class="mr-1" icon="gift-fill"></b-icon>
          <span>Listas de Presentes</span>
        </b-nav-item>
        <b-nav-item to="eventos">
          <b-icon class="mr-1" icon="calendar2-day-fill"></b-icon>
          <span>Eventos</span>
        </b-nav-item>
        <b-nav-item to="pagamentos">
          <b-icon class="mr-1" icon="credit-card"></b-icon>
          <span>Meus Pagamentos</span>
        </b-nav-item>
      </b-nav>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["colapsed"],
};
</script>

<style scoped>
.icon {
  width: 9em;
  margin: auto;
  padding: 1em;
}
.sidebar.colapsed .icon {
  width: 5em;
  padding: 0.8em;
}
.sidebar {
  background-color: #69b0b1;
  width: 13rem;
  position: fixed;
  height: 100vh;
}
.nav-link {
  color: white;
  padding: 1rem 1rem;
}
.title {
  color: white;
  padding: 0.5em;
  font-size: 1.5em;
}
.btn-sidebar {
  position: absolute;
  right: 0em;
  top: 0em;
  background-color: #121212;
  border: unset;
  height: 54px;
  border-radius: unset;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar.colapsed {
  width: 5rem;
}
.sidebar.colapsed .nav-link span {
  display: none;
}
</style>
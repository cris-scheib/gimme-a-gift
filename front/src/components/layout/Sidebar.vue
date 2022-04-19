<template>
  <div class="sidebar" v-bind:class="{ collapsed: collapsed }">
    <div class="sidebar-content">
      <nav>
        <b-nav vertical>
          <img class="icon" src="@/assets/icon_white.svg" alt="Icon" />
          <b-nav-item to="/listas-de-presentes" title="Listas de Presentes">
            <b-icon class="mr-1" icon="gift-fill"></b-icon>
            <span>Listas de Presentes</span>
          </b-nav-item>
          <b-nav-item to="dashboard" title="Relatórios">
            <b-icon class="mr-1" icon="bar-chart-fill"></b-icon>
            <span>Relatórios</span>
          </b-nav-item>
          <b-nav-item to="pagamentos" title="Meus Pagamentos">
            <b-icon class="mr-1" icon="credit-card"></b-icon>
            <span>Meus Pagamentos</span>
          </b-nav-item>
        </b-nav>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ["collapsed"],
};
</script>

<style scoped>
.icon {
  width: 9em;
  margin: auto;
  padding: 1em;
}
.sidebar.collapsed .icon {
  width: 5em;
  padding: 0.8em;
  margin-bottom: 1em;
}
.sidebar {
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
.sidebar.collapsed {
  width: 5rem;
}
.sidebar.collapsed .nav-link span {
  display: none;
}
</style>
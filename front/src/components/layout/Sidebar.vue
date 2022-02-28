<template>
  <nav>
    <b-nav vertical>
      <b-nav-item to="dashboard">
        <b-icon icon="bar-chart-fill"></b-icon> Dashboard
      </b-nav-item>
      <b-nav-item to="movements">
        <b-icon icon="credit-card"></b-icon> Movements
      </b-nav-item>
      <b-nav-item to="movements-types">
        <b-icon icon="arrow-down-up"></b-icon> Types of movements</b-nav-item
      >
    </b-nav>
  </nav>
</template>
<script>
export default {};
</script>
<style scoped>
nav {
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
.nav {
  background-color: #2d2d33;
  width: 13rem;
}
.nav-link {
  color: #f4f2ea;
  padding: 1rem 1rem;
}
</style>
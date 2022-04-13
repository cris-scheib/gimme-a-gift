<template>
  <div>
    <div class="fixed-navbar">
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand to="/">
          <img class="icon" src="@/assets/icon_white.svg" alt="Icon" />
          <strong class="brand">Gimme a Gift</strong>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/login">Entrar</b-nav-item>
            <!-- <b-nav-item to="/about">About</b-nav-item> -->
            <!-- <b-nav-item to="/documentation">Documentation</b-nav-item> -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-container fluid class="content">
      <section>
        <b-row>
          <b-col>
            <h2>Sua lista de presentes digital</h2>
          </b-col>
          <b-col>
            <img class="astronaut" src="@/assets/astronaut.svg" alt="Icon" />
          </b-col>
        </b-row>
      </section>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.fixed-navbar {
  background: linear-gradient(90deg, #69b0b1, #f4d562, #cc90b2);
  padding: 1em;
  z-index: 1;
  position: fixed;
  width: 100%;
}
.icon {
  max-width: 6em;
}
.content {
  padding-top: 9em;
}
.brand {
  color: white;
}
.astronaut{
      max-height: 70vh;
}
</style>
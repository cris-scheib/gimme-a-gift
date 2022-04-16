<template>
  <div>
    <div class="fixed-navbar">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand to="/" class="center">
          <img class="icon" src="@/assets/icon.svg" alt="Icon" />
          <h3 class="brand">Gimme a Gift</h3>
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
    <section class="open">
      <b-container fluid class="center h-100">
        <h1 class="block" style="--timeduration: 1.5s">
          <div class="reveal" style="--color: #69b0b1; --duration: 0.75s">
            Sua
          </div>
          <div
            class="reveal text-center"
            style="--color: #f4d562; --duration: 0.15s"
          >
            lista de presentes
          </div>
          <div
            class="reveal text-end"
            style="--color: #cc90b2; --duration: 0.5s"
          >
            digital
          </div>
        </h1>
      </b-container>
    </section>

    <section class="differentials">
      <b-container>
        <h3 class="title">Diferenciais</h3>
        <b-row>
          <b-col
            cols="6"
            sm="6"
            md="4"
            lg="3"
            class="mb-4"
            v-for="differential in differentials"
            :key="differential"
          >
            <b-card>
              <b-card-body class="center">
                <p class="m-0">{{ differential }}</p>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="description" style="--smaller: 5em; --bigger: 10em">
      <b-container>
        <h3 class="title">
          Gerencie listas virtuais de presentes de produtos e valores em
          qualquer ocasião comemorativa.
        </h3>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      differentials: [
        "Liberdade",
        "Agilidade",
        "Transparência",
        "Comodidade",
        "Múltiplas lojas",
        "Segurança",
      ],
    };
  },
};
</script>

<style scoped>
.fixed-navbar {
  background-color: white;
  padding: 1em;
  z-index: 1;
  position: fixed;
  width: 100%;
}
.icon {
  max-width: 6em;
}
.brand {
  color: #69b0b1;
}
.open {
  height: 90vh;
  padding-top: 9em;
  background: linear-gradient(90deg, #69b0b1, #f4d562, #cc90b2);
}

.block {
  font-size: calc(8px + 6vw);
}
.description {
  background-color: #d78db3;
  position: relative;
  overflow: hidden;
}
.description::after,
.description::before {
  content: "";
  position: absolute;
  border-radius: 100%;
}
.description::after {
  height: var(--smaller);
  width: var(--smaller);
  background: linear-gradient(90deg, #69b0b1, #f4d562);
  right: calc(var(--smaller) / -2);
  top: calc(var(--smaller) / -2);
}
.description::before {
  height: var(--bigger);
  width: var(--bigger);
  background: linear-gradient(90deg, #69b0b1, #f4d562);
  right: calc(var(--bigger) / -2);
  top: calc(var(--bigger) / -2);
}
.description .title {
  font-size: 2em;
  color: white;
  margin: 0;
  width: 75%;
}
.differentials,
.description {
  padding: 6em 0;
}
.title {
  margin-bottom: 2em;
  position: relative;
}

.title::after {
  content: "";
  position: absolute;
  width: 2em;
  height: 3px;
  background: linear-gradient(90deg, #69b0b1, #f4d562);
  bottom: -0.5em;
  left: 0;
}

.reveal {
  --time: calc(var(--timeduration) + var(--duration));
  color: transparent;
  padding: 4px;
  position: relative;
  overflow: hidden;
  animation: revealBlock 0s var(--time) forwards;
}

.reveal::after {
  content: "";
  width: 0%;
  height: 100%;
  padding-bottom: 4px;
  position: absolute;
  top: 0;
  left: 1px;
  background-color: var(--color);
  animation: revealingIn var(--timeduration) var(--duration) forwards,
    revealingOut var(--timeduration) var(--time) forwards;
}
.card {
  border-radius: 1em;
  border: unset;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  position: relative;
  overflow: hidden;
  color: white;
  font-weight: bold;
}
.col-6:nth-child(1n + 1) .card .card-body {
  background: linear-gradient(90deg, #d78db3, #f4d562);
}

.col-6:nth-child(2n + 1) .card .card-body {
  background: linear-gradient(90deg, #69b0b1, #d78db3);
}

.col-6:nth-child(3n + 3) .card .card-body {
  background: linear-gradient(90deg, #69b0b1, #f4d562);
}

/* animations */
@keyframes revealBlock {
  100% {
    color: white;
  }
}

@keyframes revealingIn {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}

@keyframes revealingOut {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
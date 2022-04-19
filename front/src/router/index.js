import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: require("@/components/pages/Home").default,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: require("@/components/pages/Login").default,
      meta: {
        guest: true,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: require("@/components/pages/Dashboard").default,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/pagamentos",
      name: "pagamentos",
      component: require("@/components/pages/Payments").default,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/minha-conta",
      name: "minha-conta",
      component: require("@/components/pages/User").default,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/listas-de-presentes",
      name: "listas-de-presentes",
      component: require("@/components/pages/GiftLists").default,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/lista-de-presentes/:id",
      name: "lista-de-presentes",
      component: require("@/components/pages/GiftList").default,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let token = localStorage.getItem("token");
    if (!token || token === "null")
      next({ path: "/login", params: { nextUrl: to.fullPath } });
    else next();
  } else if (to.matched.some((record) => record.meta.guest)) {
    let token = localStorage.getItem("token");
    if (!token || token === "null") next();
    else next({ name: "listas-de-presentes" });
  } else {
    next();
  }
});

export default router;

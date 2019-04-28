import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "Index",
      component: () => import("./views/Index.vue"),
      children: [
        { path: "", component: () => import("./views/Info.vue") },
        // { path: "/home", component: () => import("./views/Home.vue") },
        { path: "/info", component: () => import("./views/Info.vue") }
      ]
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "*",
      name: "404",
      component: () => import("./views/404.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.eleToken ? true : false;
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // for big apps
  // {
  //   path: "/",
  //   redirect: "/en",
  // },
  // {
  //   path: "/:lang",
  //   children: [
  //     {
  //       path: "/",
  //       name: "Home",
  //       component: () =>
  //         import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  //       meta: { requiresAuth: true },
  //     },
  //     {
  //       path: "/about",
  //       name: "About",
  //       component: () => import("../views/About.vue"),
  //       meta: { requiresAuth: true },
  //     },
  //     {
  //       path: "/login",
  //       name: "Login",
  //       component: () => import("../views/LoginPage.vue"),
  //     },
  //     {
  //       path: "*",
  //       name: "404",
  //       component: () => import("../views/NotFoundPage.vue"),
  //     },
  //   ],
  // },
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/article/:id",
    name: "Article",
    component: () => import("../views/ArticlePage.vue"),
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/NotFoundPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  // let language = to.params.lang; // for big apps
  // if (language) {
  //   language = "en";
  // }
  // i18n.locale = "en";

  const authUser = JSON.parse(
    window.localStorage.getItem("currentUser") || "{}"
  );

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authUser && authUser.accessToken) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }

  if (to.matched.some((record) => record.name === "Login")) {
    if (authUser && authUser.accessToken) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

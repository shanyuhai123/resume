import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/user"
    },
    {
      path: "/user",
      component: () => import("./views/User.vue"),
      children: [
        {
          path: "",
          redirect: "/user/home"
        },
        {
          path: "home",
          name: "home",
          meta: { requiresAuth: true },
          component: () => import("./views/Home/Home.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login/Login.vue")
    },
    {
      path: "/shares",
      name: "shares",
      component: () => import("./views/Share/Share.vue")
    },
    {
      path: "/market",
      name: "market",
      component: () => import("./views/Market/Market.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.rs_login ? true : false;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLogin) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;

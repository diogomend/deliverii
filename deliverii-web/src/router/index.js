import Router from "vue-router";
import Login from "../views/Login.vue";
import Register from "@/views/Register.vue";
import AdminRoutes from "./admin";
import CustomerRoutes from "./customer";
import AuthService from "../service/auth";

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    ...AdminRoutes,
    ...CustomerRoutes
  ]
});

router.beforeEach((to, from, next) => {
  //const isDestinyLogin = to.name == "Login";
  const isLoggedIn = AuthService.isLoggedIn();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn) {
      next({ name: "Login" });
      return;
    }

    const user = AuthService.getUserInfo();
    if (
      to.matched.some(record => record.meta.user == "Manager") &&
      !user.isManager
    ) {
      return next({ name: "Home" });
    }

    if (
      to.matched.some(record => record.meta.user == "User") &&
      user.isManager
    ) {
      return next({ name: "Deliverii Manager" });
    }
  }

  next();
});

export default router;

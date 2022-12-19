import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { whiteList } from "@/conf";
import { checkLogin } from "@/utils";
import store from "@/store";
import axios from "axios"; // 需要直接访问public下的menus
import { pretty } from "@/utils/request";
import Layout from "../layouts/Layouts.vue";
Vue.use(VueRouter);

const constansRoutes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];
const router = new VueRouter({
  routes: constansRoutes,
});
function asyncRoutesHandler(routes) {
  return routes.map((r) => {
    if (r.component === "Layout") {
      r.component = Layout;
    } else {
      const filepath = r.component;
      r.component = () => import(`../views/${filepath}.vue`);
    }
    if (r.children) {
      r.children = asyncRoutesHandler(r.children);
    }
    return r;
  });
}
async function loadMenus(next, to) {
  let [res, err] = await pretty(axios.get("/menus.json"), {
    responseType: "json",
  });
  if (err) {
    throw new Error("加载动态菜单出错" + err.message);
  }
  let asyncRoutes = asyncRoutesHandler(res.data); // 不需要存储组件函数，使用基本的一些描述字符串即可
  next({ ...to, replace: true }); // 替换当前访问的路径，不会有多余上一页的箭头
  asyncRoutes.forEach((r) => {
    router.addRoute(r);
  });
  // 保存用户菜单 => 申城左侧动态菜单栏
  store.commit("user/changeUserMenus", asyncRoutes);
}

router.beforeEach((to, from, next) => {
  // 1. login/rejister 需要验证吗？ => 白名单放行
  if (whiteList.includes(to.path)) {
    return next();
  }
  let userInfo = checkLogin();
  if (userInfo) {
    // 2. 非白名单 => 2.1 是否登录 =>  2.2 如果登录了从token中解码获取
    // 2.3 登录了, 角色菜单有没有？？？(动态路由)
    // 判断是否是刷新 vuex东西就没了
    console.log(store.getters["user/getUserInfo"]);
    if (!store.getters["user/getUserInfo"]) {
      store.commit("user/changeUserInfo", {
        username: userInfo.account,
      });
      store.commit("user/changeIsLogin", true);
    }
    // 刷新导致路由没有了 也就是动态菜单
    if (!store.getters["user/getUserMenus"]) {
      // 没有路由给你看 则要加载路由
      loadMenus(next, to);
    } else {
      return next(); //有菜单直接放行
    }
    return next();
  } else {
    // 3. 如果没有登录 => 去login登录
    next("/login?redirect=" + to.path);
  }
});

export default router;

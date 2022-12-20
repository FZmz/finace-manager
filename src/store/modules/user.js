import { logout } from "../../apis/user";
import { Message } from "element-ui";
export default {
  state: {
    isLogin: false,
    userInfo: null,
    userMenus: null,
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getUserMenus(state) {
      return state.userMenus;
    },
  },
  mutations: {
    changeIsLogin(state, payload) {
      state.isLogin = payload;
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload;
    },
    changeUserMenus(state, payload) {
      state.userMenus = payload;
    },
  },
  // 异步行为放在
  actions: {
    async doLogout({ commit }, payload) {
      let [res, err] = await logout();
      if (err) {
        return Message.error("退出失败！");
      }
      commit("changeIsLogin", false);
      commit("changeUserInfo", null);
      commit("changeUserMenus", null);
    },
  },
};

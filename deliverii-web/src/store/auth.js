import auth from "../service/auth";
const actions = {
  login: async ({ commit, dispatch }, { email, password }) => {
    const res = await auth.login(email, password);
    if (res) {
      commit("SET_USER", res.user);
      commit("SET_TOKEN", res.token);
      await dispatch(
        "appState/addAlert",
        {
          type: "success",
          message: `Success`
        },
        { root: true }
      );
      return res;
    }
    return false;
  },
  register: async ({ dispatch }, registerObj)=> {
    const res = await auth.register(registerObj);
    if (res) {
      await dispatch(
        "appState/addAlert",
        {
          type: "success",
          message: `Registered Successfully`
        },
        { root: true }
      );
      return res;
    }
    return false;
  },
  logout({ commit }) {
    commit("SET_USER", false);
    commit("SET_TOKEN", false);

    auth.logoutUser();
  },

  async loadSession({ commit }) {
    const isLoggedIn = auth.isLoggedIn();
    if (isLoggedIn) {
      const user = auth.getUserInfo();
      commit("SET_USER", user);
    }
  },
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  }
};

const getters = {
  getUser: state => state.user,
  isLoggedIn: state => !!state.user
};

const state = () => ({
  user: false,
  token: false
});

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations
};

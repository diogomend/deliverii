const getTimeout = alert => {
  return "timeout" in alert ? alert.timeout : 5000;
};

const actions = {
  toggleDrawer: ({ commit }, toggle) => {
    commit("TOGGLE_DRAWER", toggle);
  },
  toggleLoading: ({ commit }, toggle) => {
    commit("TOGGLE_LOADING", toggle);
  },
  addAlert: ({ commit, getters }, alert) => {
    const timeout = getTimeout(alert);
    const alerts = getters.getAlerts;
    const repeatedIndex = alerts.findIndex(val => {
      return val.type === alert.type && val.message === alert.message;
    });
    let id;

    do {
      id = Date.now() + Math.random();
    } while (getters.getAlerts.some(elem => elem.id === id));

    commit("ADD_ALERT", { ...alert, id });

    if (repeatedIndex !== -1) {
      commit("REMOVE_ALERT", repeatedIndex);
    }

    setTimeout(() => {
      const index = getters.getAlerts.findIndex(elem => elem.id === id);

      if (index !== -1) {
        commit("REMOVE_ALERT", index);
      }
    }, timeout);
  }
};

const mutations = {
  ADD_ALERT(state, { type, message, id }) {
    state.alert.push({
      type,
      message,
      id
    });
  },
  REMOVE_ALERT(state, index) {
    state.alert.splice(index, 1);
  },
  TOGGLE_LOADING(state, loading) {
    state.isLoadingSession = loading;
  },
  TOGGLE_DRAWER(state, drawer) {
    state.drawer = drawer;
  }
};

const getters = {
  getAlerts: state => state.alert,
  getLoadingSession: state => state.isLoadingSession,
  drawer: state => state.drawer
};

const state = () => ({
  drawer: false,
  isLoadingSession: true,
  alert: []
});

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations
};

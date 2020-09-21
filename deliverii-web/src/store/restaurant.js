import restaurant from "../service/restaurant";

const actions = {
  fetchAll: async ({ commit }) => {
    const res = await restaurant.fetchAll();
    commit("ADD_RESTAURANTS", res);
  },
  fetchRestaurantInfo: async (_, id) => {
    return await restaurant.fetchRestaurant(id);
  },
  deleteRestaurant: async ({ dispatch }, id) => {
    const res = await restaurant.deleteRestaurant(id);
    if (res) {
      await dispatch(
        "appState/addAlert",
        { type: "success", message: `Delete successfully` },
        { root: true }
      );
    }

    return res;
  },
  createRestaurant: async ({ dispatch }, restaurantObj) => {
    const res = await restaurant.createRestaurant(restaurantObj);
    if (res) {
      await dispatch(
        "appState/addAlert",
        { type: "success", message: `Created successfully` },
        { root: true }
      );
    }

    return res;
  },

  addBlacklist: async ({ dispatch }, { restaurantID, customerID }) => {
    const res = await restaurant.addBlacklist(restaurantID, customerID);
    if (res) {
      await dispatch(
        "appState/addAlert",
        { type: "success", message: `Added to blacklist` },
        { root: true }
      );
    }

    return res;
  }
};

const mutations = {
  ADD_RESTAURANTS(state, restaurants) {
    state.restaurants = restaurants;
  }
};

const getters = {
  getRestaurants: state => state.restaurants
};

const state = () => ({
  restaurants: []
});

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations
};

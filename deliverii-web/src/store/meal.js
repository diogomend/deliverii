import meal from "../service/meal";

const actions = {
  fetchMeals: async (_, restaurantID) => {
    return await meal.fetchMeals(restaurantID);
  },
  fetchMeal: async (_, { restaurant, meal: mealID }) => {
    const mealList = await meal.fetchMeal(restaurant, mealID);
    if (mealList && mealList.length) {
      return mealList[0];
    }

    return false;
  },

  updateMeal: async ({ dispatch }, { restaurant, mealID, mealObj }) => {
    const res = await meal.updateMeal(restaurant, mealID, mealObj);
    if (res) {
      await dispatch(
        "appState/addAlert",
        {
          type: "success",
          message: `Success`
        },
        { root: true }
      );

      return true;
    }

    return false;
  },

  createMeal: async ({ dispatch }, { restaurant, mealObj }) => {
    const res = await meal.createMeal(restaurant, mealObj);
    if (res) {
      await dispatch(
        "appState/addAlert",
        {
          type: "success",
          message: `Success`
        },
        { root: true }
      );

      return true;
    }

    return false;
  }
};

const mutations = {};

const getters = {};

const state = () => ({
  meals: []
});

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations
};

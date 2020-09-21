import api from "@/plugins/api";

export default {
  async fetchMeals(restaurantID) {
    try {
      const res = await api.get(`restaurants/${restaurantID}/meals`);

      return res.data;
    } catch (err) {
      return false;
    }
  },
  async fetchMeal(restaurantID, mealID) {
    try {
      const res = await api.get(`restaurants/${restaurantID}/meals/${mealID}`);

      return res.data;
    } catch (err) {
      return false;
    }
  },

  async updateMeal(restaurantID, mealID, mealObj) {
    try {
      const res = await api.put(
        `restaurants/${restaurantID}/meals/${mealID}`,
        mealObj
      );

      return res.data;
    } catch (err) {
      return false;
    }
  },

  async createMeal(restaurantID, mealObj) {
    try {
      const res = await api.post(`restaurants/${restaurantID}/meals`, mealObj);

      return res.data;
    } catch (err) {
      return false;
    }
  }
};

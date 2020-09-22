import api from "@/plugins/api";

export default {
  async fetchAll() {
    try {
      const res = await api.get(`restaurants`);

      return res.data;
    } catch (err) {
      /* istanbul ignore next */
      return Promise.reject();
    }
  },

  async fetchRestaurant(id) {
    try {
      const res = await api.get(`restaurants/${id}`);
      return res.data;
    } catch (err) {
      return false;
    }
  },

  async deleteRestaurant(id) {
    try {
      await api.delete(`restaurants/${id}`);
      return true;
    } catch (err) {
      return false;
    }
  },

  async createRestaurant(restaurantObj) {
    try {
      await api.post(`restaurants`, restaurantObj);
      return true;
    } catch (err) {
      return false;
    }
  },

  async addBlacklist(restaurantID, customerID) {
    try {
      await api.post(`restaurants/${restaurantID}/blacklist`, {
        id: customerID
      });
      return true;
    } catch (err) {
      return false;
    }
  }
};

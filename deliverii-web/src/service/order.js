import api from "@/plugins/api";

const CART_STORAGE = "cart";
export default {
  async fetchAll(id) {
    try {
      const res = id
        ? await api.get(`orders?restaurantID=${id}`)
        : await api.get(`orders`);
      return res.data;
    } catch (err) {
      return Promise.reject();
    }
  },
  async fetchOrder(id) {
    try {
      const res = await api.get(`orders/${id}`);
      return res.data;
    } catch (err) {
      return false;
    }
  },

  async updateStatus(orderID, status) {
    try {
      const res = await api.patch(`orders/${orderID}`, { status: status });
      return res.data;
    } catch (err) {
      /* istanbul ignore next */
      return Promise.reject();
    }
  },

  async makeOrder(request) {
    try {
      const res = await api.post(`orders`, request);
      return res.data;
    } catch (err) {
      /* istanbul ignore next */
      return Promise.reject();
    }
  },

  clearCart() {
    localStorage.removeItem(CART_STORAGE);
  },

  async loadCart() {
    return await localStorage.getItem(CART_STORAGE);
  },
  saveCart(cart) {
    localStorage.setItem(CART_STORAGE, JSON.stringify(cart));
  }
};

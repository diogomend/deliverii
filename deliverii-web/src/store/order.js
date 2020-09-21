import order from "../service/order";

const actions = {
  fetchAll: async ({ commit }, id) => {
    const res = await order.fetchAll(id);
    commit("ADD_ORDERS", res);
  },
  fetchOrder: async (_, id) => {
    return await order.fetchOrder(id);
  },
  updateStatus: async (_, { orderID, status }) => {
    return await order.updateStatus(orderID, status);
  },
  loadCart: async ({ commit }) => {
    const cart = await order.loadCart();
    if (cart) {
      commit("ADD_CART", JSON.parse(cart));
    }
  },
  addCart({ commit }, cart) {
    order.saveCart(cart);
    commit("ADD_CART", cart);
  },
  addAddress({ commit }, address) {
    commit("ADD_ADDRESS", address);
  },
  async makeOrder({ dispatch, getters }) {
    const cartObj = getters.getCart;
    const meals = cartObj.cart.map(item => {
      return {
        meal: item._id,
        quantity: item.quantity
      };
    });

    const request = {
      meals: meals,
      restaurantID: cartObj.restaurantID,
      address: cartObj.address
    };

    const ret = await order.makeOrder(request);
    if (ret._id) {
      await dispatch(
        "appState/addAlert",
        {
          type: "success",
          message: `Order created successfully`
        },
        { root: true }
      );
      return ret._id;
    }

    return false;
  }
};

const mutations = {
  ADD_ORDERS(state, orders) {
    state.orders = orders;
  },
  ADD_CART(state, cart) {
    state.cart = cart;
  },
  ADD_ADDRESS(state, address) {
    state.cart.address = address;
  }
};

const getters = {
  getOrders: state => state.orders,
  getCart: state => state.cart
};

const state = () => ({
  orders: [],
  cart: {}
});

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations
};

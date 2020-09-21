import Vue from "vue";
import Vuex from "vuex";
import appState from "@/store/appState";
import auth from "@/store/auth";
import order from "@/store/order";
import restaurant from "@/store/restaurant";
import meal from "@/store/meal";

Vue.use(Vuex);

export const storeOptions = {
  modules: {
    appState,
    auth,
    order,
    restaurant,
    meal
  }
};

export default new Vuex.Store(storeOptions);

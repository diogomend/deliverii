import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import OrderMeals from "@/components/OrderMeals.vue";
import { shallowMount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"

Vue.use(Vuex);
Vue.use(Vuetify);


describe("OrderMeals.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = shallowMount(OrderMeals, {
          store,
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });

      it("should return order total", () => {
        const wrapper = shallowMount(OrderMeals, {
          store,
          propsData: {
            cart: [{
              quantity: 3,
              price: 10
            }]
          }
        });
    
        expect(wrapper.vm.orderTotal).toEqual("30.00");
      });

      it("should return zero if no cart", () => {
        const wrapper = shallowMount(OrderMeals, {
          store,
          propsData: {
            cart: []
          }
        });
    
        expect(wrapper.vm.orderTotal).toEqual(0);
      });
})
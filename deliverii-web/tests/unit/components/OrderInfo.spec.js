import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import OrderInfo from "@/components/OrderInfo.vue";
import { shallowMount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"

Vue.use(Vuex);
Vue.use(Vuetify);


describe("OrderInfo.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = shallowMount(OrderInfo, {
          store,
          propsData: {
              address: {},
              created: '2019-11-10'
          }
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });
})
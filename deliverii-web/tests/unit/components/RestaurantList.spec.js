import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import RestaurantList from "@/components/RestaurantList.vue";
import { shallowMount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"

Vue.use(Vuex);
Vue.use(Vuetify);


describe("RestaurantList.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = shallowMount(RestaurantList, {
          store,
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });
})
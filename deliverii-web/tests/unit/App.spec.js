import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import App from "@/App.vue";
import { shallowMount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"
Vue.use(Vuex);
Vue.use(Vuetify);

describe("App.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = shallowMount(App, {
          store
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });
})
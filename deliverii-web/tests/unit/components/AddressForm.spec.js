import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import AddressForm from "@/components/AddressForm.vue";
import { mount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"

Vue.use(Vuex);
Vue.use(Vuetify);


describe("AddressForm.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = mount(AddressForm, {
          store
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });
})
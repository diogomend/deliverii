import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import Notifications from "@/components/helpers/Notifications.vue";
import { shallowMount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"

Vue.use(Vuex);
Vue.use(Vuetify);


describe("Notifications.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = shallowMount(Notifications, {
          store,
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });

      it("GetColor should return the correct color", () => {
        const wrapper = shallowMount(Notifications, {
          store,
          propsData: {
              type: "error"
          }
        });
    
        expect(wrapper.vm.getColor({type: "error"})).toEqual("red");
        expect(wrapper.vm.getColor({type: "success"})).toEqual("green");
      });
});
import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import ToastMessage from "@/components/helpers/ToastMessage.vue";
import { shallowMount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"

Vue.use(Vuex);
Vue.use(Vuetify);


describe("ToastMessage.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = shallowMount(ToastMessage, {
          store,
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });

      it("GetColor should return the correct color", () => {
        const wrapper = shallowMount(ToastMessage, {
          store,
          propsData: {
              type: "error"
          }
        });
    
        expect(wrapper.vm.getColor({type: "error"})).toEqual("red");
      });

      it("GetColor should return the correct color", () => {
        const wrapper = shallowMount(ToastMessage, {
          store,
          propsData: {
              type: "success"
          }
        });
    
        expect(wrapper.vm.getColor({type: "error"})).toEqual("green");
      });
})
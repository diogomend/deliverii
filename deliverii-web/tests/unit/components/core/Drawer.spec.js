import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import Drawer from "@/components/core/Drawer.vue";
import { shallowMount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"

Vue.use(Vuex);
Vue.use(Vuetify);


describe("Drawer.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = shallowMount(Drawer, {
          store,
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });

      it("should get manager drawer", () => {
        storeOptions.modules.auth.getters.getUser = jest.fn().mockImplementation(() => {
            return {isManager: true}
        });
        store = new Vuex.Store(storeOptions);
        const wrapper = shallowMount(Drawer, {
          store,
          computed: {

          }
        });
    
        expect(wrapper.vm.items.length).toEqual(3);
      });

      it("should get user drawer", () => {
        storeOptions.modules.auth.getters.getUser = jest.fn().mockImplementation(() => {
            return {isManager: false}
        });
        store = new Vuex.Store(storeOptions);
        const wrapper = shallowMount(Drawer, {
          store,
          computed: {

          }
        });
    
        expect(wrapper.vm.items.length).toEqual(2);
        expect(wrapper.vm.computedItems.length).toEqual(2);
      });

      it("should call toggleDrawer on setting", () => {
        const mockFn = jest.fn();
        storeOptions.modules.appState.actions.toggleDrawer = mockFn;
        store = new Vuex.Store(storeOptions);
        const wrapper = shallowMount(Drawer, {
          store,
          computed: {
            isMobile: true
          }
        });
    
        wrapper.vm.showDrawer = true;
        expect(mockFn).toHaveBeenCalled();
        expect(wrapper.vm.showDrawer).toBeTruthy();
      });
})
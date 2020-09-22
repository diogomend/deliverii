import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import AppBar from "@/components/core/AppBar.vue";
import { shallowMount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"

Vue.use(Vuex);
Vue.use(Vuetify);


describe("AppBar.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = shallowMount(AppBar, {
          store,
          mocks: {
              $route: {
                  name: "MOCK_NAME"
              }
          }
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });

      it("is a Vue instance", () => {
        const wrapper = shallowMount(AppBar, {
          store,
          mocks: {
              $route: {
                  name: "MOCK_NAME"
              }
          }
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });

      it("is loggedIn should see logout-btn and trigger event", () => {
        const mockFn = jest.fn();
        const wrapper = shallowMount(AppBar, {
          store,
          mocks: {
              $route: {
                  name: "MOCK_NAME",
              },
              $router: {
                push: mockFn
              }
          },
          computed: {
            isLoggedIn() {
              return true
            }
          }
        });
        
        expect(wrapper.find('.logout-btn')).toBeTruthy();
        wrapper.vm.doLogout();
        expect(mockFn).toHaveBeenCalled();
      });
})
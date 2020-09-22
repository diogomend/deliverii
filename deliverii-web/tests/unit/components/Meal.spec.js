import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import Meal from "@/components/Meal.vue";
import { mount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"

Vue.use(Vuex);
Vue.use(Vuetify);


describe("Meal.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = mount(Meal, {
          store,
          propsData: {
              id: 123,
              name: 'MOCK_NAME'              
          }
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });

      it("decrease qty should emit", () => {
        const wrapper = mount(Meal, {
          store,
          propsData: {
              id: 123,
              name: 'MOCK_NAME',
              quantity: 3        
          }
        });
    
        wrapper.find(".decrease").trigger("click");
        const emitted = wrapper.emitted();
        expect(emitted.changeQuantity[0][0].qty).toEqual(2);
      });

      it("should not decrease if qty is 0", () => {
        const wrapper = mount(Meal, {
          store,
          propsData: {
              id: 123,
              name: 'MOCK_NAME',
              quantity: 0      
          }
        });
    
        wrapper.find(".decrease").trigger("click");
        const emitted = wrapper.emitted();
        expect(emitted.changeQuantity[0][0].qty).toEqual(0);
      });

      it("increase qty should emit", () => {
        const wrapper = mount(Meal, {
          store,
          propsData: {
              id: 123,
              name: 'MOCK_NAME',
              quantity: 3        
          }
        });
    
        wrapper.find(".increase").trigger("click");
        const emitted = wrapper.emitted();
        expect(emitted.changeQuantity[0][0].qty).toEqual(4);
      });
})
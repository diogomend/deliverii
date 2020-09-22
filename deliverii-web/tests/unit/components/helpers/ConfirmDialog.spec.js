import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from "vuex";
import ConfirmDialog from "@/components/helpers/ConfirmDialog.vue";
import { shallowMount } from "@vue/test-utils"
import { storeOptions } from "@/store/index"

Vue.use(Vuex);
Vue.use(Vuetify);


describe("ConfirmDialog.vue", () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new Vuex.Store(storeOptions);
      });

      it("is a Vue instance", () => {
        const wrapper = shallowMount(ConfirmDialog, {
          store,
        });
    
        const template = wrapper.html();
        expect(template).toMatchSnapshot();
      });

      it("set dialogModal should emit close", () => {
        const wrapper = shallowMount(ConfirmDialog, {
          store,
        });
    
        wrapper.vm.dialogModal = true;
        expect(wrapper.emitted().close[0][0]).toBeTruthy();
      });

      it("confirmDialog should emit confirm", () => {
        const wrapper = shallowMount(ConfirmDialog, {
          store,
        });
    
        wrapper.vm.confirmDialog();
        expect(wrapper.emitted().confirm[0][0]).toBeTruthy();
      });
})
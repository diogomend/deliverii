import orderService from "@/service/order";
import orderStore from "@/store/order";
jest.mock("@/service/order");

describe("Order Store Actions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

    it("fetchAll should commit to the store", async () => {
        orderService.fetchAll = jest.fn(() => []);

        const commit = jest.fn();
        await orderStore.actions.fetchAll({ commit }, "MOCK_ID");

        expect(commit).toHaveBeenCalled();
    })

    it("fetchOrder should call service", async () => {
        orderService.fetchOrder = jest.fn(() => 'MOCK_RESPONSE');

        const res = await orderStore.actions.fetchOrder({ }, "MOCK_ID");
        expect(res).toEqual('MOCK_RESPONSE');
    })

    it("updateStatus should call service", async () => {
        orderService.updateStatus = jest.fn(() => 'MOCK_RESPONSE');

        const res = await orderStore.actions.updateStatus({ }, "MOCK_ID");
        expect(res).toEqual('MOCK_RESPONSE');
    })

    it("loadCart should commit if success", async () => {
        orderService.loadCart = jest.fn(() => JSON.stringify({ mock: "response"}));

        const commit = jest.fn();
        await orderStore.actions.loadCart({ commit }, "MOCK_ID");
        expect(commit).toHaveBeenCalled();
    })

    it("loadCart should not commit if error", async () => {
        orderService.loadCart = jest.fn(() => false);

        const commit = jest.fn();
        await orderStore.actions.loadCart({ commit }, "MOCK_ID");
        expect(commit).not.toHaveBeenCalled();
    })

    it("addCart should commit if success", async () => {
        orderService.addCart = jest.fn(() => true);

        const commit = jest.fn();
        await orderStore.actions.addCart({ commit }, "MOCK_ID");
        expect(commit).toHaveBeenCalled();
    })

    it("addAddress should commit", async () => {
        const commit = jest.fn();
        await orderStore.actions.addAddress({ commit }, "MOCK_ID");
        expect(commit).toHaveBeenCalledWith("ADD_ADDRESS", "MOCK_ID");
    })
    it("makeOrder should dispatch on success", async () => {
        orderService.makeOrder = jest.fn(() => {
            return {
                _id: 123
            }
        })

        const getters = {
            getCart: {
                cart: [{_id: "MOCK_ID", quantity: 3}]
            }
        };

        const dispatch = jest.fn();
        await orderStore.actions.makeOrder({ dispatch, getters });

        expect(dispatch).toHaveBeenCalled();
    });

    it("makeOrder should not dispatch on error", async () => {
        orderService.makeOrder = jest.fn(() => {
            return false
        });

        const getters = {
            getCart: {
                cart: [{_id: "MOCK_ID", quantity: 3}]
            }
        };
        const dispatch = jest.fn();
        await orderStore.actions.makeOrder({ dispatch, getters });

        expect(dispatch).not.toHaveBeenCalled();
    });
});


describe("Order Store Mutations", () => {
    it("ADD_ORDERS should change state", () => {
        const state = {orders: false};
          orderStore.mutations.ADD_ORDERS(state, true);
          expect(state.orders).toBeTruthy();
    })

    it("ADD_CART should change state", () => {
        const state = {cart: false};
          orderStore.mutations.ADD_CART(state, true);
          expect(state.cart).toBeTruthy();
    })

    it("ADD_ADDRESS should change state", () => {
        const state = {cart: {address: false}};
          orderStore.mutations.ADD_ADDRESS(state, true);
          expect(state.cart.address).toBeTruthy();
    });
});

describe("Order Store Getters", () => {
    it("getOrders should get state", () => {
        const state = {orders: ['MOCK']};
        expect(orderStore.getters.getOrders(state)).toEqual(['MOCK']);
    })

    it("getCart should get state", () => {
        const state = {cart: ['MOCK']};
        expect(orderStore.getters.getCart(state)).toEqual(['MOCK']);
    })
});
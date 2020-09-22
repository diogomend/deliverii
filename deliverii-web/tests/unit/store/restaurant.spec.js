import restaurantService from "@/service/restaurant";
import restaurantStore from "@/store/restaurant";
jest.mock("@/service/restaurant");

describe("Restaurant Store Actions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

    it("fetchAll should commit to the store", async () => {
        restaurantService.fetchAll = jest.fn(() => []);

        const commit = jest.fn();
        await restaurantStore.actions.fetchAll({ commit });

        expect(commit).toHaveBeenCalled();
    })

    it("fetchRestaurantInfo should call service", async () => {
        restaurantService.fetchRestaurant = jest.fn(() => 'MOCK_RESPONSE');

        const res = await restaurantStore.actions.fetchRestaurantInfo({ }, "MOCK_ID");
        expect(res).toEqual('MOCK_RESPONSE');
    })

    it("deleteRestaurant should dispatch if success", async () => {
        restaurantService.deleteRestaurant = jest.fn(() => true);

        const dispatch = jest.fn();
        await restaurantStore.actions.deleteRestaurant({ dispatch }, "MOCK_ID");
        expect(dispatch).toHaveBeenCalled();
    })

    it("deleteRestaurant should not dispatch if error", async () => {
        restaurantService.deleteRestaurant = jest.fn(() => false);

        const dispatch = jest.fn();
        await restaurantStore.actions.deleteRestaurant({ dispatch }, "MOCK_ID");
        expect(dispatch).not.toHaveBeenCalled();
    })

    it("createRestaurant should dispatch if success", async () => {
        restaurantService.createRestaurant = jest.fn(() => true);

        const dispatch = jest.fn();
        await restaurantStore.actions.createRestaurant({ dispatch }, { restaurantID: "MOCK_ID", customerID: "MOCK_ID" });
        expect(dispatch).toHaveBeenCalled();
    })

    it("createRestaurant should not dispatch if error", async () => {
        restaurantService.createRestaurant = jest.fn(() => false);

        const dispatch = jest.fn();
        await restaurantStore.actions.createRestaurant({ dispatch }, { restaurantID: "MOCK_ID", customerID: "MOCK_ID" });
        expect(dispatch).not.toHaveBeenCalled();
    })

    it("addBlacklist should dispatch if success", async () => {
        restaurantService.addBlacklist = jest.fn(() => true);

        const dispatch = jest.fn();
        await restaurantStore.actions.addBlacklist({ dispatch }, { restaurantID: "MOCK_ID", customerID: "MOCK_ID" });
        expect(dispatch).toHaveBeenCalled();
    })

    it("addBlacklist should not dispatch if error", async () => {
        restaurantService.addBlacklist = jest.fn(() => false);

        const dispatch = jest.fn();
        await restaurantStore.actions.addBlacklist({ dispatch }, { restaurantID: "MOCK_ID", customerID: "MOCK_ID" });
        expect(dispatch).not.toHaveBeenCalled();
    })
});


describe("Restaurant Store Mutations", () => {
    it("ADD_RESTAURANTS should change state", () => {
        const state = {restaurants: false};
          restaurantStore.mutations.ADD_RESTAURANTS(state, true);
          expect(state.restaurants).toBeTruthy();
    })
});

describe("Restaurant Store Getters", () => {
    it("getRestaurants should get state", () => {
        const state = {restaurants: ['MOCK']};
        expect(restaurantStore.getters.getRestaurants(state)).toEqual(['MOCK']);
    })
});
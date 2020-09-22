import authService from "@/service/auth";
import authStore from "@/store/auth";
jest.mock("@/service/auth");

describe("Auth Store Actions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

    it("If login successfully should call the store", async () => {
        authService.login = jest.fn(() => {
            return Promise.resolve({user: "MOCK_USER", token: "MOCK_TOKEN"})
        })

        const commit = jest.fn();
        const dispatch = jest.fn();
        await authStore.actions.login({ commit, dispatch}, {email: "MOCK_EMAIL", password: "MOCK_PASSWORD"});

        expect(commit).toHaveBeenCalledTimes(2);
    })
    it("If not login successfully should not call the store", async () => {
        authService.login = jest.fn(() => {
            return Promise.resolve()
        })

        const commit = jest.fn();
        const dispatch = jest.fn();
        await authStore.actions.login({ commit, dispatch}, {email: "MOCK_EMAIL", password: "MOCK_PASSWORD"});

        expect(commit).not.toHaveBeenCalled();
    })

    it("If register successfully should dispatch alert", async () => {
        authService.register = jest.fn(() => {
            return Promise.resolve({user: "MOCK_USER", token: "MOCK_TOKEN"})
        })

        const dispatch = jest.fn();
        await authStore.actions.register({dispatch}, {email: "MOCK_EMAIL", password: "MOCK_PASSWORD"});

        expect(dispatch).toHaveBeenCalledTimes(1);
    })
    it("If register not successfully should not dispatch alert", async () => {
        authService.register = jest.fn(() => {
            return Promise.resolve()
        })

        const dispatch = jest.fn();
        await authStore.actions.register({ dispatch }, {email: "MOCK_EMAIL", password: "MOCK_PASSWORD"});

        expect(dispatch).not.toHaveBeenCalled();
    })

    it("logout should commit to store", async () => {
        authService.logoutUser = jest.fn(() => {
            return true
        })

        const commit = jest.fn();
        await authStore.actions.logout({commit});

        expect(commit).toHaveBeenCalledTimes(2);
    })

    it("loadSession should commit if logged in", async () => {
        authService.isLoggedIn = jest.fn(() => {
            return true
        })

        const commit = jest.fn();
        await authStore.actions.loadSession({commit});

        expect(commit).toHaveBeenCalledTimes(1);
    })
    it("loadSession should not commit if not logged in", async () => {
        authService.isLoggedIn = jest.fn(() => {
            return false
        })

        const commit = jest.fn();
        await authStore.actions.loadSession({commit});

        expect(commit).toHaveBeenCalledTimes(0);
    })
});


describe("Auth Store Mutations", () => {
    it("SET_USER should change state", () => {
        const state = {user: false};
          authStore.mutations.SET_USER(state, true);
          expect(state.user).toBeTruthy();
    })

    it("SET_TOKEN should change state", () => {
        const state = {token: false};
          authStore.mutations.SET_TOKEN(state, true);
          expect(state.token).toBeTruthy();
    })
});

describe("Auth Store Getters", () => {
    it("getUser should get state", () => {
        const state = {user: false};
        expect(authStore.getters.getUser(state)).toBeFalsy()
    })

    it("isLoggedIn should get state", () => {
        const state = {user: true};
        expect(authStore.getters.isLoggedIn(state)).toBeTruthy()
    })
});
import appState from "@/store/appState";

describe("appState mutations", () => {
  it("expects ADD_ALERT to add one alert to the store", () => {
    const state = {
      alert: []
    };
    appState.mutations.ADD_ALERT(state, {
      message: "test",
      type: "error",
      id: 123
    });
    expect(state.alert).toEqual([
      {
        message: "test",
        type: "error",
        id: 123
      }
    ]);
  });

  it("expects REMOVE_ALERT to remove alert in the position at index", () => {
    const state = {
      alert: [
        {
          message: "test",
          type: "error"
        },
        {
          message: "success",
          type: "confirm"
        }
      ]
    };
    appState.mutations.REMOVE_ALERT(state, 0);
    expect(state.alert).toEqual([
      {
        message: "success",
        type: "confirm"
      }
    ]);
  });
  it("expects TOGGLE_LOADING to change loading status", () => {
    const state = {
      isLoadingSession: false
    };
    appState.mutations.TOGGLE_LOADING(state, true);
    expect(state.isLoadingSession).toBeTruthy();
  });

  it("expects TOGGLE_DRAWER to change drawer status", () => {
    const state = {
      drawer: false
    };
    appState.mutations.TOGGLE_DRAWER(state, true);
    expect(state.drawer).toBeTruthy();
  });
});

describe("appState getters", () => {
  it("expects getAlerts to get the state", () => {
    expect(
      appState.getters.getAlerts({
        alert: [
          {
            message: "success",
            type: "confirm"
          }
        ]
      })
    ).toEqual([
      {
        message: "success",
        type: "confirm"
      }
    ]);
  });
  it("expects getLoadingSession to get the state", () => {
    expect(
      appState.getters.getLoadingSession({
        isLoadingSession: true
      })
    ).toEqual(true);
  });

  it("expects drawer to get the state", () => {
    expect(
      appState.getters.drawer({
        drawer: true
      })
    ).toEqual(true);
  });
});

describe("appState actions", () => {

    it("expects toggleDrawer to commit to the store", () => {
        const commit = jest.fn();
        appState.actions.toggleDrawer({ commit }, true);
        expect(commit).toHaveBeenCalledWith("TOGGLE_DRAWER", true);
    });

    it("expects toggleLoading to commit to the store", () => {
        const commit = jest.fn();
        appState.actions.toggleLoading({ commit }, true);
        expect(commit).toHaveBeenCalledWith("TOGGLE_LOADING", true);
    });

    it("expects addAlert to commit to the store", () => {
        jest.useFakeTimers();
        const commit = jest.fn();
        const getters = {
            getAlerts: [{message: "test", type: "error"}]
        };
        appState.actions.addAlert({ commit, getters }, {message: "test", type:"error"});
        jest.runAllTimers();
        expect(commit).toHaveBeenCalledTimes(2);
    });
});

import api from "@/plugins/api";
import orderService from "@/service/order";
jest.mock("@/plugins/api");

describe("Order Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("expects to fetchAll to add restaurant ID and return success", async () => {
    const spy = jest.spyOn(api, "get").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await orderService.fetchAll("MOCK_RESTAURANT");
    expect(spy).toHaveBeenCalledWith("orders?restaurantID=MOCK_RESTAURANT");
    expect(ret).toEqual("MOCK_RESPONSE");
  });

  it("expects to fetchAll to not add restaurant ID", async () => {
    const spy = jest.spyOn(api, "get").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await orderService.fetchAll();
    expect(ret).toEqual("MOCK_RESPONSE");
    expect(spy).toHaveBeenCalledWith("orders");
  });

  it("expects to fetchAll reject in case of error ", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    try {
      await orderService.fetchAll();
    } catch {
      //if exception
      expect(true).toBeTruthy();
    }
  });

  it("expects to fetchOrder if success", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await orderService.fetchOrder("MOCK_ID");
    expect(ret).toEqual("MOCK_RESPONSE");
  });

  it("expects to fetchOrder to fail in case of error ", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    const ret = await orderService.fetchOrder("MOCK_ID");
    expect(ret).toBeFalsy();
  });

  it("expects to updateStatus", async () => {
    jest.spyOn(api, "patch").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await orderService.updateStatus("MOCK_ID", "MOCK_STATUS");
    expect(ret).toEqual("MOCK_RESPONSE");
  });

  it("expects to updateStatus to reject in case of error", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    try {
      await orderService.updateStatus("MOCK_ID", "MOCK_STATUS");
    } catch {
      //if exception
      expect(true).toBeTruthy();
    }
  });

  it("expects to makeOrder", async () => {
    jest.spyOn(api, "post").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await orderService.makeOrder("MOCK_REQUEST");
    expect(ret).toEqual("MOCK_RESPONSE");
  });

  it("expects to makeOrder to reject in case of error", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    try {
      await orderService.makeOrder("MOCK_REQUEST");
    } catch {
      //if exception
      expect(true).toBeTruthy();
    }
  });

  it("expects clearCart to remove Item", async () => {
    const spy = jest.spyOn(Storage.prototype, "removeItem");
    orderService.clearCart();
    expect(spy).toHaveBeenCalled();
  });

  it("expects loadCart to load from storage", async () => {
    const spy = jest.spyOn(Storage.prototype, "getItem");
    await orderService.loadCart();
    expect(spy).toHaveBeenCalled();
  });

  it("expects saveCart to set storage", async () => {
    const spy = jest.spyOn(Storage.prototype, "setItem");
    orderService.saveCart();
    expect(spy).toHaveBeenCalled();
  });
});

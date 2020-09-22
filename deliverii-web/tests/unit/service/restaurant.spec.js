import api from "@/plugins/api";
import restaurantService from "@/service/restaurant";
jest.mock("@/plugins/api");

describe("Restaurant Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("expects to fetchAll in case of success", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await restaurantService.fetchAll("MOCK_RESTAURANT");
    expect(ret).toEqual("MOCK_RESPONSE");
  });

  it("expects to fetchRestaurant if success", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await restaurantService.fetchRestaurant("MOCK_ID");
    expect(ret).toEqual("MOCK_RESPONSE");
  });

  it("expects fetchRestaurant to fail in case of error ", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    const ret = await restaurantService.fetchRestaurant("MOCK_ID");
    expect(ret).toBeFalsy();
  });

  it("expects to deleteRestaurant if success", async () => {
    jest.spyOn(api, "delete").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await restaurantService.deleteRestaurant("MOCK_ID");
    expect(ret).toBeTruthy();
  });

  it("expects deleteRestaurant to fail in case of error ", async () => {
    jest.spyOn(api, "delete").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    const ret = await restaurantService.deleteRestaurant("MOCK_ID");
    expect(ret).toBeFalsy();
  });

  it("expects to createRestaurant if success", async () => {
    jest.spyOn(api, "post").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await restaurantService.createRestaurant("MOCK_OBJ");
    expect(ret).toBeTruthy();
  });

  it("expects createRestaurant to fail in case of error ", async () => {
    jest.spyOn(api, "post").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    const ret = await restaurantService.createRestaurant("MOCK_OBJ");
    expect(ret).toBeFalsy();
  });

  it("expects to addBlacklist if success", async () => {
    jest.spyOn(api, "post").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await restaurantService.addBlacklist("MOCK_ID");
    expect(ret).toBeTruthy();
  });

  it("expects addBlacklist to fail in case of error ", async () => {
    jest.spyOn(api, "post").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    const ret = await restaurantService.addBlacklist("MOCK_ID");
    expect(ret).toBeFalsy();
  });
});

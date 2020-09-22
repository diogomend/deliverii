import api from "@/plugins/api";
import mealService from "@/service/meal";
jest.mock("@/plugins/api");
describe("Meal Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("expects to fetchMeals if success", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await mealService.fetchMeals("MOCK_RESTAURANT");
    expect(ret).toEqual("MOCK_RESPONSE");
  });

  it("expects to fetchMeals to fail in case of error ", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    const ret = await mealService.fetchMeals("MOCK_RESTAURANT");
    expect(ret).toBeFalsy();
  });

  it("expects to fetchMeal if success", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await mealService.fetchMeal("MOCK_RESTAURANT", "MOCK_MEAL");
    expect(ret).toEqual("MOCK_RESPONSE");
  });

  it("expects to fetchMeal to fail in case of error ", async () => {
    jest.spyOn(api, "get").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    const ret = await mealService.fetchMeal("MOCK_RESTAURANT", "MOCK_MEAL");
    expect(ret).toBeFalsy();
  });

  it("expects to updateMeal if success", async () => {
    jest.spyOn(api, "put").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await mealService.updateMeal(
      "MOCK_RESTAURANT",
      "MOCK_MEAL",
      "MOCK_OBJ"
    );
    expect(ret).toEqual("MOCK_RESPONSE");
  });

  it("expects to updateMeal to fail in case of error ", async () => {
    jest.spyOn(api, "put").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    const ret = await mealService.updateMeal(
      "MOCK_RESTAURANT",
      "MOCK_MEAL",
      "MOCK_OBJ"
    );
    expect(ret).toBeFalsy();
  });

  it("expects to createMeal if success", async () => {
    jest.spyOn(api, "post").mockImplementation(() => {
      return {
        data: "MOCK_RESPONSE"
      };
    });

    const ret = await mealService.createMeal("MOCK_RESTAURANT", "MOCK_OBJ");
    expect(ret).toEqual("MOCK_RESPONSE");
  });

  it("expects to createMeal to fail in case of error ", async () => {
    jest.spyOn(api, "post").mockImplementation(() => {
      throw new Error("MOCK_ERROR");
    });

    const ret = await mealService.createMeal("MOCK_RESTAURANT", "MOCK_OBJ");
    expect(ret).toBeFalsy();
  });
});

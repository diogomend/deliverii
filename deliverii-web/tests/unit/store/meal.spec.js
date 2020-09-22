import mealService from "@/service/meal";
import mealStore from "@/store/meal";
jest.mock("@/service/meal");

describe("Meal Store Actions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

    it("Should call service on fetch meals", async () => {
        mealService.fetchMeals = jest.fn(() => true)
        await mealStore.actions.fetchMeals('MOCK_ID');
        expect(mealService.fetchMeals).toHaveBeenCalled();
    })

    it("Should return first meal if success", async () => {
        mealService.fetchMeal = jest.fn(() => ['MOCK_MEAL'])
        const ret = await mealStore.actions.fetchMeal({}, {restaurant: 'MOCK_ID', meal: 'MEAL_ID'});
        expect(mealService.fetchMeal).toHaveBeenCalled();
        expect(ret).toEqual('MOCK_MEAL');
    });

    it("Should return false if no meal", async () => {
        mealService.fetchMeal = jest.fn(() => false)
        const ret = await mealStore.actions.fetchMeal({}, {restaurant: 'MOCK_ID', meal: 'MEAL_ID'});
        expect(mealService.fetchMeal).toHaveBeenCalled();
        expect(ret).toEqual(false);
    });

    it("Should dispatch if updateMeal with success", async () => {
        mealService.updateMeal = jest.fn(() => true);
        const dispatch = jest.fn();
        const ret = await mealStore.actions.updateMeal({dispatch} , {restaurant: 'MOCK_ID', mealID: 'MEAL_ID', mealObj: 'MEAL_OBJ'});
        expect(mealService.updateMeal).toHaveBeenCalled();
        expect(ret).toEqual(true);
        expect(dispatch).toHaveBeenCalled();
    });

    it("Should not dispatch if updateMeal with error", async () => {
        mealService.updateMeal = jest.fn(() => false);
        const dispatch = jest.fn();
        const ret = await mealStore.actions.updateMeal({dispatch} , {restaurant: 'MOCK_ID', mealID: 'MEAL_ID', mealObj: 'MEAL_OBJ'});
        expect(mealService.updateMeal).toHaveBeenCalled();
        expect(ret).toEqual(false);
        expect(dispatch).not.toHaveBeenCalled();
    });

    it("Should dispatch if createMeal with success", async () => {
        mealService.createMeal = jest.fn(() => true);
        const dispatch = jest.fn();
        const ret = await mealStore.actions.createMeal({dispatch} , {restaurant: 'MOCK_ID', mealObj: 'MEAL_OBJ'});
        expect(mealService.createMeal).toHaveBeenCalled();
        expect(ret).toEqual(true);
        expect(dispatch).toHaveBeenCalled();
    });

    it("Should not dispatch if createMeal with error", async () => {
        mealService.createMeal = jest.fn(() => false);
        const dispatch = jest.fn();
        const ret = await mealStore.actions.createMeal({dispatch} , {restaurant: 'MOCK_ID', mealObj: 'MEAL_OBJ'});
        expect(mealService.createMeal).toHaveBeenCalled();
        expect(ret).toEqual(false);
        expect(dispatch).not.toHaveBeenCalled();
    });
});

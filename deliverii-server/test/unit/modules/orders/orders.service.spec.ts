import { mock } from 'jest-mock-extended';
import { User } from 'src/types/user';
import { OrdersController } from '../../../../src/modules/orders/orders.controller';
import { OrdersService } from '../../../../src/modules/orders/orders.service';
import { CreateOrderDTO, ChangeOrderStatusDTO } from 'src/dtos/order';
import { MealService } from '../../../../src/modules/meals/meals.service';
import { RestaurantsService } from '../../../../src/modules/restaurants/restaurants.service';

const createObj:CreateOrderDTO = {
    address: {addr1: 'MOCK', addr2: 'MOCK', city: 'MOCK', postCode: 'MOCK'},
    meals: [{meal: 'MOCK_MEAL', quantity: 2}],
    restaurantID: 'MOCK_ID'
};

const changeObj:ChangeOrderStatusDTO = {
    status: 'MOCK_STATE'
};


describe('Orders Service', () => {
  let user = mock<User>();
  
  let mealService = mock<MealService>();
  let restaurantService = mock<RestaurantsService>();
  // @ts-ignore
  let mockedModel = mock<Model>();
  it('create should throw error if restaurant invalid', async () => {
    // @ts-ignore
    restaurantService.validateRestaurantAccess = jest.fn(() => {
        return false;
    });
    const service = new OrdersService(mockedModel, mealService, restaurantService);

    expect(service.create(user, createObj)).rejects.toThrowError();
  });

  it('create should throw error if meal invalid', async () => {
    // @ts-ignore
    restaurantService.validateRestaurantAccess = jest.fn(() => {
        return true;
    });

    // @ts-ignore
    mealService.validateMealsForSameRestaurant = jest.fn(() => {
        return false;
    });
    const service = new OrdersService(mockedModel, mealService, restaurantService);

    expect(service.create(user, createObj)).rejects.toThrowError();
  });

  it('should call create if no errors', async () => {
    const create = jest.fn(() => { return { _id: 'MOCK_ID' }});
    const updateOne = jest.fn(() => {});
    const populate = jest.fn(() => { return { updateOne, meals: [{meal: {price: 10, quantity: 3}}]}});
    // @ts-ignore
    restaurantService.validateRestaurantAccess = jest.fn(() => true);
    // @ts-ignore
    mealService.validateMealsForSameRestaurant = jest.fn(() => true);

    mockedModel.create = create;
    mockedModel.findById = jest.fn(() => {return {populate: populate}});
    const service = new OrdersService(mockedModel, mealService, restaurantService);

    await service.create(user, createObj);
    expect(create).toHaveBeenCalled();
    expect(updateOne).toHaveBeenCalled();
    expect(populate).toHaveBeenCalled();
  });
});
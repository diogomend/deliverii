import { mock } from 'jest-mock-extended';
import { User } from 'src/types/user';
import { RestaurantsController } from '../../../../src/modules/restaurants/restaurants.controller';
import { RestaurantsService } from 'src/modules/restaurants/restaurants.service';
import { MealService } from 'src/modules/meals/meals.service';
import { CreateRestaurantDTO, UpdateRestaurantDTO } from 'src/dtos/restaurant';
import { Restaurant } from 'src/types/restaurant';

const createRestaurant:CreateRestaurantDTO = {
    name: "MOCK_NAME",
    description: "MOCK_DESC",
    foodType: "Portuguese",
};

const updateRestaurant:UpdateRestaurantDTO = {
    name: "MOCK_NAME",
    description: "MOCK_DESC",
    foodType: "Portuguese",
};

describe('Restaurants Controller', () => {
  let user = mock<User>();
  let restaurant = mock<Restaurant>();
  
  let mockedService = mock<RestaurantsService>();
  let mockedMeals = mock<MealService>();
  it('should call listRestaurants on get', async () => {
    // @ts-ignore
    mockedService.listRestaurants = jest.fn(() => 'MOCK_RESPONSE');
    const controller = new RestaurantsController(mockedService, mockedMeals);

    expect(await controller.findAll(user)).toEqual('MOCK_RESPONSE');
  });

  it('should call createRestaurant on createRestaurant', async () => {
    // @ts-ignore
    mockedService.createRestaurant = jest.fn(() => 'MOCK_RESPONSE');
    const controller = new RestaurantsController(mockedService, mockedMeals);

    expect(await controller.createRestaurant(createRestaurant, user)).toEqual('MOCK_RESPONSE');
  });

  it('should throw exception if no access to restaurant', async () => {
    // @ts-ignore
    mockedService.validateRestaurantAccess.mockImplementation(
        (): Promise<any> => Promise.resolve(false)
      );
    
    const controller = new RestaurantsController(mockedService, mockedMeals);

    expect(controller.editRestaurant(user, 'MOCK_ID', updateRestaurant)).rejects.toThrowError();
  });

  it('should call update if has access to restaurant', async () => {
    // @ts-ignore
    mockedService.validateRestaurantAccess.mockImplementation(
        (): Promise<any> => Promise.resolve(true)
    );

    mockedService.update.mockImplementation(() => {
        return Promise.resolve(restaurant);
    });

    const controller = new RestaurantsController(mockedService, mockedMeals);

    expect(await controller.editRestaurant(user, 'MOCK_ID', updateRestaurant)).toEqual(restaurant);
  });

  it('should throw exception if no access to restaurant', async () => {
    // @ts-ignore
    mockedService.validateRestaurantAccess.mockImplementation(
        (): Promise<any> => Promise.resolve(false)
      );
    
    const controller = new RestaurantsController(mockedService, mockedMeals);

    expect(controller.deleteRestaurant(user, 'MOCK_ID')).rejects.toThrowError();
  });

  it('should call delete if has access to restaurant', async () => {
    // @ts-ignore
    mockedService.validateRestaurantAccess.mockImplementation(
        (): Promise<any> => Promise.resolve(true)
      );

    mockedService.delete.mockImplementation(() => {
        return Promise.resolve(restaurant);
    });

    const controller = new RestaurantsController(mockedService, mockedMeals);

    expect(await controller.deleteRestaurant(user, 'MOCK_ID')).toEqual(restaurant);
  });
});
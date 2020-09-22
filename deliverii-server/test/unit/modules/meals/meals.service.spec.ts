import { TestingModule } from '@nestjs/testing';
import { MealService } from '../../../../src/modules/meals/meals.service';

import { mock } from 'jest-mock-extended';
import { Model } from 'mongoose';

const updateObj = {name: 'MOCK_NAME', description: 'MOCK_DESCRIPTION', image: 'MOCK_IMAGE', price: 12.30};
describe('MealService', () => {
  let app: TestingModule;
  // @ts-ignore
  let mocked = mock<Model>();
  mocked.update = jest.fn(() => true);
  it('should throw error if not id not found', async () => {
    mocked.findById = jest.fn(() => false);
        
    const mealService = new MealService(mocked);
    expect(mealService.update('5f5c94097be4f30b84f1a41b', updateObj)).rejects.toThrowError();
  });

  it('update should not throw error if not id was found', async () => {
    const populate = jest.fn();
    mocked.findById = jest.fn(() => {
        return {
            updateOne: jest.fn(),
            populate: populate
        }
    });
        
    const mealService = new MealService(mocked);
    await mealService.update('5f5c94097be4f30b84f1a41b', updateObj);
    expect(populate).toHaveBeenCalled();
  });


  it('should call create model', async () => {
    const create = jest.spyOn(mocked, 'create');
        
    const mealService = new MealService(mocked);
    await mealService.createMeal('5f5c94097be4f30b84f1a41b', updateObj);

    expect(create).toHaveBeenCalled();
  });

    it('should find restaurants from model', async () => {
    const find = jest.spyOn(mocked, 'find');
        
    const mealService = new MealService(mocked);
    await mealService.getMealsFromRestaurant('5f5c94097be4f30b84f1a41b');

    expect(find).toHaveBeenCalled();
  });

  it('should validate meals from same restaurant', async () => {
    mocked.findById = jest.fn(() => {
        return {
            restaurant: '5f5c94097be4f30b84f1a41b'
        }
    });
        
    const mealService = new MealService(mocked);
    const ret = await mealService.validateMealsForSameRestaurant([{meal: '5f5c94097be4f30b84f1a41b'}], '5f5c94097be4f30b84f1a41b');
    expect(ret).toBeTruthy();
  });

  it('should not validate meals from different restaurant', async () => {
    mocked.findById = jest.fn(() => {
        return {
            restaurant: '5f5de013a81bfeb7dafd4ef7'
        }
    });
        
    const mealService = new MealService(mocked);
    const ret = await mealService.validateMealsForSameRestaurant([{meal: '5f5c94097be4f30b84f1a41b'}], '5f5c94097be4f30b84f1a41b');
    expect(ret).toBeFalsy();
  });

});
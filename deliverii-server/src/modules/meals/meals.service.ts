import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRestaurantMealDTO } from '../../dtos/restaurant';
import { validateID } from '../../helpers/validators';
import { Meal } from '../../types/meal';

@Injectable()
export class MealService {
  constructor(@InjectModel('Meal') private mealModel: Model<Meal>) {}

  async createMeal(restaurantID: string, mealDTO: CreateRestaurantMealDTO) {
    const createMealRequest = {
      ...mealDTO,
      restaurant: restaurantID
    };
    return await this.mealModel.create(createMealRequest);
  }

  async getMealsFromRestaurant(restaurantID): Promise<Meal[]> {
    return await this.mealModel.find({"restaurant" : restaurantID});
  }

  async update(mealID: string, mealDTO: CreateRestaurantMealDTO) {
    validateID(mealID);
    const meal = await this.mealModel.findById(mealID);
    if (!meal) {
      throw new HttpException('Meal not found', HttpStatus.NOT_FOUND);
    }

    await meal.updateOne(mealDTO);
    return await this.mealModel.findById(mealID).populate('restaurant');
  }

  async validateMealsForSameRestaurant(meals, restaurantID: String) {
    for (const [idx, mealObject] of meals.entries()) {
      await validateID(mealObject.meal);
      const meal = await this.mealModel.findById(mealObject.meal);

      if (!meal || meal.restaurant != restaurantID) {
        return false;
      }
    }

    return true;
  }
}
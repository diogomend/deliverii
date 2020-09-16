import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Restaurant } from '../../types/restaurant';
import { CreateRestaurantDTO, UpdateRestaurantDTO, BlacklistUserDTO, CreateRestaurantMealDTO } from '../../dtos/restaurant';
import { MealService } from '../meals/meals.service';
import { User } from '../../types/user';
import { validateID } from '../../helpers/validators';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel('Restaurant') private restaurantModel: Model<Restaurant>,
    @Inject('MealService') private mealService: MealService
  ) {}

  async listRestaurants(user: User): Promise<Restaurant[]> {
    if (user.isManager) {
      // get restaurants that user manages
      return await this.restaurantModel.find({ manager: user.id });
    }
    
    // get restaurants that don't blacklist the user
    const restaurants = await this.restaurantModel.find();
    return restaurants.filter((elem) => {
      return !elem.blacklists.some((blacklist) => {
        return blacklist['_id'] == user.id
      });
    })
  }

  async validateRestaurantAccess(restaurantID: String, user: User) {
    let restaurantList = await this.listRestaurants(user);
    
    return restaurantList.some((elem) => elem._id == restaurantID);
  }

  async get(restaurantID: String): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findById(restaurantID).populate('meals');
    restaurant.blacklists = undefined;

    return restaurant;
  }

  async createRestaurant(restaurantDTO: CreateRestaurantDTO, userId: string): Promise<Restaurant> {
    const createRestaurant = {
      manager: userId,
      meals: [],
      blacklists: [],
      ...restaurantDTO
    };
    return await this.restaurantModel.create(createRestaurant);
  }

  async update(
    restaurantID: String,
    restaurantDTO: UpdateRestaurantDTO
  ) : Promise<Restaurant> {
      validateID(restaurantID);
      const restaurant = await this.restaurantModel.findById(restaurantID);
      await restaurant.updateOne(restaurantDTO);
      
      return await this.restaurantModel.findById(restaurantID).populate('manager');
  }

  async delete(restaurantID: String) {
    const restaurant = await this.restaurantModel.findById(restaurantID);

    return await restaurant.deleteOne();
  }

  async blacklist(restaurantID: String, blacklistDTO: BlacklistUserDTO) {
      const { id } = blacklistDTO;
      const restaurant = await this.restaurantModel.findById(restaurantID);

      const blacklisted = restaurant.blacklists.some(elem => elem['_id'] == id)
      
      if (!blacklisted) {
        restaurant.blacklists.push(id);
        restaurant.save();
      }

      return true;
  }
}
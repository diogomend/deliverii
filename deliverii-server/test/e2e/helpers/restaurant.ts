import * as request from 'supertest';
import { CreateRestaurantDTO, CreateRestaurantMealDTO } from '../../../src/dtos/restaurant'
import { INestApplication } from '@nestjs/common';
import { Restaurant } from 'src/types/restaurant';

export const MockRestaurant: CreateRestaurantDTO= {
    name: 'Eataly',
    description: 'This is my description',
    foodType: 'Italian'
  };

export const MockMeal: CreateRestaurantMealDTO = {
    name: 'Menu Big-Mac',
    description: 'Best menu ever',
    image: 'MOCK_IMAGE',
    price: 12.31
}

export const CreateRestaurant = async (app, restaurantDTO: CreateRestaurantDTO, managerToken): Promise<Restaurant> => {
    let restaurant;
    await request(app.getHttpServer())
    .post('/restaurants')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${managerToken}`)
    .send(restaurantDTO)
    .expect(({ body }) => {
        restaurant = body;
    });

    return restaurant;
}

export const CreateMeal = async (app, restaurantID: string, mealDTO: CreateRestaurantMealDTO, managerToken) => {
    let meal;
    await request(app.getHttpServer())
    .post(`/restaurants/${restaurantID}/meals`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${managerToken}`)
    .send(mealDTO)
    .expect(({ body }) => {
        meal = body;
    });

    return meal;
}

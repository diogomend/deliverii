import 'dotenv/config';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { INestApplication } from '@nestjs/common';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';
import { RestaurantsModule } from '../../src/modules/restaurants/restaurants.module';
import { MongooseModule } from '@nestjs/mongoose';
import { registerUser, loginUser, MockManager, MockUser } from './helpers/auth';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { CreateRestaurantDTO } from '../../src/dtos/restaurant';
import { CreateRestaurant, MockRestaurant } from './helpers/restaurant';

describe('Restaurant', () => {
    let app: INestApplication;
    let userToken;
    let userID;
    let managerToken;
    let secondManagerToken;
    let restaurantID;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_AUTOMATION);
        await mongoose.connection.db.dropDatabase();
        
          const moduleFixture = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
            imports: [
                RestaurantsModule,
                AuthModule,
                MongooseModule.forRoot(process.env.MONGO_AUTOMATION),
              ],
           }).compile();

          app = moduleFixture.createNestApplication();
          await app.init();
          await registerUser(app, MockManager);
          await registerUser(app, {...MockManager, email: `pre-${MockManager.email}`});
          await registerUser(app, MockUser);
          
          const managerInfo = await loginUser(app, {email: MockManager.email, password: MockManager.password});
          managerToken = managerInfo.token;
          console.log("MANAGER TOKEN " + managerToken);

          const secondManagerInfo = await loginUser(app, {email: `pre-${MockManager.email}`, password: MockManager.password});
          secondManagerToken = secondManagerInfo.token;

          const userInfo = await loginUser(app, {email: MockUser.email, password: MockUser.password});
          userID = userInfo.userID;
          userToken = userInfo.token;
    });
    
    afterAll(async done => {
        await mongoose.disconnect(done);
    });

    it('should create restaurant from manager', () => {
      const rest: CreateRestaurantDTO = {
        name: 'NAME',
        description: 'DESC',
        foodType: 'Japanese'
      };

      return request(app.getHttpServer())
        .post('/restaurants')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${managerToken}`)
        .send(rest)
        .expect(HttpStatus.CREATED);
    });

    it('should create restaurant from other manager', () => {
      const rest: CreateRestaurantDTO = {
        name: 'SECOND NAME',
        description: 'SECOND DESC',
        foodType: 'Japanese'
      };

      return request(app.getHttpServer())
        .post('/restaurants')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${secondManagerToken}`)
        .send(rest)
        .expect(HttpStatus.CREATED);
    });

    it('should have one restaurant for manager', () => {
      return request(app.getHttpServer())
        .get('/restaurants')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(({ body }) => {
          expect(body.length).toBe(1)
          expect(body[0]['name']).toBe('NAME')

          restaurantID = body[0]['_id'];
        })
        .expect(HttpStatus.OK);
    });

    it('should be able to edit one restaurant', () => {
      return request(app.getHttpServer())
        .put(`/restaurants/${restaurantID}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${managerToken}`)
        .send({name: "NEW NAME", description: "NEW DESCRIPTION"})
        .expect(({ body }) => {
          expect(body['name']).toBe('NEW NAME')
        })
        .expect(HttpStatus.OK);
    });

    it('should be able to delete one restaurant', () => {
      return request(app.getHttpServer())
        .delete(`/restaurants/${restaurantID}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(HttpStatus.NO_CONTENT);
    });

    it('should list all restaurants for user', () => {
      return request(app.getHttpServer())
        .get('/restaurants')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(({ body }) => {
          expect(body.length).toBe(1)
        })
        .expect(HttpStatus.OK);
    });

    it('should blacklist restaurant for user', async () => {
      const restaurant = await CreateRestaurant(app, MockRestaurant, managerToken);
      
      restaurantID = restaurant._id;
      await request(app.getHttpServer())
        .post(`/restaurants/${restaurant._id}/blacklist`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${managerToken}`)
        .send({id: userID})
        .expect(HttpStatus.NO_CONTENT);

      return request(app.getHttpServer())
        .get('/restaurants')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(({ body }) => {
          expect(body.length).toBe(1)
        })
        .expect(HttpStatus.OK);
    });
    it('should create meal for restaurant and be able to edit', async () => {
      let mealID;
      await request(app.getHttpServer())
        .post(`/restaurants/${restaurantID}/meals`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${managerToken}`)
        .send({
          "name": "Big King",
          "description": "menu big king com batata",
          "image": "string",
          "price": 5.45
        })
        .expect(HttpStatus.CREATED);

      await request(app.getHttpServer())
        .get(`/restaurants/${restaurantID}/meals`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(({ body }) => {
          expect(body.length).toBe(1)
          mealID = body[0]._id;
        })
        .expect(HttpStatus.OK);

        return request(app.getHttpServer())
        .put(`/restaurants/${restaurantID}/meals/${mealID}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${managerToken}`)
        .send({name: "NEW NAME", description: "NEW DESCRIPTION", price: 10.20, image: ""})
        .expect(({ body }) => {
          expect(body['name']).toBe('NEW NAME')
        })
        .expect(HttpStatus.OK);
    });

    it('blacklist user should not access meals', async () => {
      return request(app.getHttpServer())
      .get(`/restaurants/${restaurantID}/meals`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(HttpStatus.NOT_FOUND);
    });
  });
import 'dotenv/config';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { INestApplication } from '@nestjs/common';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';
import { OrdersModule } from '../../src/modules/orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { registerUser, loginUser, MockManager, MockUser } from './helpers/auth';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { CreateRestaurantDTO } from '../../src/dtos/restaurant';
import { CreateRestaurant, MockRestaurant, CreateMeal, MockMeal } from './helpers/restaurant';
import { MockOrder } from './helpers/order';

describe('Order', () => {
    let app: INestApplication;
    let userToken;
    let managerToken;
    let secondManagerToken;
    let restaurantID;
    let mealID;
    let order;
    let userID;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_AUTOMATION);
        await mongoose.connection.db.dropDatabase();
        
          const moduleFixture = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
            imports: [
                OrdersModule,
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
          const restaurantInfo = await CreateRestaurant(app, MockRestaurant, managerToken);
          restaurantID = restaurantInfo['_id'];
          const mealInfo = await CreateMeal(app, restaurantID, MockMeal, managerToken);
          mealID = mealInfo['_id'];
          
          const secondManagerInfo = await loginUser(app, {email: `pre-${MockManager.email}`, password: MockManager.password});
          secondManagerToken = secondManagerInfo.token;

          const userInfo = await loginUser(app, {email: MockUser.email, password: MockUser.password});
          userID = userInfo.userID;
          userToken = userInfo.token;
        });

        afterAll(async done => {
          await mongoose.disconnect(done);
      });

      it('should create order for user', () => {  
        return request(app.getHttpServer())
          .post('/orders')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${userToken}`)
          .send(MockOrder(mealID, restaurantID))
          .expect(({ body }) => {
            order = body;
          })
          .expect(HttpStatus.CREATED);
      });

      it('should not create order for manager', () => {
        return request(app.getHttpServer())
          .post('/orders')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${managerToken}`)
          .send(MockOrder(mealID, restaurantID))
          .expect(HttpStatus.UNAUTHORIZED);
        });

        it('should get order for manager and user', async () => {
          await request(app.getHttpServer())
            .get(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
            .expect(({ body }) => {
              expect(body['_id']).toEqual(order['_id']);
            })
            .expect(HttpStatus.OK);

          return request(app.getHttpServer())
            .get(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${managerToken}`)
            .expect(({ body }) => {
              expect(body['_id']).toEqual(order['_id']);
            })
            .expect(HttpStatus.OK);
        })

        it('should not get order for other manager and other user', async () => {
          await registerUser(app, {...MockUser, email: `pre-${MockUser.email}`});
          const otherUserInfo = await loginUser(app, {email: `pre-${MockUser.email}`, password: MockUser.password});
          const otherUserToken = otherUserInfo.token;

          await request(app.getHttpServer())
            .get(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${otherUserToken}`)
            .expect(HttpStatus.FORBIDDEN);

          return request(app.getHttpServer())
            .get(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${secondManagerToken}`)
            .expect(HttpStatus.FORBIDDEN);
        })

        it('canceled state', async () => {
          await request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${managerToken}`)
            .send({"status": "Canceled"})
            .expect(HttpStatus.FORBIDDEN);

          return request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
            .send({"status": "Canceled"})
            .expect(HttpStatus.OK);
        });

        it('processing state', async () => {
          await request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
            .send({"status": "Processing"})
            .expect(HttpStatus.FORBIDDEN);

          await request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
            .send({"status": "Canceled"})
            .expect(HttpStatus.FORBIDDEN);

          return request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${managerToken}`)
            .send({"status": "Processing"})
            .expect(HttpStatus.OK);
        });

        it('in route state', async () => {
          await request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
            .send({"status": "In Route"})
            .expect(HttpStatus.FORBIDDEN);

          await request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${managerToken}`)
            .send({"status": "Delivered"})
            .expect(HttpStatus.FORBIDDEN);

          return request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${managerToken}`)
            .send({"status": "In Route"})
            .expect(HttpStatus.OK);
        });

        it('delivered state', async () => {
          await request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
            .send({"status": "Delivered"})
            .expect(HttpStatus.FORBIDDEN);

          return request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${managerToken}`)
            .send({"status": "Delivered"})
            .expect(HttpStatus.OK);
        });

        it('received state', async () => {
          await request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${managerToken}`)
            .send({"status": "Received"})
            .expect(HttpStatus.FORBIDDEN);

          return request(app.getHttpServer())
            .patch(`/orders/${order['_id']}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userToken}`)
            .send({"status": "Received"})
            .expect(({ body }) => {
              expect(body.historyStatus.length).toBe(6)
            })
            .expect(HttpStatus.OK);
        });
    });
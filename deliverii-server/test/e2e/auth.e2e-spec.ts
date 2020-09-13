import { AuthRegisterDTO, AuthLoginDTO } from '../../src/dtos/auth';
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { INestApplication } from '@nestjs/common';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../../src/modules/auth/auth.service';

describe('Auth', () => {
    let app: INestApplication;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_AUTOMATION);
        await mongoose.connection.db.dropDatabase();
        
          const moduleFixture = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
            imports: [
                AuthModule,
                MongooseModule.forRoot(process.env.MONGO_AUTOMATION),
              ],
           }).compile();

          app = moduleFixture.createNestApplication();
          await app.init();
    });
    
    afterAll(async done => {
        await mongoose.disconnect(done);
    });
    
    const user: AuthRegisterDTO | AuthLoginDTO = {
      name: 'Client',
      email: 'client@deliverii.com',
      password: 'password',
    };
    const manager: AuthRegisterDTO | AuthLoginDTO = {
      name: 'Manager',
      email: 'manager@deliverii.com',
      password: 'password',
      isManager: true
    };
    let userToken: string;
    let managerToken: string;
    it('should register user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .set('Accept', 'application/json')
        .set('User-Agent', "Automation")
        .send(user)
        .expect(HttpStatus.CREATED);
    });
  
    it('should register manager', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .set('Accept', 'application/json')
          .send(manager)
          .expect(HttpStatus.CREATED);
      });

      it('should not allow duplicate registration', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .set('Accept', 'application/json')
          .send(user)
          .expect(({ body }) => {
            expect(body.statusCode).toEqual(422);
            expect(body.message).toEqual('Email already exists');
          })
          .expect(HttpStatus.UNPROCESSABLE_ENTITY);
      });

      it('should login user with valid credentials', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send(user)
          .expect(({ body }) => {
            userToken = body.token;
            expect(body.token).toBeDefined();
            expect(body.user.email).toEqual(user.email);
            expect(body.user.password).toBeUndefined();
            expect(body.user.isManager).toBeFalsy();
          })
          .expect(HttpStatus.OK);
      });

      it('should not login with invalid credentials', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send({ ...user, password: 'wrongPassword' })
          .expect(({ body }) => {
            expect(body.statusCode).toEqual(422);
            expect(body.message).toEqual('Invalid credentials');
          })
          .expect(HttpStatus.UNPROCESSABLE_ENTITY);
      });

      it('should login manager with valid credentials', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send(manager)
          .expect(({ body }) => {
            managerToken = body.token;
            expect(body.token).toBeDefined();
            expect(body.user.email).toEqual(manager.email);
            expect(body.user.password).toBeUndefined();
            expect(body.user.isManager).toBeTruthy();
          })
          .expect(HttpStatus.OK);
      });

      it('should ping with valid token', () => {
        return request(app.getHttpServer())
          .get('/auth/ping')
          .set('Authorization', `Bearer ${managerToken}`)
          .expect(({ body }) => {
            expect(body.email).toEqual(manager.email);
          })
          .expect(200);
      })
  });
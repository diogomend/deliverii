import * as request from 'supertest';
import { AuthRegisterDTO, AuthLoginDTO } from '../../../src/dtos/auth'
import { INestApplication } from '@nestjs/common';

export const MockUser = {
    name: 'Client',
    email: 'client@deliverii.com',
    password: 'password',
    isManager: false
  };
export const MockManager = {
    name: 'Manager',
    email: 'manager@deliverii.com',
    password: 'password',
    isManager: true
  };

export const registerUser = (app, registerDTO: AuthRegisterDTO) => {
    return request(app.getHttpServer())
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(registerDTO);
}

export const loginUser = async (app: INestApplication, loginDTO: AuthLoginDTO) => {
    let token = "";
    let userID = "";
    await request(app.getHttpServer())
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send(loginDTO)
          .expect(({ body }) => {
              token = body.token;
              userID = body.user._id;
          });
    return { token: token, userID: userID };
}
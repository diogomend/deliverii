import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { AuthLoginDTO, AuthRegisterDTO } from '../../../src/dtos/auth';
import { UserService } from '../../../src/shared/user/user.service';
import { mock } from 'jest-mock-extended';
import { User } from '../../../src/types/user';

jest.mock('../../../src/auth/auth.service');
jest.mock('../../../src/shared/user/user.service');
jest.mock('../../../src/types/user');
const login: AuthLoginDTO = {
    email: 'teste',
    password: '123123'
}

const register: AuthRegisterDTO = {
  name: 'diogo',
  email: 'diogomend@teste.com',
  password: '123123',
  isManager: false
}
describe('AuthController', () => {
  let app: TestingModule;
  let authService;
  let userService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    userService = app.get<UserService>(UserService);


  });

  describe('Auth Controller', () => {
    it('should user and token after login', async () => {
      jest.spyOn(userService, 'findByLogin').mockImplementation(() => {
          return {
              "_id": "123123",
              "email": "diogo",
              "isManager": true
          }   
      });

      jest.spyOn(authService, 'signPayload').mockImplementation(() => {
          return 123123
      });
      
      const authController = app.get<AuthController>(AuthController);
      const loginResult = await authController.login(login);
      expect(loginResult).toEqual({
        token: 123123,
        user: {
            "_id": "123123",
            "email": "diogo",
            "isManager": true,
        },
      });
    });


    it('should call register', async () => {
      const mockCreate = jest.spyOn(userService, 'create').mockImplementation(() => {});
        
      const authController = app.get<AuthController>(AuthController);
      await authController.register(register);
      expect(mockCreate).toHaveBeenCalled();
    });


    it('ping should return user', async () => {
      const mockCreate = jest.spyOn(userService, 'create').mockImplementation(() => {});
      const mocked = mock<User>();
      const authController = app.get<AuthController>(AuthController);
      await authController.ping(mocked);
      expect(mockCreate).toHaveBeenCalled();
    });

  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { AuthLoginDTO } from '../../../src/dtos/auth';
import { UserService } from '../../../src/shared/user/user.service';

jest.mock('../../../src/auth/auth.service');
jest.mock('../../../src/shared/user/user.service');
const login: AuthLoginDTO = {
    email: 'teste',
    password: '123123'
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
  });
});

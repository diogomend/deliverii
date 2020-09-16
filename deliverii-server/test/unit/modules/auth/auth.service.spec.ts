import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../../src/modules/auth/auth.controller';
import { AuthService } from '../../../../src/modules/auth/auth.service';
import { AuthLoginDTO, AuthRegisterDTO } from '../../../../src/dtos/auth';
import { UserService } from '../../../../src/modules/shared/user/user.service';
import { mock } from 'jest-mock-extended';
import { User } from '../../../../src/types/user';
import { sign } from 'jsonwebtoken';

jest.mock('jsonwebtoken');
jest.mock('../../../../src/modules/shared/user/user.service');
jest.mock('../../../../src/types/user');

describe('AuthService', () => {
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

  it('should call sign', async () => {
      await authService.signPayload({});
      expect(sign).toBeCalled();
  });

    it('should find user by payload', async () => {
        const mockCreate = jest.spyOn(userService, 'findByPayload').mockImplementation(() => {});
        await authService.validateUser({});
        expect(mockCreate).toBeCalled();
  });
});
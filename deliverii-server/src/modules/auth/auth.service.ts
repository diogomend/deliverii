import { Payload } from '../../types/payload';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../modules/shared/user/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signPayload(payload: Payload) {
    return sign(payload, process.env.JWT_KEY, { expiresIn: '12h' });
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
import { Payload } from '../../../types/payload';
import { AuthLoginDTO, AuthRegisterDTO } from '../../../dtos/auth';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validatePassword, sanitizeUser } from '../../../helpers/auth';
import { Model } from 'mongoose';
import { User } from '../../../types/user';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(registerDTO: AuthRegisterDTO) {
    const { email } = registerDTO;
    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const createdUser = new this.userModel(registerDTO);
    await createdUser.save();
    return sanitizeUser(createdUser);
  }


  async findByLogin(userDTO: AuthLoginDTO) {
    const { email, password } = userDTO;
    const user = await this.userModel.findOne({ email });

    if (!user || await validatePassword(password, user.password) === false) {
      throw new HttpException('Invalid credentials', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return sanitizeUser(user);
  }


  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }
}
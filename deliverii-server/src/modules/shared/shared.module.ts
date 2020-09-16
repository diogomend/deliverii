import { UserSchema } from '../../models/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';

/* istanbul ignore file */
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    UserService
  ],
  exports: [UserService]
})
export class SharedModule {}
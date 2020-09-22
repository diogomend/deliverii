import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { MealsModule } from './modules/meals/meals.module';
import { OrdersModule } from './modules/orders/orders.module';

/* istanbul ignore file */
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    SharedModule,
    AuthModule,
    RestaurantsModule,
    MealsModule,
    OrdersModule
  ],
})
export class AppModule {}
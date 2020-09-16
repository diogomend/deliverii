import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { Module } from '@nestjs/common';
import { OrderSchema } from '../../models/order.schema';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MealsModule } from '../meals/meals.module';
import { RestaurantsModule } from '../restaurants/restaurants.module';

/* istanbul ignore file */
@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
      SharedModule,
      MealsModule,
      RestaurantsModule
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
  })
  export class OrdersModule {}
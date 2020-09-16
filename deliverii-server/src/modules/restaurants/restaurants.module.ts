import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { Module } from '@nestjs/common';
import { RestaurantSchema } from '../../models/restaurant.schema';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { MealsModule } from '../meals/meals.module';

/* istanbul ignore file */
@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Restaurant', schema: RestaurantSchema }]),
      SharedModule,
      MealsModule
    ],
    controllers: [RestaurantsController],
    providers: [RestaurantsService],
    exports: [RestaurantsService]
  })
  export class RestaurantsModule {}
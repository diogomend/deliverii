import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { Module } from '@nestjs/common';
import { MealSchema } from '../../models/meal.schema';
import { MealService } from './meals.service';

/* istanbul ignore file */
@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
      SharedModule
    ],
    providers: [MealService],
    exports: [MealService]
  })
  export class MealsModule {}
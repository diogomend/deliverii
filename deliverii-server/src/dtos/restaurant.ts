import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum FoodType {
    Portuguese = "Portuguese"
  };

export class CreateRestaurantDTO {
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({type: String, format: 'form'})
    name: string;

    @MaxLength(100)
    @ApiProperty({type: String})
    description: string;

    @ApiProperty({type: String, default: "Portuguese"})
    foodType: string;
}

export class UpdateRestaurantDTO {
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({type: String})
    name: string;

    @MaxLength(100)
    @ApiProperty({type: String})
    description: string;

    @MaxLength(20)
    @ApiProperty({type: String})
    foodType: string;
}

export class BlacklistUserDTO {
    @IsNotEmpty()
    @ApiProperty({type: String})
    id: string;
}

export class CreateRestaurantMealDTO {
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({type: String})
    name: string;

    @ApiProperty({type: String})
    @MaxLength(100)
    description: string;

    @ApiProperty({type: String})
    image: string;

    @IsNotEmpty()
    @ApiProperty({type: Number})
    price: Number;
}
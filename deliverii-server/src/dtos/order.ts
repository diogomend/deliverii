import { IsNotEmpty, Min, Max, IsInt, ValidateNested, NotEquals, IsEnum, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { orderStatus } from '../helpers/orders';

/* istanbul ignore file */
const status = orderStatus.map(item => item.status);

class Meal {
    @ApiProperty()
    @IsNotEmpty()
    meal: string;

    @ApiProperty({type: Number, minimum: 0, maximum: 1000})
    @IsInt()
    @Min(1)
    @Max(10)
    quantity: number
}

class Address {
    @ApiProperty()
    @IsNotEmpty()
    addr1: string;

    @ApiProperty()
    addr2: string

    @IsNotEmpty()
    @ApiProperty()
    city: string

    @IsNotEmpty()
    @ApiProperty()
    postCode: string
}

export class CreateOrderDTO {
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @ApiProperty({type: [Meal]})
    @Type(() => Meal)
    meals: Meal[]

    @IsNotEmpty()
    @ApiProperty({type: String})
    restaurantID: String

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @ApiProperty({type: Address})
    @Type(() => Address)
    address: Address
}

export class ChangeOrderStatusDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsIn(status)
    @NotEquals('Placed')
    status: string;
}
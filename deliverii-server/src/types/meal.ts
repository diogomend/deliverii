import { Document } from 'mongoose';
import { Decimal128 } from 'bson';

export interface Meal extends Document {
    name: string;
    description: string,
    image: string,
    price: Decimal128,
    created?: Date,
    restaurant: string
}
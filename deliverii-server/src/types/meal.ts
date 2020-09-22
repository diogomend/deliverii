import { Document } from 'mongoose';

export interface Meal extends Document {
    name: string;
    description: string,
    image: string,
    price: Number,
    created?: Date,
    restaurant: string
}
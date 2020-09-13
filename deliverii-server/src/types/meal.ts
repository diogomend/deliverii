import { Document } from 'mongoose';

export interface Meal extends Document {
    name: string;
    description: string,
    image: string,
    price: number,
    created: Date
}
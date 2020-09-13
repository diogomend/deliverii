import { Document } from 'mongoose';
import { User } from './user';
import { Meal } from './meal'

interface MealOrder {
    meal:  Meal;
    quantity: number;
}

interface Address {
    addr1: string;
    addr2: string;
    city: string;
    postCode: string

}

export interface Order extends Document {
    customer: User;
    totalPrice: number;
    meals: MealOrder[];
    address: Address
}
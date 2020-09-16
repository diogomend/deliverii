import { Document } from 'mongoose';
import { User } from './user';
import { Meal } from './meal';
import { Restaurant } from './restaurant';

interface MealOrder {
    meal:  any;
    quantity: number;
}

interface HistoryStatus {
    status:  String;
    date?: Date;
}

interface Address {
    addr1: string;
    addr2: string;
    city: string;
    postCode: string;

}

export interface Order extends Document {
    customer: User;
    totalPrice: number;
    meals: MealOrder[];
    address: Address;
    status: string;
    historyStatus: HistoryStatus[];
    restaurant: String;
}
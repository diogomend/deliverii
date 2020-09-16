import * as mongoose from 'mongoose';
import { orderStatus } from '../helpers/orders';

const mealSchema = new mongoose.Schema({
    meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal'
    },
    quantity: {
        type: Number,
        default: 0
    }
},{ _id : false });

const historySchema = new mongoose.Schema({
    status: {
        type: String,
        enum: orderStatus.map(item => item.status),
        default: 'Placed'
    },
    date: {
        type: Date,
        default: Date.now()
    }
},{ _id : false });

export const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    meals: [mealSchema],
    totalPrice: {
        type: Number,
        default: 0
    },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        postCode: String
    },
    status: String,
    historyStatus: [historySchema],
    created: {
        type: Date,
        default: Date.now()
    }
})
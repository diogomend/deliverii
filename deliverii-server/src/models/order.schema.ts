import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    meals: [{
        meal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal'
        },
        quantity: {
             
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        postCode: String
    }
})
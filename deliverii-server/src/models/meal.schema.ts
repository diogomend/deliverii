import * as mongoose from 'mongoose';
import { Decimal128 } from 'bson';

/* istanbul ignore file */
export const MealSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: {
        type: Decimal128,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now()
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})
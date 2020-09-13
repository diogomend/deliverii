import * as mongoose from 'mongoose';

export const MealSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now()
    }
})
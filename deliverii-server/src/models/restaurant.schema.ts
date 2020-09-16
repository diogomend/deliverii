import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema({
    name: String,
    description: String,
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    foodType: { 
        type: String,
        enum: ['Burgers', 'Italian', 'Street Food', 'Japanese', 'American', 'Portuguese', 'Indian'],
        default: 'Portuguese'
    },
    blacklists: [{
        blacklist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    }]
})
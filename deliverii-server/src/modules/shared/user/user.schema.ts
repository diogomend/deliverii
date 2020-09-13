import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    isManager: {
        type: Boolean,
        default: false
    }
})

// hash password before saving to database
UserSchema.pre('save', async function(next)  {
    if (!this.isModified('password')) {
        return next();
    }

    this['password'] = await bcrypt.hash(this['password'], 10);
    return next();
  });
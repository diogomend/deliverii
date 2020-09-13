import { sign } from 'jsonwebtoken';
import { User } from 'src/types/user';
import { Payload } from '../types/payload';
import * as bcrypt from 'bcrypt';

export const sanitizeUser = (user) => {
    user.password = undefined;
    return user;
}

export const getPayloadFromUser = (user): Payload => {
    return {
        id: user._id,
        email: user.email,
        isManager: user.isManager
    };
}
export const signJWT = async(user: User) => {
    const payload = {
        email: user.email,
        isManager: user.isManager
    }
    return sign(payload, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRES});
}

export const validatePassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
}
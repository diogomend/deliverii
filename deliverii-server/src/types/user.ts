import { Document } from 'mongoose';

export interface User extends Document {
    name: string;
    readonly password: string,
    email: string,
    isManager: boolean
}
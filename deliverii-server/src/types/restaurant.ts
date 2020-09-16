import { Document } from 'mongoose';

export interface Restaurant extends Document {
  manager: String;
  name: String;
  description: String;
  foodType: String,
  blacklists: [String]
}
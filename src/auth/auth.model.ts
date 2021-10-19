import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

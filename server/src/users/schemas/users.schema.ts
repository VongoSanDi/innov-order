import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  login: String,
  password: String,
});

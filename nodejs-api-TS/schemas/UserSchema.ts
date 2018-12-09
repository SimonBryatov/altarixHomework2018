import {Schema} from 'mongoose'

//в идеале, можно cделать отдельный стор для сессий, но я добавил простую деактивацию токенов

const UserSchema = new Schema({
  login:  String,
  password: String,
  email: String,
  jwtActiveUUID: String, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = UserSchema;
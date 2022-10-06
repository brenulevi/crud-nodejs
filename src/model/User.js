const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  createdAt: Date,
  likes: Number,
  p_language: String,
  age: Number
});

const User = model('User', userSchema, 'user');

module.exports = User;
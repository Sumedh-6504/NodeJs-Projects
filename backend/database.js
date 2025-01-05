import { Schema, Model } from "mongoose";
import { hash } from "bcrypt";
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },

  secondName: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },

  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minLength: 3,
    maxLength: 10,
  },
  password_hash: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
    minLength: 6,
  },
});

UserSchema.methods.createHash = async (plainTextPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainTextPassword, saltRounds);
};
const User = Model("User", UserSchema);

module.exports = {
  User,
};

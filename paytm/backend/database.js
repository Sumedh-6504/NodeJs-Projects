import { Schema, Model } from "mongoose";
// import { hash } from "bcrypt";
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
    maxLength: [50, "Max characters: 50"],
    trim: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
    minLength: 6,
  },
});

//The below code is for hashing the above password using bcrypt library
/*
UserSchema.methods.createHash = async (plainTextPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainTextPassword, saltRounds);
};
*/

const User = mongoose.schema("User", UserSchema);

const AccountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = {
  User,
  Account,
};

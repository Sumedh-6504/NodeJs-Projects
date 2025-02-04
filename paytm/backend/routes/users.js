import express from "express";
import jwt from "jsonwebtoken";
// import { createUser } from "../routes/validations";
import { User } from "../database";
import { JWT_SECRET } from "../config";
const router = express.Router();
import zod from "zod";

const signinSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});
const signUpSchema = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  secondName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const createdPayload = req.body();
  const { success } = signUpSchema.safeParse(createdPayload);

  if (!success) {
    return res
      .status(411)
      .json({ message: "Email already taken or invalid credentials" });
  }

  const user = User.findOne({ userName: createdPayload.userName });
  if (user._id) {
    res.status(411).json({
      msg: "Email already taken or invalid credentials",
    });
  }
  try {
    const dbUser = await User.create(createdPayload);
    const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);
    res.json({
      msg: "User created successfully!",
      token: token,
    });
  } catch (err) {
    res.status(411).json({
      msg: `There was an error as ${err}`,
    });
  }
});

router.post("/signin", async (req, res) => {
  const createdPayload = req.body();
  const { success } = signinSchema.safeParse(createdPayload);

  if (!success) {
    res.status(411).json({ msg: "Error while Logging in " });
  }

  try {
    const user = User.findOne({
      userName: createdPayload.userName,
      password: createdPayload.password,
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    if (user) {
      res.status(200).json({
        token: token,
      });
    }
  } catch (err) {
    res
      .status(411)
      .json({ msg: `There was an error while logging in -- ${err}` });
  }
});

module.exports = router;

import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares.js";
// import { createUser } from "../routes/validations";
import { User, Account } from "../database.js";
import { JWT_SECRET } from "../config.js";
const router = express.Router();
import zod from "zod";

const updateSchema = zod.object({
  password: zod.string(),
  firstName: zod.string(),
  secondName: zod.string(),
});

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
  const createdPayload = req.body;
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
    const userId = dbUser._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 1000,
    });

    const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);
    res.json({
      msg: "User created successfully!",
      token: token,
    });

    console.log("User created: ", dbUser);
    await dbUser.save();
  } catch (err) {
    res.status(411).json({
      msg: `There was an error as ${err}`,
    });
  }
});

router.post("/signin", async (req, res) => {
  const createdPayload = req.body;
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

router.put("/", authMiddleware, async (req, res) => {
  const updatePayload = req.body;
  const { success } = updateSchema.safeParse(updatePayload);
  // rWPoD8aieTAgFEFZ;
  if (success) {
    await User.UpdateOne({ _id: req.userId }, updatePayload);
    res.status(200).json({ msg: "Updated Sucessfully!" });
  } else {
    res
      .status(411)
      .json({ msg: "Password too Small/Error while updating information" });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await user.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        secondName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json(
    users.map((user) => ({
      firstName: user.firstName,
      secondName: user.secondName,
      userName: user.userName,
      _id: user._id,
    }))
  );
});

export default router;

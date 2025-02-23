import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares.js";
// import { createUser } from "../routes/validations";
import { User, Account } from "../database.js";
import { JWT_SECRET } from "../config.js";
const router = express.Router();
import zod from "zod";
// import Users from "../../frontend/components/Users.jsx";
// import { Users } from "../../frontend/components/Users.jsx";
// import Users from "../../frontend/components/Users.js";
// import { Users } from "../../frontend/components/Users.jsx";

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
  console.log("Requested payload: ", req.body);

  const createdPayload = req.body;
  const result = signUpSchema.safeParse(createdPayload);
  console.log("Validation result: ", result);

  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Validation failed1", errors: result.error.errors });
  }

  const user = await User.findOne({ userName: createdPayload.userName });
  /*
  // Here there was a Axios error due to :
  // 1. The User.findOne() was not awaited
  // 2. if condition can search the user only not based on "_id"
  //  if (user._id) {
    ^

    TypeError: Cannot read properties of null (reading '_id')
        at file:///E:/data/cohortProjects/reactProjs/paytm/paytm/backend/routes/users.js:41:12
        at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
        */
  if (user) {
    return res.status(400).json({
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
    res.status(200).json({
      msg: "User created successfully!",
      token: token,
    });

    console.log("User created: ", dbUser);
  } catch (err) {
    res.status(500).json({
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


/*
The folowing changhes were made in bulk router :-
1. where "users" in users.find() was converted to User.find({}) as User component is the one which is declared in Users.jsx which results in getting a token from localStorage after 
*/
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  console.log("Received Token:", req.headers.authorization);

  const users = await User.find({
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

  res.json({
    users: users.map((user) => ({
      firstName: user.firstName,
      secondName: user.secondName,
      userName: user.userName,
      _id: user._id,
    })),
  });
});

export default router;

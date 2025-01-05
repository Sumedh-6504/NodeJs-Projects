import express from "express";
import { createUser } from "../routes/validations";
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const createdPayload = req.body();
  const parsedPayload = createUser.safeParse(createdPayload);

  if (!parsedPayload.success) {
    res
      .status(411)
      .json({ message: "The credentials given by the user were not valid!" });
  } else {
    try {
      await User.create({
        userName: createdPayload.userName,
        firstName: createdPayload.firstName,
        lastName: createdPayload.lastName,
        password: createdPayload.password,
      });
      res.json({
        msg: "User created successfully!",
      });
    } catch (err) {
      res.status(411).json({
        msg: `There was an error as ${err}`,
      });
    }
  }
});

module.exports = router;

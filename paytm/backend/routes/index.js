import express from "express";
import userRouter from "../routes/users.js";
import accountUser from "../routes/accounts.js";
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountUser);

export default router;

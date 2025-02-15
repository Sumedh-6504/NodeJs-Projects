import express from "express";
const userRouter = require("../routes/users");
const accountUser = require("./accounts");
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountUser);

module.exports = router;

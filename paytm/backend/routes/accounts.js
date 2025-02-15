import express from "express";
import zod from "zod";
import { authMiddleware } from "../middlewares.js";
import { Account } from "../database.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  console.log("Fetched account: ", account);
  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const userSession = await mongoose.startSession();

  try {
    console.log("Starting the Transaction");
    userSession.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      userSession
    );

    if (!account || account.balance < amount) {
      await userSession.abortTransaction();
      return res
        .json(500)
        .json({ msg: "Transaction Failed due to less balance/wrong userId" });
    }

    const toAccount = await Account.findone({ userId: to }).session(
      userSession
    );

    if (!toAccount) {
      await userSession.abortTransaction();
      return res
        .json(500)
        .json({ msg: "Transactions Failed due to incorrect toUserId" });
    }

    // Updating the transferer account by deducting the amount to be sent(-amount)
    await Account.updateOne(
      { userId: userId },
      { $inc: { balance: -amount } }
    ).session(userSession);

    // Updating the reciever account by adding the amount sent by the transferer(+amount)
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(userSession);

    // Committing the Transaction
    await userSession.commitTransaction();
    res.json({ msg: "Transaction Successfull!" });
  } catch (error) {
    userSession.abortTransaction();
    res.status(500).json({ msg: `Transaction Failed! due to ${error}` });
  } finally {
    console.log("Ending the Transaction Session");
    userSession.endSession();
  }
});

export default router;

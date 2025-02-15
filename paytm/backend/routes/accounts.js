import express from "express";
import zod from "zod";
import { authMiddleware } from "../middlewares.js";
import { Account } from "../database.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.body.userId,
  });
  console.log("User ID from query:", req.query.userId);
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

    const toAccount = await Account.findOne({ userId: to }).session(
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
      { userId: req.userId },
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

// Simple Rules while sending postman requests whil trasnfering and getting the balance
/*
1. The Token should start with Bearer {token}
2. The token passed in getting the balance and transfering should be the same that is "from" UserId
3. Main Rule -- The UserId in MongoDB should be given in the body of the request not the ObjectId
4. You have to run "node index.js" while sending any of the requests
*/

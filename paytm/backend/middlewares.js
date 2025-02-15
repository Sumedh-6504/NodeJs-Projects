import jwt from "jsonwebtoken";
// import express from "express";
import { JWT_SECRET } from "./config.js";

// Input should given to the headers in postman in this format only
/*
Header - 
Authorization: Bearer <actual token>
*/

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Header: ", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(403).json({});

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      console.log("User ID: ", req.userId);
      next();
    }
  } catch (err) {
    return res.status(403).json({ msg: "Invalid Token" });
  }
};

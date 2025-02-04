import jwt from "jsonwebtoken";
// import express from "express";
import { JWT_SECRET } from "./config";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return req.status(403).json({});

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (err) {
    return req.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};

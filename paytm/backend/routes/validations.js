// const express = require("express");
const zod = require("zod");

const createUser = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const findUser = zod.object({
  userName: zod.string(),
  password: zod.string(),
});

module.exports = { createUser, findUser };

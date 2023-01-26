import { Request, Response } from "express";
import { GraphQLError } from "graphql";
const jwt = require("jsonwebtoken");

// set token secret and expiration date
// const secret = process.env.MONGODB_SECRET;s
const secret = "mysecretsshhhhh";
const expiration = "72h";

async function authMiddleware({ req }: any) {
  // allows token to be sent via  req.query or headers

  let token = req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch (error) {
    console.log(`[ERROR]: Invalid token || ${(error as Error).message}`);
    throw new GraphQLError("Invalid error");
  }

  return req;
}

function signToken({
  username,
  email,
  id,
}: {
  username: string;
  email: string;
  id: number;
}) {
  const payload = { username, email, id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = {
  authMiddleware,
  signToken,
};

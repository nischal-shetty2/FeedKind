import dotenv from "dotenv";
dotenv.config();

import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/CustomeRequest";

const userMiddleware = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw Error("Unauthorized access! Token missing or malformed.");
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const verification = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    if (verification) {
      request.userID = verification._id;
      return next();
    }

    response.status(401).send({
      error: true,
      message: "Unauthorized access! Invalid token.",
    });
  } catch (error: any) {
    const { message, status = 500 } = error;
    response.status(status).send({
      error: true,
      message,
    });
  }
};

export default userMiddleware;

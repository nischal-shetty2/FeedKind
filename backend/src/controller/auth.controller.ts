import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User";
import { IUser } from "../types/User";

dotenv.config();

const { JWT_SECRET, NODE_ENV } = process.env;
const saltRounds = 10;

const authRegister = async (
  request: Request<{}, {}, IUser>,
  response: Response
): Promise<void> => {
  const {
    name,
    email,
    phoneNumber,
    password,
    address,
    photoUrl,
    isADonor,
    description,
    latitude,
    longitude,
  } = request.body;
  console.log(request.body);

  try {
    const hash =
      process.env.NODE_ENV === "development"
        ? password
        : await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      phoneNumber,
      password: hash,
      photoUrl,
      address,
      isADonor,
      description,
      latitude,
      longitude,
      registeredAt: new Date(),
      donationCount: 0,
    });

    await user.save();
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    response.status(201).send({
      error: false,
      message: "New user created!",
      jwt_token: token,
      userId: user._id,
    });
    return;
  } catch (error) {
    console.log(error);
    response.status(500).send({
      error: true,
      message: "Something went wrong!",
    });
    return;
  }
};

const authLogin = async (
  request: Request<{}, {}, { email: string; password: string }>,
  response: Response
): Promise<void> => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      response.status(404).send({
        error: true,
        message: "Check email or password!",
      });
      return;
    }

    const isMatch =
      NODE_ENV == "development"
        ? password == user.password
        : await bcrypt.compare(password, user.password);
    if (!isMatch) {
      response.status(404).send({
        error: true,
        message: "Check email or password!",
      });
      return;
    }

    const { password: userPassword, ...data } = user;

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      JWT_SECRET!,
      { expiresIn: "7d" }
    );

    response.status(200).send({
      error: false,
      message: "Login successful!",
      user: data,
      jwt_token: token,
    });
    return;
  } catch (error) {
    console.log(error);
    response.status(500).send({
      error: true,
      message: "Something went wrong!",
    });
    return;
  }
};

const authLogout = async (_: Request, response: Response): Promise<void> => {
  response.send({
    error: false,
    message: "User have been logged out!",
  });
};

const auth = { authLogin, authLogout, authRegister };
export default auth;

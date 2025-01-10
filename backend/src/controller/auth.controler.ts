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
  request: Request,
  response: Response
): Promise<Response> => {
  const {
    name,
    email,
    phoneNumber,
    password,
    photoUrl,
    isADonor,
    description,
    latitude,
    longitude,
  } = request.body as IUser;
  console.log(request.body);

  try {
    const hash =
      NODE_ENV === "development"
        ? password
        : await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      phoneNumber,
      password: hash,
      photoUrl,
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
      JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return response.status(201).send({
      error: false,
      message: "New user created!",
      jwt_token: token,
    });
  } catch (message) {
    console.log(message);
    return response.status(500).send({
      error: true,
      message: "Something went wrong!",
    });
  }
};

const authLogin = async (
  request: Request<{}, {}, { email: string; password: string }>,
  response: Response
): Promise<Response> => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).send({
        error: true,
        message: "Check email or password!",
      });
    }

    const isMatch =
      NODE_ENV == "development"
        ? password == user.password
        : await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(404).send({
        error: true,
        message: "Check email or password!",
      });
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

    return response
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .send({
        error: false,
        message: "Login successful!",
        user: data,
        jwt_token: token,
      });
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      error: true,
      message: "Something went wrong!",
    });
  }
};

const authLogout = async (
  _: Request,
  response: Response
): Promise<Response> => {
  return response
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .send({
      error: false,
      message: "User have been logged out!",
    });
};

export { authLogin, authLogout, authRegister };

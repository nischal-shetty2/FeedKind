import mongoose, { Document, Schema, model } from "mongoose";
import { IUser } from "../types/User";
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /\d{10}/.test(v),
      message: (props: { value: string }) =>
        `${props.value} is not a valid phone number!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: String,
    trim: true,
    default: "https://picsum.photos/200/300/",
  },
  isADonor: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v: string) => /\S+@\S+\.\S+/.test(v),
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address!`,
    },
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  donationCount: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
});

const User = model<IUser>("User", userSchema);

export default User;

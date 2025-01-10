import { Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  password: string;
  latitude: number;
  longitude: number;
  photoUrl?: string;
  isADonor?: boolean;
  registeredAt?: Date;
  donationCount?: number;
  description?: string;
}

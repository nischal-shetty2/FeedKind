import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IItem extends Document {
  itemName: string;
  expirationDate: Date;
  price: Number;
}

export interface IItemListing extends Document {
  vendorId: mongoose.Schema.Types.ObjectId;
  items: IItem[];
  bulkExpirationDate: Date;
}

import mongoose, { Schema, Document, model } from "mongoose";

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

const itemListingSchema = new Schema<IItemListing>(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        itemName: {
          type: String,
          required: true,
          trim: true,
        },
        expirationDate: {
          type: Date,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    bulkExpirationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ItemListing = model<IItemListing>("ItemListing", itemListingSchema);

export default ItemListing;

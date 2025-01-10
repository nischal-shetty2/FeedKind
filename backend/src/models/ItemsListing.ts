import mongoose, { Schema, Document, model } from "mongoose";
import { IItemListing } from "../types/ItemListing";

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

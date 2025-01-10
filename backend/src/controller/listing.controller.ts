import mongoose from "mongoose";
import ItemListing from "../models/ItemsListing";
import { Request, Response } from "express";
import { IItemListing } from "../models/ItemsListing";
import { CustomRequest } from "../types/CustomeRequest";
import { IUser } from "../types/User";

const DaysBeforeExpiration = 4;

const addVendorListing = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { items, bulkExpirationDate } = req.body;

    if (!items || !bulkExpirationDate) {
      res.status(400).json({
        error: false,
        message: "Items and bulkExpirationDate are required.",
      });
      return;
    }
    const bulkExpDate: Date = new Date(bulkExpirationDate);
    const newListing: IItemListing = new ItemListing({
      vendorId: new mongoose.Types.ObjectId(id),
      items,
      bulkExpirationDate: bulkExpDate,
    });

    const savedListing = await newListing.save();

    res.status(201).json({
      error: false,
      message: "Listings created",
      data: savedListing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Server error, could not create listing.",
    });
  }
};

export interface ViewList {
  user: IUser | unknown;
  items: {
    itemName: {
      type: String;
      required: true;
      trim: true;
    };
    expirationDate: {
      type: Date;
      required: true;
    };
    price: {
      type: Number;
      required: true;
    };
  }[];
}

const listDiscountedItems = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const currentDate = new Date();
    const fourDaysLater = new Date(
      currentDate.getTime() + DaysBeforeExpiration * 24 * 60 * 60 * 1000
    );

    const itemListings: any = await ItemListing.find({
      bulkExpirationDate: { $gte: fourDaysLater },
    }).populate("vendorId");

    console.log("Discount Listing:");

    res.status(200).json({
      error: false,
      listings: itemListings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Server error, could not fetch listings.",
    });
  }
};

const listDonationItems = async (_: Request, res: Response): Promise<void> => {
  try {
    const currentDate = new Date();

    const listings: IItemListing[] = await ItemListing.find({
      bulkExpirationDate: {
        $gte: currentDate,
        $lte: new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000),
      },
    }).populate("vendorId");

    res.status(200).json({
      error: false,
      listings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Server error, could not fetch listings.",
    });
  }
};

const listExpiredItems = async (_: Request, res: Response): Promise<void> => {
  try {
    const currentDate = new Date();

    const listings: IItemListing[] = await ItemListing.find({
      bulkExpirationDate: {
        $lt: new Date(currentDate.getTime()),
      },
    }).populate("vendorId");
    console.log("Donation Listing:");
    res.status(200).json({
      error: false,
      listings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Server error, could not fetch listings.",
    });
  }
};

export default {
  addVendorListing,
  listDiscountedItems,
  listDonationItems,
  listExpiredItems,
};

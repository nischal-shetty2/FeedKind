import mongoose from "mongoose";
import ItemListing from "../models/ItemsListing";
import { Request, Response } from "express";
import { IItemListing } from "../models/ItemsListing";
import { CustomRequest } from "../types/CustomeRequest";
import { error } from "console";

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

const listDiscountedItems = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const currentDate = new Date();
    const fourDaysLater = new Date(
      currentDate.getTime() + DaysBeforeExpiration * 24 * 60 * 60 * 1000
    );

    const listings: IItemListing[] = await ItemListing.find({
      bulkExpirationDate: { $gte: fourDaysLater },
    });
    console.log("Discount Listing:");
    console.log(listings);
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

const listDonationItems = async (_: Request, res: Response): Promise<void> => {
  try {
    const currentDate = new Date();

    const listings: IItemListing[] = await ItemListing.find({
      bulkExpirationDate: {
        $gte: currentDate,
        $lte: new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000),
      },
    });
    console.log("Donation Listing:");
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Server error, could not fetch listings.",
    });
  }
};

export default { addVendorListing, listDiscountedItems, listDonationItems };

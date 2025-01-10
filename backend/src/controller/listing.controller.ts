import mongoose from "mongoose";
import ItemListing from "../models/ItemsListing";
import { Request, Response } from "express";
import { IItemListing } from "../models/ItemsListing";
import { CustomRequest } from "../types/CustomeRequest";

const addVendorListing = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { items, bulkExpirationDate } = req.body;

    if (!items || !bulkExpirationDate) {
      res
        .status(400)
        .json({ message: "Items and bulkExpirationDate are required." });
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
      error: true,
      message: "Listings created",
      data: savedListing,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error, could not create listing." });
  }
};

const listDiscountedItems = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const currentDate = new Date();

    const listings: IItemListing[] = await ItemListing.find({
      bulkExpirationDate: { $gte: currentDate },
    });

    const filteredListings = listings.map((listing) => ({
      ...listing.toObject(),
      items: listing.items.filter(
        (item) =>
          new Date(item.expirationDate) < new Date(listing.bulkExpirationDate)
      ),
    }));

    res.status(200).json(filteredListings);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error, could not fetch listings." });
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

    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error, could not fetch listings." });
  }
};

export default { addVendorListing, listDiscountedItems, listDonationItems };

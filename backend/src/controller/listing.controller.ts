import mongoose from "mongoose";
import ItemListing from "../models/ItemsListing";
import { Request, Response } from "express";
import { IItemListing } from "../models/ItemsListing";

const addVendorListing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { items, bulkExpirationDate } = req.body;

    if (!items || !bulkExpirationDate) {
      res
        .status(400)
        .json({ message: "Items and bulkExpirationDate are required." });
      return;
    }

    const newListing: IItemListing = new ItemListing({
      vendorId: new mongoose.Types.ObjectId(id),
      items,
      bulkExpirationDate,
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

export default { addVendorListing };

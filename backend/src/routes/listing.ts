import express, { Request, Response } from "express";
import listing from "../controller/listing.controller";
import userMiddleware from "../middleware/user.middleware";

const router = express.Router();

router.get("/discount", listing.listDiscountedItems);

router.get("/foodbank", listing.listDonationItems);

router.get("/expired", listing.listExpiredItems);

router.post("/:id", userMiddleware, listing.addVendorListing);

export default router;

import express, { Request, Response } from "express";
import listing from "../controller/listing.controller";
import userMiddleware from "../middleware/user.middleware";

const router = express.Router();

router.get("/discount", listing.discountedItems);

router.get("/foodbank", listing.donationItems);

router.get("/expired", listing.expiredItems);

router.post("/:id", userMiddleware, listing.addVendorListing);

export default router;

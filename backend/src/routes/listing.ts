import express, { Request, Response } from "express";
import listing from "../controller/listing.controller";
import userMiddleware from "../middleware/user.middleware";

const router = express.Router();

router.get("/listing/discount", userMiddleware, listing.listDiscountedItems);

router.post("/listing/:id", userMiddleware, listing.addVendorListing);

export default router;

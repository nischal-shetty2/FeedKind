import express, { Request, Response } from "express";
import listing from "../controller/listing.controller";
import userMiddleware from "../middleware/user.middleware";

const router = express.Router();

router.get("/discount", userMiddleware, listing.listDiscountedItems);

router.post("/:id", userMiddleware, listing.addVendorListing);

export default router;

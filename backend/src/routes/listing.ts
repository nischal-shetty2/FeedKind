import express, { Request, Response } from "express";
import listing from "../controller/listing.controller";

const router = express.Router();

// Create listing route
router.post("/listing/:id", listing.addVendorListing);

export default router;

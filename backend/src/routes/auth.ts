import express from "express";
import auth from "../controller/auth.controller";

const router = express.Router();

router.post("/register", auth.authRegister);

router.post("/login", auth.authLogin);

router.post("/logout", auth.authLogout);

export default router;

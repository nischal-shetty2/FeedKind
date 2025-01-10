const express = require("express");
const {
  authLogin,
  authLogout,
  authRegister,
} = require("../controller/auth.controler");

const app = express.Router();

app.post("/register", authRegister);

app.post("/login", authLogin);

app.post("/logout", authLogout);

export default app;

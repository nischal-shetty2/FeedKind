import express, { Request, Response } from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
import { connect } from "./db/connect";

const PORT: number = parseInt(process.env.PORT || "8080", 10);
import authRoute from "./routes/auth";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/auth", authRoute);
// app.use("/listing", listingRoute);

app.get("/", (_: Request, response: Response) => {
  response.send("user other route!");
});

app.listen(PORT, async () => {
  try {
    console.log(`Listening on port :${PORT}`);
    await connect();
  } catch (err) {
    console.error(err);
  }
});

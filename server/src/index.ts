import express, { Express, Request, Response } from "express";
const app: Express = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import config from "./config";
import inventoryRouter from "./routers/inventory.router";
import serviceAuthRouter from "./routers/serviceAuth.router";
import processOrderRouter from "./routers/processOrder.router";
import orderStatusRouter from "./routers/orderStatus.router";
import chefEfficiency from "./routers/chefEfficiency.router";

app.use(cookieParser());
app.use(
  cors({
    origin: config.CORS_ORIGIN.split(","),
  })
);
app.use(express.json());

// Request from every Silo to HR for Login and to get JWT Token from Skeleton
app.use("/service-auth", serviceAuthRouter);

//Request From Menu Builder to Inventory to  get all the ingredients.
app.use("/inventory", inventoryRouter);

//Req from POS/Marketplace to Inventory + Kitchen
app.use("/process-order", processOrderRouter);

// Post req from KDS to Pos and Marketplace regarding food preparation status
app.use("/order-prep-status", orderStatusRouter);

// Post req from KDS to HR sending data about chef efficiency to prepare dishes
app.use("/hr", chefEfficiency);

app.listen(config.PORT, () => {
  // console.log(process.env.PORT, "df");
  console.log(`[server]: Server is running on port ${config.PORT}`);
});

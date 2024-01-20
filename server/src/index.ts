import express, { Express } from "express";
const app: Express = express();
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
import cookieParser from "cookie-parser";

import config from "./config";
import inventoryRouter from "./routers/inventory.router";
import serviceAuthRouter from "./routers/serviceAuth.router";
import processOrderRouter from "./routers/processOrder.router";
import orderStatusRouter from "./routers/orderStatus.router";
import authRouter from "./routers/authRouter.router";
import { getCorsOrigin } from "./utilities/cors.utility";
import skeletonRouter from "./routers/skeleton.router";
import employeeRouter from "./routers/employee.router";
import orderRouter from "./routers/order.router";
import menuRouter from "./routers/menu.router";
import posRouter from "./routers/pos.router";
import hrRouter from "./routers/hr.router";
app.use(cookieParser());

app.use(
  cors({
    origin: getCorsOrigin(),
    // origin: "*",
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);

app.use(cors());
app.use(express.json());

// Auth api's
app.use("/auth", authRouter);
app.use("/service-auth", serviceAuthRouter);

//Request From Menu Builder to Inventory to  get all the ingredients.
app.use("/inventory", inventoryRouter);

app.use("/orders", orderRouter);

//Req from POS/Marketplace to Inventory + Kitchen [NEED FIXES]
app.use("/process-order", processOrderRouter);

// Post req from KDS to Pos and Marketplace regarding food preparation status
app.use("/order-prep-status", orderStatusRouter);

// Post req from KDS to HR sending data about chef efficiency to prepare dishes
// Post req from POS to HR sending data about waiter efficiency 
// Post req from Review to HR sending data about review of an order
app.use("/hr", hrRouter);

// Get req from Review to POS to get an Order Info using OrderId
// Get req from Review to POS to get all the reservations
// Get req from Review to POS to get reservations of a day using date of that day
// Post req from Review to POS for sending new reservations. (Websocket)
app.use("/pos", posRouter)

// Request from POS and Marketplace for menu
app.use("/menu", menuRouter)

// All the skeleton specific Routes
app.use("/skeleton", skeletonRouter);

// Employee routes
app.use("/employee", employeeRouter);



async function main() {
  try {
    const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.f3aocvj.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(uri, {});
    console.log("Mongoose connected");

    app.listen(config.PORT, () => {
      console.log(`[server]: Server is running on port ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
// Dont forget the call the main function
main();

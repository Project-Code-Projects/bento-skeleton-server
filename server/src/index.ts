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
import authRouter from "./routers/authRouter.router";
import { getCorsOrigin } from "./utilities/cors.utility";
import skeletonRouter from "./routers/skeleton.router";
import employeeRouter from "./routers/employee.router";
import orderRouter from "./routers/order.router";
import menuRouter from "./routers/menu.router";
import posRouter from "./routers/pos.router";
import hrRouter from "./routers/hr.router";
import marketplaceRouter from "./routers/marketplace.router";
import restaurantsRouter from "./routers/restaurants.router";
import utilizationRouter from "./routers/restaurantUtilization.router";
import { Redis } from "ioredis";

app.use(cookieParser());
app.use(
  cors({
    origin: getCorsOrigin(),
    // origin: "*",
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);

// Creating Redis Client
export const redis = new Redis({
  port: Number(config.REDIS_PORT),
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,
});

app.use(express.json());

app.use("/auth", authRouter);

app.use("/service-auth", serviceAuthRouter);

app.use("/inventory", inventoryRouter);

app.use("/orders", orderRouter);

app.use("/hr", hrRouter);

app.use("/pos", posRouter)

app.use("/menu", menuRouter)

app.use("/skeleton", skeletonRouter);

app.use("/employee", employeeRouter);

app.use('/marketplace', marketplaceRouter)

app.use('/restaurants', restaurantsRouter)

app.use('/utilization', utilizationRouter);



async function main() {
  try {
    const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.f3aocvj.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(uri, {});
    console.log("Mongoose connected");

    app.listen(config.PORT, () => {
      console.log(`[server]: Server is running on port ${config.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}
main();

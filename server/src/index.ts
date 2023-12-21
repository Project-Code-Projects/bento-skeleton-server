import express, { Express, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import dotenv from "dotenv";
dotenv.config();
import verifyJWTMiddleware from "./middlewares/jwtVerify.middleware";
import cookieParser from "cookie-parser";
import inventoryRouter from "./routers/inventory.router";
import processPosOrderRouter from "./routers/processPosOrder.router";
import processMarketplaceOrderRouter from "./routers/processMarketplaceOrder.router";
const app: Express = express();

app.use(cookieParser());
app.use(cors({ origin: config.CORS_ORIGIN.split(",") }));
app.use(express.json());

app.use("/inventory", verifyJWTMiddleware, inventoryRouter); //Request From Menu Builder to Inventory to   get all the ingredients.

app.use("/process-pos-order", verifyJWTMiddleware, processPosOrderRouter); //Req from POS to Inventoy + Kitchen

app.use("/process-marketplace-order", verifyJWTMiddleware, processMarketplaceOrderRouter); //Req from POS to Inventoy + Kitchen

app.get("/test", (req, res) => {
  res.send("Its workinggg");
});

app.listen(config.PORT, () => {
  console.log(`[server]: Server is running on port ${config.PORT}`);
});

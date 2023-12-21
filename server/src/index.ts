import express, { Express, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import dotenv from "dotenv";
dotenv.config();
import verifyJWTMiddleware from "./middlewares/jwtVerify.middleware";
import cookieParser from "cookie-parser";
import inventoryRouter from "./routers/inventory.router";
const app: Express = express();

app.use(cookieParser());
app.use(cors({ origin: config.CORS_ORIGIN.split(",") }));
app.use(express.json());

app.use("/inventory", verifyJWTMiddleware, inventoryRouter);

app.listen(config.PORT, () => {
  console.log(`[server]: Server is running on port ${config.PORT}`);
});

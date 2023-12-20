import cors from "cors";
import express, { Express, Request, Response } from "express";
import config from "./config";

const app: Express = express();

app.use(
  cors({
    origin: config.CORS_ORIGIN.split(","),
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello! I am workingggg!</h1>");
});

app.listen(config.PORT, () => {
  console.log(`[server]: Server is running on port ${config.PORT}`);
});

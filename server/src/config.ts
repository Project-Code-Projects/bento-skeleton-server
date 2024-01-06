import dotenv from "dotenv";
dotenv.config();

const config = {
  DB_PASS: process.env.DB_PASS,
  DB_USER: process.env.DB_USER,

  PORT: process.env.PORT ?? 5000,
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
  JWT_SECRET: process.env.JWT_SECRET ?? "secret",

  HR_BASE_URL: process.env.HR_BASE_URL,
  INVENTORY_BASE_URL: process.env.INVENTORY_BASE_URL,
  KDS_BASE_URL: process.env.KDS_BASE_URL,
  POS_BASE_URL: process.env.POS_BASE_URL,
  MARKETPLACE_BASE_URL: process.env.MARKETPLACE_BASE_URL,
  MENU_BASE_URL: process.env.MENU_BASE_URL,
  REVIEW_BASE_URL: process.env.REVIEW_BASE_URL,
};

export default config;

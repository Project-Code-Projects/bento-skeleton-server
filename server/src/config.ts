import dotenv from "dotenv";
dotenv.config();

const config = {
  DB_PASS: process.env.DB_PASS,
  DB_USER: process.env.DB_USER,

  PORT: process.env.PORT ?? 5000,
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
  JWT_SECRET: process.env.JWT_SECRET ?? "secret",

  // Server URLs
  HR_SERVER_URL: process.env.HR_SERVER_URL,
  INVENTORY_SERVER_URL: process.env.INVENTORY_SERVER_URL,
  KDS_SERVER_URL: process.env.KDS_SERVER_URL,
  POS_SERVER_URL: process.env.POS_SERVER_URL,
  MARKETPLACE_SERVER_URL: process.env.MARKETPLACE_SERVER_URL,
  MENU_SERVER_URL: process.env.MENU_SERVER_URL,
  REVIEW_SERVER_URL: process.env.REVIEW_SERVER_URL,

  // Client URLs
  HR_CLIENT_URL: process.env.HR_CLIENT_URL,
  INVENTORY_CLIENT_URL: process.env.INVENTORY_CLIENT_URL,
  KDS_CLIENT_URL: process.env.KDS_CLIENT_URL,
  POS_CLIENT_URL: process.env.POS_CLIENT_URL,
  MARKETPLACE_CLIENT_URL: process.env.MARKETPLACE_CLIENT_URL,
  MENU_CLIENT_URL: process.env.MENU_CLIENT_URL,
  REVIEW_CLIENT_URL: process.env.REVIEW_CLIENT_URL,
};

export default config;

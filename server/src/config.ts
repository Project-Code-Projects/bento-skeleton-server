import dotenv from "dotenv";
dotenv.config();

const config = {
  DB_PASS: process.env.DB_PASS,
  DB_USER: process.env.DB_USER,

  PORT: process.env.PORT ?? 5000,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  JWT_SECRET: process.env.JWT_SECRET,

  HR_BE_BASE_URL: process.env.HR_BE_BASE_URL,
  HR_FE_BASE_URL: process.env.HR_FE_BASE_URL,

  INVENTORY_BE_BASE_URL: process.env.INVENTORY_BE_BASE_URL,
  INVENTORY_FE_BASE_URL: process.env.INVENTORY_FE_BASE_URL,

  KDS_BE_BASE_URL: process.env.KDS_BE_BASE_URL,
  KDS_FE_BASE_URL: process.env.KDS_FE_BASE_URL,

  POS_BE_BASE_URL: process.env.POS_BE_BASE_URL,
  POS_FE_BASE_URL: process.env.POS_FE_BASE_URL,

  MARKETPLACE_BE_BASE_URL: process.env.MARKETPLACE_BE_BASE_URL,
  MARKETPLACE_FE_BASE_URL: process.env.MARKETPLACE_FE_BASE_URL,

  MENU_BE_BASE_URL: process.env.MENU_BE_BASE_URL,
  MENU_FE_BASE_URL: process.env.MENU_FE_BASE_URL,

  REVIEW_BE_BASE_URL: process.env.REVIEW_BE_BASE_URL,
  REVIEW_FE_BASE_URL: process.env.REVIEW_FE_BASE_URL,

  RESERVATION_FE_BASE_URL: process.env.RESERVATION_FE_BASE_URL,


  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

};

export default config;

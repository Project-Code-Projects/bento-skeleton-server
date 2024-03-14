import dotenv from "dotenv";
dotenv.config();


const config = {
  DB_PASS: process.env.DB_PASS,
  DB_USER: process.env.DB_USER,

  PORT: process.env.PORT ?? 5000,
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
  JWT_SECRET: process.env.JWT_SECRET ?? "ad77cb1d20419283184dc60c3f1bdb8ef4305f8690cdd9dc680319c106cc2b7b",

  HR_BE_BASE_URL: process.env.HR_BE_BASE_URL ?? "http://localhost:4000",
  HR_FE_BASE_URL: process.env.HR_FE_BASE_URL ?? "http://localhost:4000",

  INVENTORY_BE_BASE_URL: process.env.INVENTORY_BE_BASE_URL ?? "http://localhost:4010",
  INVENTORY_FE_BASE_URL: process.env.INVENTORY_FE_BASE_URL ?? "http://localhost:4011",

  KDS_BE_BASE_URL: process.env.KDS_BE_BASE_URL ?? "http://localhost:4020",
  KDS_FE_BASE_URL: process.env.KDS_FE_BASE_URL ?? "http://localhost:4021",

  POS_BE_BASE_URL: process.env.POS_BE_BASE_URL ?? "http://localhost:4030",
  POS_FE_BASE_URL: process.env.POS_FE_BASE_URL ?? "http://localhost:4031",

  MARKETPLACE_BE_BASE_URL: process.env.MARKETPLACE_BE_BASE_URL ?? "http://localhost:4040",
  MARKETPLACE_FE_BASE_URL: process.env.MARKETPLACE_FE_BASE_URL ?? "http://localhost:4041",

  MENU_BE_BASE_URL: process.env.MENU_BE_BASE_URL ?? "http://localhost:4050",
  MENU_FE_BASE_URL: process.env.MENU_FE_BASE_URL ?? "http://localhost:4051",

  REVIEW_BE_BASE_URL: process.env.REVIEW_BE_BASE_URL ?? "http://localhost:4060",
  REVIEW_FE_BASE_URL: process.env.REVIEW_FE_BASE_URL ?? "http://localhost:4061",

  RESERVATION_FE_BASE_URL: process.env.RESERVATION_FE_BASE_URL ?? "http://localhost:4150",


  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

};

export default config;

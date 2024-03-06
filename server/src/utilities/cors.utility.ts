import config from "../config";

export function getCorsOrigin() {
  return [
    "http://localhost:4200",
    config.HR_BE_BASE_URL,
    config.INVENTORY_BE_BASE_URL,
    config.KDS_BE_BASE_URL,
    config.MARKETPLACE_BE_BASE_URL,
    config.MENU_BE_BASE_URL,
    config.POS_BE_BASE_URL,
    config.REVIEW_BE_BASE_URL,
    config.RESERVATION_FE_BASE_URL,
    ...config.CORS_ORIGIN.split(","),
  ];
}

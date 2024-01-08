import config from "../config";

const services = ["pos", "kds", "inventory", "menu-builder", "hr", "review"];

export function validateService(service: string) {
  return services.includes(service);
}

export function getRedirectUrlForService(service: string, code: string) {
  switch (service) {
    case "pos":
      return config.POS_CLIENT_URL + "/auth-redirect?code=" + code;
    case "kds":
      return config.KDS_CLIENT_URL + "/auth-redirect?code=" + code;
    case "inventory":
      return config.INVENTORY_CLIENT_URL + "/auth-redirect?code=" + code;
    case "menu-builder":
      return config.MENU_CLIENT_URL + "/auth-redirect?code=" + code;
    case "hr":
      return config.HR_CLIENT_URL + "/auth-redirect?code=" + code;
    case "review":
      return config.REVIEW_CLIENT_URL + "/auth-redirect?code=" + code;
    default:
      return null;
  }
}

import { LoginDataInterface } from "../interfaces/loginDataInterface";

export function validateLoginData(data: LoginDataInterface): boolean {
  if (typeof data === "object" && typeof data.email === "string" && typeof data.password === "string" && typeof data.service === "string") {
    return true;
  } else {
    return false;
  }
}

import axios, { AxiosError } from "axios";
import { LoginDataInterface } from "../interfaces/loginDataInterface";
import { UserInterface } from "../interfaces/UserInterface";
import config from "../config";

interface HrResponseInterface {
  status: string;
  user: UserInterface;
}

/* export interface UserInterface {
  id: string;
  name: string;
  email: string;
  restaurantId: number;
  role: "admin" | "employee";
  serviceAccess: string[];
}
 */

/*  interface LoginDataInterface {
  email: string;
  password: string;
} */

// Function to go and ask HR if the person trying to login to one of the 6 silos, has access to that silo or not.
export async function hrLogin(data: LoginDataInterface) {
  try {
    const res = await axios.post<any>(config.HR_BE_BASE_URL + "/employee/login", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// To check if an user has access to a certain array
export async function hrServiceCheck(data: { userId: number; service: string }) {
  try {
    const res = await axios.post<{ status: string; auth: boolean }>(config.HR_BE_BASE_URL + "/employee/access/check", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// APU
// Gets the accessible-silo names array
export async function hrServiceList(userId: number) {
  try {
    const res = await axios.get<{ services: string[] }>(config.HR_BE_BASE_URL + "/employee/access/service/" + userId);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

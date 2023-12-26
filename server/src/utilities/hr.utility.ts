import axios from "axios";
import { LoginDataInterface } from "../interfaces/loginDataInterface";
import { UserInterface } from "../interfaces/userInterface";
import config from "../config";

interface HrResponseInterface {
  status: string;
  user: UserInterface;
}

// Function to go and ask HR if the person trying to login to one of the 6 silos, has access to that silo or not.
export async function hrLogin(data: LoginDataInterface): Promise<HrResponseInterface> {
  try {
    const url = process.env.HR_BASE_URL + "/auth/login";
    const res = await axios.post<HrResponseInterface>(`${process.env.HR_BASE_URL}/auth/login`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function hrServiceCheck(data: { userId: number; service: string }) {
  try {
    const res = await axios.post<{ status: string; auth: boolean }>(config.HR_BASE_URL + "/access/check", data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

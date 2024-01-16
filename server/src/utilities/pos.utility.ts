import axios, { AxiosError } from "axios";
import config from "../config";

export async function posGetAllOrders(token: string) {
  try {
    const res = await axios.get<any>(config.POS_BE_BASE_URL + "/order/", { headers: { 'Authorization': 'Bearer ' + token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}
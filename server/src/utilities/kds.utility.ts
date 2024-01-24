import axios, { AxiosError } from "axios";
import config from "../config";
import { IOrder } from "../interfaces/NewOrderInterface";

export async function chefCheckIn(token: string) {
  try {
    const res = await axios.post(config.KDS_BE_BASE_URL + '/chef/check-in', {}, { headers: { 'Authorization': 'Bearer ' + token } });
    return res;
  } catch (error) {
    console.log('error from kds utility', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

export async function chefCheckOut(token: string) {
  try {
    const res = await axios.post(config.KDS_BE_BASE_URL + '/chef/check-out', {}, { headers: { 'Authorization': 'Bearer ' + token } });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

export async function kdsPostIncomingOrder(token: string, order: any) {
  try {
    const res = await axios.post(config.KDS_BE_BASE_URL + '/orders/incoming', order, { headers: { 'Authorization': 'Bearer ' + token } });
    console.log('kds utility', res.status, res.data);
    return res.data;

  } catch (error) {
    console.log('error from KDS utility ', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// Send New Order info to KDS
export async function newOrder(newOrder: IOrder) {
  try {
    const result = await axios.post(`${config.KDS_BE_BASE_URL}/`, newOrder)
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
  }
}

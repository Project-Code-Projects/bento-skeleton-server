import axios, { AxiosError } from "axios";
import config from "../config";

export async function posGetAllOrders(token: string) {
  try {
    const res = await axios.get<any>(config.POS_BE_BASE_URL + "/order/all", { headers: { 'Authorization': 'Bearer ' + token } });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}


export async function posUpdateOrderStatus(token: string, orderId: string, status: string) {
  try {
    const res = await axios.put<any>(config.POS_BE_BASE_URL + "/order/status/" + orderId, { status }, { headers: { 'Authorization': 'Bearer ' + token } });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

export async function posUpdateOrderChef(token: string, orderId: string, chef: any) {
  try {
    const res = await axios.put<any>(config.POS_BE_BASE_URL + "/order/chef/" + orderId, { chef }, { headers: { 'Authorization': 'Bearer ' + token } });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

export async function getOrderInfoUsingOrderId(orderId: string) {
  try {
    const res = await axios.get<any>(`${config.POS_BE_BASE_URL}/order-info/${orderId}`)
    return res.data;

  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}


export async function getAllReservationOfARestaurant(restaurantId: string) {
  try {
    const res = await axios.get<any>(`${config.POS_BE_BASE_URL}/get-all-reservation/${restaurantId}`)
    return res.data
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

export async function getReservationOfARestaurantByDate(restaurantId: string, date: any) {
  try {
    const res = await axios.get<any>
      (`${config.POS_BE_BASE_URL}/get-oneday-reservation?restaurantId=${restaurantId}&date=${date}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);

  }
}

export async function postNewReservationOfARestaurant(restaurantId: string, reservationData: object) {
  try {
    const res = await axios.post<any>(`${config.POS_BE_BASE_URL}/save-new-reservation/${restaurantId}`, reservationData)
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }

}
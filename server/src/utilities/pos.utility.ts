import axios, { AxiosError } from "axios";
import config from "../config";
import { IOrder } from "../interfaces/NewOrderInterface";

export async function posGetAllOrders(token: string) {
  try {
    const res = await axios.get<any>(config.POS_BE_BASE_URL + "/order/all", { headers: { 'Authorization': 'Bearer ' + token } });
    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}


// Send updated order STATUS to POS from KDS
export async function posUpdateOrderStatus(token: string, orderId: string, status: string) {
  try {
    await axios.post<any>(config.POS_BE_BASE_URL + "/order/status/" + orderId, { status }, { headers: { 'Authorization': 'Bearer ' + token } });
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

export async function posUpdateOrderChef(token: string, orderId: string, chef: any) {
  try {
    const res = await axios.put<any>(config.POS_BE_BASE_URL + "/order/chef/" + orderId, { chef }, { headers: { 'Authorization': 'Bearer ' + token } });
    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// Get the full details of an Order using its orderId
export async function getOrderInfoUsingOrderId(orderId: string, token: string) {
  try {
    const res = await axios.get<any>(`${config.POS_BE_BASE_URL}/order/${orderId}`, { headers: { 'Authorization': 'Bearer ' + token } })
    return res.data;

  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}


export async function getAllReservationOfARestaurant(restaurantId: string) {
  try {
    const res = await axios.get<any>(`${config.REVIEW_BE_BASE_URL}/allReservations/${restaurantId}`)
    return res.data
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

export async function getReservationOfARestaurantByDate(restaurantId: string, date: any) {
  try {
    const res = await axios.get<any>(`${config.REVIEW_BE_BASE_URL}/allReservations/restaurant/${restaurantId}/date/${date}`);
    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);

  }
}

export async function postNewReservationOfARestaurant(restaurantId: string, reservationData: object) {
  try {
    const res = await axios.post<any>(`${config.POS_BE_BASE_URL}/save-new-reservation/${restaurantId}`, reservationData)
    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }

}

export async function sendOrderIdWithFullOrderToKdsFromPosToMarkOrderAsServed(orderId: string, fullOrder: IOrder, token: string) {
  try {
    const res = await axios.post<any>(`${config.KDS_BE_BASE_URL}/orders/served/${orderId}`, fullOrder,
      { headers: { 'Authorization': 'Bearer ' + token } })

    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
  }
}

// Get hourly/weekday/monthly stats from POS
export async function getStatsFromPos(timespan: string, token: string) {
  try {
    console.log("timespanInParams", timespan);
    const res = await axios.get<any>(`${config.POS_BE_BASE_URL}/order/stats/${timespan}`, { headers: { 'Authorization': 'Bearer ' + token } })
    console.log("res.data", res.data);
    return res.data
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
  }
}


export async function getAllTableOfAllRestaurantFromPos(token: string) {
  try {
    const res = await axios.get<any>(config.POS_BE_BASE_URL + "/table/all-restaurant-tables", { headers: { 'Authorization': 'Bearer ' + token } })
    return res.data
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
  }
}


export async function changeReservationStatusInReview(reservationId: string, status: string) {
  try {
    const res = await axios.put(`${config.REVIEW_BE_BASE_URL}/change-status/reservation/${reservationId}/status/${status}`)
    return res.data
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
  }
}
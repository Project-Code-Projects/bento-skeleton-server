import axios, { AxiosError } from "axios";
import { LoginDataInterface } from "../interfaces/LoginDataInterface";
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
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// To check if an user has access to a certain array
export async function hrServiceCheck(data: { userId: number; service: string }) {
  try {
    const res = await axios.post<{ status: string; auth: boolean }>(config.HR_BE_BASE_URL + "/employee/access/check", data);
    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// Gets the accessible-silo names array
export async function hrServiceList(userId: number) {
  try {
    const res = await axios.get<{ services: string[] }>(config.HR_BE_BASE_URL + "/employee/access/service/" + userId);
    // console.log('from hr utility', res.data);
    return res.data;

  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// Gets the full user Info using jwt info (user id)
export async function hrUserInfo(userId: any) {
  try {
    const res = await axios.get(config.HR_BE_BASE_URL + "/employee/userInfo/" + userId);
    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}


export async function sendOwnerInfoToHR(data: { restaurantId: number, name: string, password: string, email: string }) {
  try {
    const res = await axios.post<any>(config.HR_BE_BASE_URL + "/employee/signup", data);
    // console.log('HRDATA', res.data);
    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// Gets the active chefs in a restaurant
export async function hrActiveChefs(restaurantId: number, token: string) {
  try {
    const res = await axios.get(config.HR_BE_BASE_URL + "/chef/active/" + restaurantId, { headers: { 'Authorization': 'Bearer ' + token } });
    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// Gets the active waiters in a restaurant . NOT NEEDED IN POS. NEEDS FIX IN HR SIDE
export async function hrActiveWaiters(restaurantId: number, token: string) {
  try {
    const res = await axios.get(config.HR_BE_BASE_URL + "/position/" + restaurantId + "/waiters", { headers: { 'Authorization': 'Bearer ' + token } });
    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}


// Post chef efficiency to HR
export async function hrPostChefEfficiency(data: any, token: string) {
  try {
    const res = await axios.post(`${config.HR_BE_BASE_URL}/chef/efficiency`, data, { headers: { 'Authorization': 'Bearer ' + token } });
    console.log('res.data from HR in response to CHEF Efficiency post  🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳 ', res.data);
    return res.data;
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// Post waiter efficiency to HR
export async function hrPostWaiterEfficiency(data: any, token: string) {
  try {
    const res = await axios.post(`${config.HR_BE_BASE_URL}/waiter/efficiency`, data, { headers: { 'Authorization': 'Bearer ' + token } })
    return res.data
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }

}

export async function hrPostOrderReview(data: any, restaurantId: string) {
  try {
    const res = await axios.post(`${config.HR_BE_BASE_URL}/order-review/${restaurantId}`, data)
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
  }
}

// Send Employee info to HR for Check In
export async function sendCheckInInfoToHr(employeeId: number, restaurantId: number) {
  try {
    const res = await axios.post(`${config.HR_BE_BASE_URL}/attendance/${restaurantId}/restaurant/${employeeId}`, { isCheckedIn: true })
    // console.log('hr utility check in -----', res.data);
    const attendanceIdObj = { attendanceId: res.data.id }
    return attendanceIdObj
  } catch (error) {
    console.log('error from check in utility', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
  }
}

// Send Employee info to HR for Check Out
export async function sendCheckOutInfoToHr(data: { employeeId: number, attendanceId: number }) {
  try {
    const res = await axios.put(`${config.HR_BE_BASE_URL}/attendance/${data.employeeId}/restaurant/${data.attendanceId}`, { isCheckedIn: false })
    return res.data
  } catch (error) {
    console.log('Error from HR Utility sendCheckOutInfoToHr --------------------', error);
    throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
  }
}







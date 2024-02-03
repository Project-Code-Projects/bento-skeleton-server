import axios, { AxiosError } from "axios";
import config from "../config";

export async function getMenuWithRestaurantId(token: string) {
    try {
        const res = await axios.get(`${config.MENU_BE_BASE_URL}/menuItem/restaurant`, { headers: { 'Authorization': 'Bearer ' + token } })
        return res.data;
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
}

export async function getMenuCatagories(restaurantId: number, token: string) {
    try {
        const res = await axios.get<any>(`${config.MENU_BE_BASE_URL}/category/restaurant/${restaurantId}`, { headers: { 'Authorization': 'Bearer ' + token } })
        return res.data
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
}


export async function getMenuItemDetails(menuItemId: string, token: string) {
    try {
        const res = await axios.get(config.MENU_BE_BASE_URL + '/menuItem/' + menuItemId, { headers: { 'Authorization': 'Bearer ' + token } })
        console.log('data from omi bhai 😭😭😭', res.data);
        return res.data

    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭 from omi bhai', error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}
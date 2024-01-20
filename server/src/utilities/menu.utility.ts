import axios, { AxiosError } from "axios";
import config from "../config";

export async function getMenuWithRestaurantId(id: number) {
    try {
        const res = await axios.get(`${config.MENU_BE_BASE_URL}/menuItem/restaurant/${id}`)
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
}

export async function getMenuCatagories(restaurantId: number) {
    try {
        const res = await axios.get<any>(`${config.MENU_BE_BASE_URL}/category/restaurant/${restaurantId}`)
        return res.data
    } catch (error) {
        console.log(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
}
import axios, { AxiosError } from "axios";
import config from "../config";

export async function getMenuWithRestaurantId(id: number) {
    try {
        const data = await axios.get(`${config.MENU_BE_BASE_URL}/menuItem/restaurant/${id}`)
        return data;
    } catch (error) {
        console.log(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
}
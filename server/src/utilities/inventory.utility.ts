import axios, { AxiosError } from "axios";
import config from "../config";

export async function getInventoryDataOfARestaurantFromInventory(restaurantId: number, token: string) {
    try {
        const apiUrl = config.INVENTORY_BE_BASE_URL + `/v1/ingredient/restaurant/${restaurantId}`;
        const res = await axios.get<any>(apiUrl, { headers: { 'Authorization': 'Bearer ' + token } });
        return res.data
    } catch (error) {
        console.error(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}

export async function getDeliveryBoxInfo(restaurantId: number, token: string) {
    try {
        const res = await axios.get(`${config.INVENTORY_BE_BASE_URL}/v1/deliveryBox/restaurant/${restaurantId}`,
            { headers: { 'Authorization': 'Bearer ' + token } })
        return res.data
    } catch (error) {
        console.error(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}
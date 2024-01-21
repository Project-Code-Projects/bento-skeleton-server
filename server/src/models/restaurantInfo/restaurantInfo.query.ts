import { IRestaurantInfo } from "../../interfaces/RestaurantInfoInterface";
import RestaurantInfoModel from "./restaurantInfo.model";

export const postRestaurantInfo = async (data: IRestaurantInfo) => {
    try {
        const result = await RestaurantInfoModel.create(data)
        return result;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function allDeliveryRestaurants() {
    try {

    } catch (error) {
        console.error(error)
        throw error
    }
}
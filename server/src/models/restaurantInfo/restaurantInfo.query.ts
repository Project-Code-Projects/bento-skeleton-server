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
        // Selecting what fields we want
        const result = await RestaurantInfoModel.find({}).select('restaurantName restaurantLogo')
        return result;
    } catch (error) {
        console.log(error)
        throw new Error((error as Error).message)
    }
}
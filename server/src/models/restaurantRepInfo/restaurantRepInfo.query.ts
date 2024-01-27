import { IRestaurantRep } from "../../interfaces/RestaurantRepInterface";
import RestaurantRepModel from "./restaurantRepInfo.model";

export const saveRestaurantRep = async (data: IRestaurantRep) => {
    try {
        const result = await RestaurantRepModel.create(data)
        return result;
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
    }

}
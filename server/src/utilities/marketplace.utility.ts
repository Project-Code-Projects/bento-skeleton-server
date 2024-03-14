import axios, { AxiosError } from "axios";
import RestaurantInfoModel from "../models/restaurantInfo/restaurantInfo.model";
import config from "../config";
import { cuisinesObj } from "../dummy-data/cuisineObj";
import { marketplaceTokenInfos } from "../dummy-data/marketplaceTokenInfo";


// Get orders data from Marketplace
export async function getMarketplaceOrderData(restaurantId: number) {
    try {
        const res = await axios.get(`${config.MARKETPLACE_BE_BASE_URL}/orders/processing/${restaurantId}`)
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}


// Get all the data for a restaurant from Skeleton DB by using its ID + Get the rating info of that restaurant from REVIEW
export async function getRestaurantDetailsFromDB(restaurantId: string) {
    try {
        const parsedToNumberRestaurantId = parseInt(restaurantId);
        const dataFromSkeletonDB = await RestaurantInfoModel.findOne({ restaurantId: parsedToNumberRestaurantId })
        return dataFromSkeletonDB;

    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message)
    }
}


// Get the rating info of ONE restaurant from REVIEW using its id
export async function getOneRestaurantRatingFromReview(restaurantId: Number) {
    try {
        const ratingDataFromReview = await axios.get<any>(`${config.REVIEW_BE_BASE_URL}/one-restaurant-rating/${restaurantId}`)
        return ratingDataFromReview.data;
    } catch (error) {
        console.error(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)

    }
}

// Get the rating of a GROUP of restaurants from REVIEW by providing an array of id's
export async function getMultipleRestaurantRatingInfoFromReview(restaurantIdArray: number[]) {
    try {
        const res = await axios.post<any>(`${config.REVIEW_FE_BASE_URL}/multiple-restaurant-rating`, restaurantIdArray)
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}

// To send updated order STATUS to marketplace from POS
export async function marketplaceUpdateOrderStatus(token: string, orderId: string, status: string) {
    try {
        await axios.put(`${config.MARKETPLACE_BE_BASE_URL}/order-status/${orderId}`, status, { headers: { 'Authorization': 'Bearer ' + token } })
    } catch (error) {
        console.error(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}


export function getMarketplaceUserInfoUsingToken() {
    return marketplaceTokenInfos
}


export function getCuisineArray(cuisine: string) {
    return cuisinesObj[cuisine]

}





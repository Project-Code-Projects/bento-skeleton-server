import { restaurantRegistration } from './../controllers/skeletonRestaurantRegister.controller';
import axios, { AxiosError } from "axios";
import { IIngredient, IPacking, IRecipe } from "../interfaces/NewOrderInterface";
import config from '../config';

// Extracts Ingredients from an array of Recipes and returns an array of Ingredients
export function extractIngredsFromRecipeArr(recipeArr: IRecipe[]): IIngredient[] {
    let ingredsArr: IIngredient[] = []
    recipeArr.forEach((singleRecipe) => {
        const ingreds = singleRecipe.ingredients
        ingreds.forEach((i) => ingredsArr.push(i))
    });
    return ingredsArr;
}

// Remove duplicate ingredients from an array of ingredients. And increases quantity of ingredient if found duplicate
export function removeDuplicateIngredsAndAddQuantity(ingredsArray: IIngredient[]): IIngredient[] {
    const resultIngredArray: IIngredient[] = [];
    ingredsArray.forEach(ingred => {
        const foundIndex = resultIngredArray.findIndex((el) => el.id === ingred.id)
        if (foundIndex === -1) {
            resultIngredArray.push(ingred)
        }
        else if (foundIndex > -1) {
            resultIngredArray[foundIndex].quantity = resultIngredArray[foundIndex].quantity + ingred.quantity
        }
    });

    return resultIngredArray
}




// Remove duplicate packaging
export function removeDuplicatePackaging(packagingArray: IPacking[]) {
    const resultingArray: IPacking[] = []

    packagingArray.forEach((singlePackaging) => {
        const foundIndex = resultingArray.findIndex((el) => el.id === singlePackaging.id)
        if (foundIndex === -1) {
            resultingArray.push({ ...singlePackaging, quantity: 1 })
        }
        else if (foundIndex != -1 && resultingArray[foundIndex] && resultingArray[foundIndex].quantity) {

            // Talk to Apu regarding this error
            // resultingArray[foundIndex].quantity++

            // Potential Solution
            resultingArray[foundIndex].quantity = (resultingArray[foundIndex].quantity || 1) + 1;

        }
    });

    return resultingArray;
}

export async function sendDataToInventoryToReduce(data: any) {
    try {
        const res = await axios.post<any>(`${config.INVENTORY_BE_BASE_URL}/update-inventory-for-order`, data)
        return res.data
    } catch (error) {
        console.log(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}


export async function sendNewOrderDataToKDS(data: any) {
    try {
        const res = await axios.post<any>(`${config.KDS_BE_BASE_URL}/new-order`, data)
        return res.data
    } catch (error) {
        console.log(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}

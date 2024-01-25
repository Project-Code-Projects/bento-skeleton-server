import { restaurantRegistration } from './../controllers/skeletonRestaurantRegister.controller';
import axios, { AxiosError } from "axios";
import { IIngredient, IOrder, IPacking, IRecipe } from "../interfaces/NewOrderInterface";
import config from '../config';


// Prepare and Restructure Order data for sending to Inventory
export function preparePlusRestructureOrderDataForInventory(fullOrder: IOrder) {

    const itemsArray = fullOrder.items;

    const allItemIngredStorage: IIngredient[] = [];

    const allItemPackagingStorage: IPacking[] = []

    itemsArray?.forEach((orderItem) => {

        allItemPackagingStorage.push(orderItem.item.itemPackingType[0])

        const ingredsInThisItem: IIngredient[] = [...orderItem.item.ingredients.rawIngredients];

        // Deleting the No Ingreds
        if (orderItem.item.chosenOptions && orderItem.item.chosenOptions.no.length > 0) {
            const noIngreds = orderItem.item.chosenOptions?.no;
            noIngreds.forEach(((singleNoIngred) => {
                const foundIndex = ingredsInThisItem.findIndex((i) => i.id === singleNoIngred.id)
                if (foundIndex != -1) {
                    ingredsInThisItem.splice(foundIndex, 1)
                }
            }))
        }

        // Adding the recipe Ingreds
        if (orderItem.item.ingredients.recipes) {
            const ingredsFromReceipes: IIngredient[] = extractIngredsFromRecipeArr(orderItem.item.ingredients.recipes)
            ingredsFromReceipes.forEach((ingred) => ingredsInThisItem.push(ingred))
        }

        // Adding the add option Ingreds
        if (orderItem.item.chosenOptions?.add && orderItem.item.chosenOptions.add.length > 0) {
            const addArr = orderItem.item.chosenOptions.add
            addArr.forEach(ingred => ingredsInThisItem.push(ingred))
        }

        // Removing Duplicate ingreds and adjusting the quantity of ingreds based on how many time one ingredient is present
        const duplicateFreeIngreds = removeDuplicateIngredsAndAddQuantity(ingredsInThisItem);

        // Adding duplicatefree, quantity adjusted ingreds of each item to the allItemIngredStorage
        duplicateFreeIngreds.forEach(ingred => allItemIngredStorage.push(ingred))

    })


    const duplicateFreeAllOrderItemIngreds = removeDuplicateIngredsAndAddQuantity(allItemIngredStorage);

    const duplicatefreePackagingStorage = removeDuplicatePackaging(allItemPackagingStorage)

    const ingredsPropertyNamesFixedArray = duplicateFreeAllOrderItemIngreds.map((ingred) => {
        return {
            id: ingred.id,
            ingredientName: ingred.ingredientName,
            unit: ingred.unitOfStock,
            quantity: ingred.quantity,
            costPerUnit: ingred.costPerUnit,
            caloriePerUnit: ingred.caloriesPerUnit
        }
    })

    const packagingPropertyNamesFixedArray = duplicatefreePackagingStorage.map((packaging) => {
        return {
            id: packaging.id,
            boxName: packaging.boxName,
            quantity: packaging.quantity,
            costPerUnit: packaging.costPerUnit

        }
    })

    // Data I will be sending to Inventory
    const dataForInventory = {
        restaurantId: fullOrder.restaurantId,
        orderId: fullOrder._id,
        orderType: fullOrder.type,
        ingredientsToReduce: ingredsPropertyNamesFixedArray,
        deliveryBoxesToReduce: packagingPropertyNamesFixedArray
    }

    return dataForInventory
}


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
        else {
            const item = resultingArray[foundIndex];
            if (foundIndex != -1 && item && item.quantity) {
                item.quantity++;
            }
        }
    });

    return resultingArray;
}

// Sending data to Inventory
export async function sendDataToInventoryToReduce(data: any, token: string) {
    try {
        await axios.post<any>(`${config.INVENTORY_BE_BASE_URL}/v1/consumptionLog/restaurant/${data.restaurantId}/deduct`, data, { headers: { 'Authorization': 'Bearer ' + token } })

    } catch (error) {
        console.log(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message)
    }
}


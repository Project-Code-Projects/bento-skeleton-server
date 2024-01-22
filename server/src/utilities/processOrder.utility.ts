import { IIngredient, IRecipe } from "../interfaces/NewOrderInterface";

// Extracts Ingredients from an array of Recipes and returns an array of Ingredients
export function extractIngredsFromRecipeArr(recipeArr: IRecipe[]): IIngredient[] {
    let ingredsArr: IIngredient[] = []
    recipeArr.forEach((singleRecipe) => {
        const ingreds = singleRecipe.ingredients
        ingreds.forEach((i) => ingredsArr.push(i))
    });
    return ingredsArr;
}

// Removed duplicate ingredients from an array of ingredients. And increases quantity of ingredient if found duplicate
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
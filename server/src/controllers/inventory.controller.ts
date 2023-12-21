import { Request, Response } from "express";
import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import { IngredientInterface } from "../interfaces/ingredientInterface";
import { AuthRequestInterface } from "../middlewares/jwtVerify.middleware";
dotenv.config();

/* 
*   This API call will be coming from Menu Builder to get all the  ingredients of that Restaurant from the  Inventory.

*   Send get req to inventory. Get a response
*   send the response to Menu Builder


*/
async function getIngredientsFromInventory(req: AuthRequestInterface, res: Response) {
  try {
    const apiUrl = `/v1/ingredient/restaurant/${req.user?.restaurantId}`;
    const response: AxiosResponse<IngredientInterface[]> = await axios.get<IngredientInterface[]>(apiUrl);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from Inventory" });
  }
}

const inventoryController = {
  getIngredientsFromInventory,
};

export default inventoryController;

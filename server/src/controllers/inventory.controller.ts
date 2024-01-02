import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { IngredientResultInterface } from "../interfaces/IngredientInterface";
import { JwtVerifiedReqInterface } from "../interfaces/JwtVerifiedReqInterface";

/* 
*   This API call will be coming from Menu Builder to get all the  ingredients of that Restaurant from the  Inventory.

*   Send get req to inventory. Get a response.
*   send the response to Menu Builder.


*/
async function getIngredientsFromInventory(req: JwtVerifiedReqInterface, res: Response) {
  try {
    const apiUrl = `/v1/ingredient/restaurant/${req.user?.restaurantId}`;
    const response: AxiosResponse<IngredientResultInterface> = await axios.get<IngredientResultInterface>(apiUrl);
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

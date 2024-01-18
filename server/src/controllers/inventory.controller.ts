import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { IngredientResultInterface } from "../interfaces/IngredientInterface";
import config from "../config";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";

/* 
*   This API call will be coming from Menu Builder to get all the  ingredients of that Restaurant from the  Inventory.

*   Send get req to inventory. Get a response.
*   send the response to Menu Builder.


*/
async function getIngredientsFromInventory(req: JwtReqInterface, res: Response) {
  try {
    if (req.user?.id) {
      const apiUrl = config.INVENTORY_BE_BASE_URL + `/v1/ingredient/restaurant/${req.user.restaurantId}`;
      const response: AxiosResponse<IngredientResultInterface> = await axios.get<IngredientResultInterface>(apiUrl);
      res.send(response.data);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from Inventory" });
  }
}

const inventoryController = {
  getIngredientsFromInventory,
};

export default inventoryController;

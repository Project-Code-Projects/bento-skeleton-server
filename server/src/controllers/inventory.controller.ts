import { Response } from "express";
import { IngredientResultInterface } from "../interfaces/IngredientInterface";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { getDeliveryBoxInfo, getInventoryDataOfARestaurantFromInventory } from "../utilities/inventory.utility";


//   This API call will be coming from Menu Builder to get all the  ingredients of that Restaurant from the  Inventory.
async function getIngredientsFromInventory(req: JwtReqInterface, res: Response) {
  try {
    if (req.user?.id) {
      const restaurantId = parseInt(req.params.restaurantId)
      const allIngredientOfARestaurant = await getInventoryDataOfARestaurantFromInventory(restaurantId, req.user.token)
      res.send(allIngredientOfARestaurant);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ((error as Error).message) })
  }
}

async function getDeliveryBoxInfoFromInventory(req: JwtReqInterface, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    const restaurantId = parseInt(req.params.restaurantId)
    const allBoxInfo = await getDeliveryBoxInfo(restaurantId, req.user.token)
    res.status(200).send(allBoxInfo)

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message })
  }
}


const inventoryController = {
  getIngredientsFromInventory,
  getDeliveryBoxInfoFromInventory
};

export default inventoryController;

import { Response } from "express";
import { IngredientInterface, OrderInterface } from "../interfaces/OrderInterface";
import axios from "axios";
import config from "../config";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { IIngredient, IOrder } from "../interfaces/NewOrderInterface";
import { extractIngredsFromRecipeArr, removeDuplicateIngredsAndAddQuantity } from "../utilities/processOrder.utility";

// 1. Send needed data to kitchen
// 2. Extract and send data to reduce ingredients data to inventory
const processOrder = async (req: JwtReqInterface, res: Response) => {
  try {
    if (req.user) {
      const order: OrderInterface = req.body;
      const itemsArray = order.items;

      let finalIngredArr: IngredientInterface[] = [];

      for (let item of itemsArray) {
        const ingredientsArr = item.ingredients;
        const noArray = item.options.no;
        const addArray = item.options.add;

        let allowedIngredsWithAddons: IngredientInterface[] = [];

        // Minusing the noIngreds from the ingredientsArr
        ingredientsArr.forEach((ingred) => {
          const found = noArray.find((noIngred) => noIngred.ingredient.id === ingred.id);
          if (!found) {
            allowedIngredsWithAddons.push(ingred);
          }
        });

        // Doubling or Adding the addons
        addArray.forEach((addIngred) => {
          const matchingObjindex = allowedIngredsWithAddons.findIndex((ingred) => addIngred.ingredient.id === ingred.id);
          if (matchingObjindex !== -1) {
            allowedIngredsWithAddons[matchingObjindex].quantity *= 2;
          } else {
            allowedIngredsWithAddons.push(addIngred.ingredient);
          }
        });

        if (item.itemQuantity > 1) {
          allowedIngredsWithAddons.forEach((ingred) => (ingred.quantity *= item.itemQuantity));
        }

        finalIngredArr = [...finalIngredArr, ...allowedIngredsWithAddons];
      }

      const idArray = finalIngredArr.map((ingred) => ingred.id);
      const noDuplicateIdArr: number[] = [];

      idArray.forEach((id) => {
        if (!noDuplicateIdArr.includes(id)) {
          noDuplicateIdArr.push(id);
        }
      });

      // This is an array of objects where ingredient objects will stay. No duplicates. Quantity adjusted.
      let finalArrayForInventoryUpdate: IngredientInterface[] = [];

      for (let id of noDuplicateIdArr) {
        finalIngredArr.forEach((ingred) => {
          if (ingred.id == id) {
            const foundIndex = finalArrayForInventoryUpdate.findIndex((el) => el.id == id);
            if (foundIndex == -1) {
              finalArrayForInventoryUpdate.push(ingred);
            } else {
              finalArrayForInventoryUpdate[foundIndex].quantity += ingred.quantity;
            }
          }
        });
      }

      const infoForInventoryForOrderProcessing = {
        restaurantId: order.restaurantId,
        orderId: order.orderId,
        categories: order.categories,
        orderType: order.orderType, //inhouse or marketplace
        // PACKAGING ADD KORTE HOBE
        ingredientsToReduce: finalArrayForInventoryUpdate,
      };

      const kdsRes = await axios.post(`${config.KDS_BE_BASE_URL}/process-order-kitchen/${req.user.restaurantId}`, order);
      if (kdsRes.status == 201) {
        const inventoryRes = await axios.post(`${config.INVENTORY_BE_BASE_URL}/update-inventory-for-order`, infoForInventoryForOrderProcessing);
        if (inventoryRes.status == 201) {
          res.status(201).json({ message: "Sent order to Inventory and KDS for processing" });
        }
      }

      res.send(infoForInventoryForOrderProcessing);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
};

const sendOrderToKDS = async (req: JwtReqInterface, res: Response) => {
  try {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized.' });
    const { order } = req.body;

    await axios.post(config.KDS_BE_BASE_URL + '/orders/create', order, { headers: { 'Authorization': 'Bearer ' + req.user.token } });
    res.status(201).send({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
};




export async function newProcessOrder(req: JwtReqInterface, res: Response) {

  const orderFromBody: IOrder = req.body;
  const itemsArray = orderFromBody.items;

  const allItemIngredStorage: IIngredient[] = [];

  itemsArray?.forEach((orderItem) => {

    const ingredsInThisItem: IIngredient[] = [...orderItem.item.ingredients.rawIngredients];

    // Deleting the No Ingreds
    if (orderItem.item.chosenOptions && orderItem.item.chosenOptions.no.length > 0) {
      const noIngreds = orderItem.item.chosenOptions?.no;
      noIngreds.forEach(((singleNoIngred) => {
        const foundIndex = ingredsInThisItem.findIndex((i) => i.id === singleNoIngred.id)
        ingredsInThisItem.splice(foundIndex, 1)
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


  const duplicateFreeAllOrderItemIngreds = removeDuplicateIngredsAndAddQuantity(allItemIngredStorage)


}






























const processOrderController = {
  processOrder,
  sendOrderToKDS,
  newProcessOrder
};

export default processOrderController;

import { Response } from "express";
import { JwtVerifiedReqInterface } from "../interfaces/JwtVerifiedReqInterface";
import { OrderInterface } from "../interfaces/OrderInterface";

// 1. Send needed data to kitchen
// 2. Extract and send to reduce ingredients data to inventory
const processOrder = async (req: JwtVerifiedReqInterface, res: Response) => {
  try {
    const order: OrderInterface = req.body;
    const itemsArray = order.items;

    let finalObj = {};

    for (let item of itemsArray) {
      const ingredientsArr = item.ingredients;
      const noArray = item.options.no;
      const addArray = item.options.add;

      let allowedIngreds = [];

      // Minusing the noIngreds from the ingredientsArr
      for (let noIngred of noArray) {
        for (let ingred of ingredientsArr) {
          if (noIngred.ingredient.id == ingred.id) {
            continue;
          } else {
            allowedIngreds.push(ingred);
          }
        }
      }

      for (let addIngred of addArray) {
        for (let ingred of allowedIngreds) {
          if (ingred.id == addIngred.ingredient.id) {
            ingred.quantity = ingred.quantity * 2;
          } else {
          }
        }
      }
    }
  } catch (error) {
    res.json({ message: "Error Processing Order" });
    console.log(error);
  }
};

const processOrderController = {
  processOrder,
};

export default processOrderController;

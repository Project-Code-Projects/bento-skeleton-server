import { Response } from "express";
import { getOrderInfoUsingOrderId, posGetAllOrders, posUpdateOrderChef, posUpdateOrderStatus } from "../utilities/pos.utility";
import { kdsPostIncomingOrder } from "../utilities/kds.utility";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { IOrder } from "../interfaces/NewOrderInterface";
import { preparePlusRestructureOrderDataForInventory, sendDataToInventoryToReduce } from "../utilities/processOrder.utility";
import { marketplaceUpdateOrderStatus } from "../utilities/marketplace.utility";

export async function getAllOrders(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const orders = await posGetAllOrders(user.token);
    res.send(orders);
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    res.status(500).send({ message: (error as Error).message });
  }
}


export async function updateOrderStatus(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { status, type } = req.body;
    if (typeof status !== 'string' && typeof type !== 'string') return res.status(400).send({ message: 'Invalid data.' });

    // If the order is a POS Order
    if (type.toLowerCase().includes("in-house")) {

      if (status === 'preparing') { // Sending data to Inventory
        const fullOrder: IOrder = await getOrderInfoUsingOrderId(orderId, user.token)
        if (fullOrder.status === 'pending') {
          const restructuredOrderDataForInventory = preparePlusRestructureOrderDataForInventory(fullOrder)
          // console.log('restructuredOrderDataForInventory', restructuredOrderDataForInventory);
          const inventoryResponse = await sendDataToInventoryToReduce(restructuredOrderDataForInventory, user.token);
        }
      }


      await posUpdateOrderStatus(user.token, orderId, status);
      return res.json({ message: 'Successfully updated' });
    }

    // If the order is a Marketplace Order
    else if (type.toLowerCase().includes("pickup") || type.toLowerCase().includes("pickup")) {
      await marketplaceUpdateOrderStatus(user.token, orderId, status)
      return res.json({ message: 'Successfully updated' })
    }


  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    res.status(500).send({ message: (error as Error).message });
  }
}

// 1. Send New Order To KDS To Process Order
export async function incomingOrder(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;

    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const order: IOrder = req.body.order;

    let result;

    if (order.type == "in-house") {
      result = await kdsPostIncomingOrder(user.token, order);
    }
    else if (order.type === "pickup" || order.type === "delivery") {
      const restructuredOrderDataForInventory = preparePlusRestructureOrderDataForInventory(order)
      result = await sendDataToInventoryToReduce(restructuredOrderDataForInventory, user.token);
    }
    else {
      console.log('Else Block ----------------------------------------');
    }

    res.status(201).send({ message: 'Success', data: result });

  } catch (error) {
    // console.log('😭😭😭😭😭😭😭😭😭😭' , error);
    res.status(500).send({ message: (error as Error).message });
  }
}


export async function updateOrderChef(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { chef } = req.body;
    if (typeof orderId !== 'string') return res.status(400).send({ message: 'Invalid data.' });

    const updatedOrder = await posUpdateOrderChef(user.token, orderId, chef);
    res.send(updatedOrder);
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    res.status(500).send({ message: (error as Error).message });
  }
}
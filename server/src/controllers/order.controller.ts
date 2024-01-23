import { Response } from "express";
import { getOrderInfoUsingOrderId, posGetAllOrders, posUpdateOrderChef, posUpdateOrderStatus } from "../utilities/pos.utility";
import { kdsPostIncomingOrder } from "../utilities/kds.utility";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { IOrder } from "../interfaces/NewOrderInterface";
import { preparePlusRestructureOrderDataForInventory, sendDataToInventoryToReduce } from "../utilities/processOrder.utility";

export async function getAllOrders(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const orders = await posGetAllOrders(user.token);
    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}


export async function updateOrderStatus(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { status } = req.body;
    if (typeof orderId !== 'string' && typeof status !== 'string') return res.status(400).send({ message: 'Invalid data.' });
    if (status === 'preparing') {
      const fullOrder: IOrder = await getOrderInfoUsingOrderId(orderId)
      if (fullOrder.status === 'pending') {
        const restructuredOrderDataForInventory = preparePlusRestructureOrderDataForInventory(fullOrder)
        const inventoryResponse = await sendDataToInventoryToReduce(restructuredOrderDataForInventory);
      }

    }
    const updatedOrder = await posUpdateOrderStatus(user.token, orderId, status);
    res.send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

// 1. Send New Order To KDS To Process Order
export async function incomingOrder(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const order: IOrder = req.body;

    await kdsPostIncomingOrder(user.token, order);

    res.send({ message: 'Success' });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}
import { Response } from "express";
import { JwtVerifiedReqInterface } from "../interfaces/JwtVerifiedReqInterface";
import { posGetAllOrders, posUpdateOrderChef, posUpdateOrderStatus } from "../utilities/pos.utility";
import { kdsPostIncomingOrder } from "../utilities/kds.utility";

export async function getAllOrders (req: JwtVerifiedReqInterface, res: Response) {
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


export async function updateOrderStatus (req: JwtVerifiedReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { status } = req.body;
    if (typeof orderId !== 'string' && typeof status !== 'string') return res.status(400).send({ message: 'Invalid data.' });

    const updatedOrder = await posUpdateOrderStatus(user.token, orderId, status);
    res.send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}


export async function incomingOrder (req: JwtVerifiedReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const order = req.body;

    await kdsPostIncomingOrder(user.token, order);
    res.send({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}


export async function updateOrderChef (req: JwtVerifiedReqInterface, res: Response) {
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
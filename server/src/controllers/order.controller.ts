import { Response } from "express";
import { JwtVerifiedReqInterface } from "../interfaces/JwtVerifiedReqInterface";
import { posGetAllOrders } from "../utilities/pos.utility";

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
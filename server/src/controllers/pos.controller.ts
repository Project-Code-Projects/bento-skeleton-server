import { Request, Response } from "express";
import { getOrderInfoUsingOrderId } from "../utilities/pos.utility";

const getOrderInfo = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;
        const result = await getOrderInfoUsingOrderId(orderId);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: (error as Error).message });
    }
}

let posController = { getOrderInfo }

export default posController;
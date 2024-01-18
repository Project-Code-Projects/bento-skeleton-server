import { Response } from "express";
import axios from "axios";
import config from "../config";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";

const sendOrderStatusFromKDS = async (req: JwtReqInterface, res: Response) => {
  try {
    if (req.user?.id) {
      const orderStatusObj = req.body;
      const { orderType } = orderStatusObj;
      if (orderType.toLowerCase().includes("in-house")) {
        const response = await axios.post(`${config.POS_BE_BASE_URL}/order-status`, orderStatusObj);
      } else if (orderType.toLowerCase().includes("marketplace")) {
        const response = await axios.post(`${config.MARKETPLACE_BE_BASE_URL}/order-status`, orderStatusObj);
      }
      res.status(200).json({ message: "order status notification sent" });
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error while sending data to POS/Marketplace" });
  }
};

export default sendOrderStatusFromKDS;

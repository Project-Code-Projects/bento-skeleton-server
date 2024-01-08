import { Response } from "express";
import { JwtVerifiedReqInterface } from "../interfaces/JwtVerifiedReqInterface";
import axios from "axios";
import config from "../config";

const sendOrderStatusFromKDS = async (req: JwtVerifiedReqInterface, res: Response) => {
  try {
    if (req.user) {
      const orderStatusObj = req.body;
      const { orderType } = orderStatusObj;
      if (orderType.toLowerCase().includes("inhouse")) {
        const response = await axios.post(`${config.POS_SERVER_URL}/order-status`, orderStatusObj);
      } else if (orderType.toLowerCase().includes("marketplace")) {
        const response = await axios.post(`${config.MARKETPLACE_SERVER_URL}/order-status`, orderStatusObj);
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

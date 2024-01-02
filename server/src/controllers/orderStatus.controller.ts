import { Response } from "express";
import { JwtVerifiedReqInterface } from "../interfaces/JwtVerifiedReqInterface";
import axios from "axios";

const sendOrderStatusFromKDS = async (req: JwtVerifiedReqInterface, res: Response) => {
  try {
    const orderStatusObj = req.body;
    const { orderType } = orderStatusObj;
    if (orderType.toLowerCase().includes("inhouse")) {
      const response = await axios.post(`${process.env.POS_BASE_URL}/order-status`, orderStatusObj);
    } else if (orderType.toLowerCase().includes("marketplace")) {
      const response = await axios.post(`${process.env.MARKETPLACE_BASE_URL}/order-status`, orderStatusObj);
    }
    res.status(200).json({ message: "order status notification sent" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error while sending data to POS/Marketplace" });
  }
};

export default sendOrderStatusFromKDS;

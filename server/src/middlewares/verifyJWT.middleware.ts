import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import config from "../config";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";

const verifyJWTMiddleware = (req: JwtReqInterface, res: Response, next: NextFunction) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.status(401).send({ message: "Unauthorized" });
  const token = authHeaders.split(" ")[1];
  const data = jwt.verify(token, config.JWT_SECRET) as { id: number; service: string; restaurantId: number };
  if (data) {
    const user = {
      id: data.id,
      service: data.service,
      restaurantId: data.restaurantId,
      token
    }
    req.user = user;
    next();
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default verifyJWTMiddleware;

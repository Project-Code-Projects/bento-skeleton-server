import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

export interface userJWTPayloadInterface {
  id: number;
  restaurantId: number;
  service: string;
}
export interface AuthRequestInterface extends Request {
  user?: userJWTPayloadInterface;
}

const verifyJWTMiddleware = (req: AuthRequestInterface, res: Response, next: NextFunction) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.status(401).send({ message: "Unauthorized" });
  const token = authHeaders.split(" ")[1];

  const payloadData = jwt.verify(token, config.JWT_SECRET) as userJWTPayloadInterface;
  if (payloadData.id && payloadData.restaurantId && payloadData.service) {
    req.user = payloadData;
    next();
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default verifyJWTMiddleware;

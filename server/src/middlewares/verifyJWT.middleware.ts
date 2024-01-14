import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

export interface userJWTPayloadInterface {
  id: number;
  restaurantId: number;
  service: string;
}

export interface AuthRequestInterface extends Request {
  id?: number;
  service?: string;
  restaurantId?: number;
  token?: string;
}

const verifyJWTMiddleware = (req: AuthRequestInterface, res: Response, next: NextFunction) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.status(401).send({ message: "Unauthorized" });
  const token = authHeaders.split(" ")[1];

  const data = jwt.verify(token, config.JWT_SECRET) as { id?: number; service?: string; restaurantId?: number };

  if (data.id && data.service) {
    req.id = data.id;
    req.service = data.service;
    req.restaurantId = data.restaurantId;
    req.token = token;
    next();
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default verifyJWTMiddleware;

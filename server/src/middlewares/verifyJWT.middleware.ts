import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";

const verifyJWTMiddleware = (req: JwtReqInterface, res: Response, next: NextFunction) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.status(401).send({ message: "Unauthorized" });
  const token = authHeaders.split(" ")[1];

  const data = jwt.verify(token, config.JWT_SECRET) as
    { id?: number; service?: string; restaurantId?: number };

  if (data.id && data.service && data.restaurantId) {
    req.id = data.id;
    req.service = data.service;
    req.restaurantId = data.restaurantId;
    next();
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default verifyJWTMiddleware;

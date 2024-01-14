import { Request } from "express";

export interface JwtVerifiedReqInterface extends Request {
  id?: number;
  restaurantId?: number;
  service?: string;
  token?: string;
}

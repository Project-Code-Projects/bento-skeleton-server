import { Request } from "express";

export interface JwtReqInterface extends Request {
  id?: number;
  restaurantId?: number;
  service?: string;
}

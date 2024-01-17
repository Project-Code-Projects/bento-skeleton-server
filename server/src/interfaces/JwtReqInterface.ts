import { Request } from "express";

export interface JwtReqInterface extends Request {
  user?: {
    id: number;
    restaurantId?: number;
    service: string;
    token: string;
  }
}

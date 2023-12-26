import { Request } from "express";

export interface JwtVerifiedReqInterface extends Request {
  user: {
    id: number;
    restaurantId: number;
    service: string;
  };
}

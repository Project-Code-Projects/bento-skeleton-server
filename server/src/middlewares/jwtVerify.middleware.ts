import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utilities/auth.utility";

export interface userJWTPayloadInterface {
  userId: string | number;
  restaurantId: string | number;
  role: string;
}

export interface AuthRequestInterface extends Request {
  user?: userJWTPayloadInterface;
}

const verifyJWTMiddleware = (req: AuthRequestInterface, res: Response, next: NextFunction) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    res.status(401);
    res.json({ message: "Your are not Authorized" });
    return;
  }
  try {
    const user = verifyToken(token) as userJWTPayloadInterface;
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: "Your are not Authorized" });
  }
};

export default verifyJWTMiddleware;

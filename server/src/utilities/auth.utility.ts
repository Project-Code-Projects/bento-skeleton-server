import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as Secret);
};

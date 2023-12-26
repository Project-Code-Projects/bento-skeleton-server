import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validateLoginData } from "../utilities/validateLoginData.utility";
import { hrLogin, hrServiceCheck } from "../utilities/hr.utility";
import config from "../config";
import { AuthRequestInterface, userJWTPayloadInterface } from "../middlewares/jwtVerify.middleware";

export async function checkServiceAccess(req: AuthRequestInterface, res: Response) {
  try {
    const id = req.user?.id;
    // const restaurantId = req.user?.restaurantId;
    const service = req.user?.service;

    if (id && service) {
      const check = await hrServiceCheck({ userId: id, service });
      if (check.auth) {
        res.send({ auth: true });
      } else {
        res.status(403).send({ auth: false });
      }
    } else {
      res.status(403).send({ auth: false });
    }
  } catch (error) {
    throw error;
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password, service } = req.body;
    if (validateLoginData({ email, password, service })) {
      const { user } = await hrLogin({ email, password, service });

      const token = jwt.sign({ id: user.id, restaurantId: user.restaurantId, service }, config.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.setHeader("Authorization", "Bearer " + token);
      res.send({ staus: "success", user });
    } else {
      res.status(400).send({ message: "Invalid data." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

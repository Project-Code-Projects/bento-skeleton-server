import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validateLoginData } from "../utilities/validateLoginData.utility";
import { hrLogin, hrServiceCheck, hrServiceList } from "../utilities/hr.utility";
import config from "../config";
import { JwtVerifiedReqInterface } from "../interfaces/JwtVerifiedReqInterface";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (validateLoginData({ email, password })) {
      const { employee } = await hrLogin({ email, password });
      const user = employee;

      const token = jwt.sign({ id: user.id, service: "skeleton", restaurantId: user.restaurantId }, config.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.setHeader("Authorization", "Bearer " + token);
      res.send({ status: "success", user });
    } else {
      res.status(400).send({ message: "Invalid data." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

// Gets the accessible-silo array
export async function getServices(req: JwtVerifiedReqInterface, res: Response) {
  try {
    const { user } = req;
    if (user) {
      const data = await hrServiceList(user.id);
      res.send(data);
    } else res.status(403).send({ auth: false });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function checkServiceAccess(req: JwtVerifiedReqInterface, res: Response) {
  try {
    const user = req.user;

    if (user) {
      const check = await hrServiceCheck({ userId: user.id, service: user.service });
      if (check.auth) {
        res.send({ auth: true });
      } else {
        res.status(403).send({ auth: false });
      }
    } else {
      res.status(403).send({ auth: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

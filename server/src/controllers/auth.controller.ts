import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validateLoginData } from "../utilities/validateLoginData.utility";
import { hrLogin, hrServiceCheck, hrServiceList } from "../utilities/hr.utility";
import config from "../config";
import { AuthRequestInterface } from "../middlewares/verifyJWT.middleware";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (validateLoginData({ email, password })) {
      const { user } = await hrLogin({ email, password });

      const token = jwt.sign({ id: user.id, service: "skeleton" }, config.JWT_SECRET, {
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
export async function getServices(req: AuthRequestInterface, res: Response) {
  try {
    const { id } = req;
    if (id) {
      const data = await hrServiceList(id);
      res.send(data);
    } else res.status(403).send({ auth: false });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function checkServiceAccess(req: AuthRequestInterface, res: Response) {
  try {
    const id = req.id;
    // const restaurantId = req.user?.restaurantId;
    const service = req.service;

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
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

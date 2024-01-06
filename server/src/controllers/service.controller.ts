import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { AuthRequestInterface } from "../middlewares/verifyJWT.middleware";
import config from "../config";
import { getRedirectUrlForService, validateService } from "../utilities/service.utility";
import { hrServiceCheck } from "../utilities/hr.utility";
import { createServiceTokenStore, findServiceTokenStore } from "../models/serviceTokenStore.query";

export async function redirectToService(req: AuthRequestInterface, res: Response) {
  try {
    const id = req.id;
    const service = req.params.service;

    if (id && validateService(service)) {
      const checkAccess = await hrServiceCheck({ userId: id, service });
      if (checkAccess.auth) {
        const token = jwt.sign({ id, service }, config.JWT_SECRET, {
          expiresIn: "7d",
        });

        const store = await createServiceTokenStore(token);
        const url = getRedirectUrlForService(service, store._id.toString());

        res.send({ status: "success", redirect: url });
      } else res.status(403).send({ message: "User does not have access to this service." });
    } else res.status(400).send({ message: "Invalid service." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function getTokenFromStore(req: Request, res: Response) {
  try {
    const code = req.params.code;
    const tokenStore = await findServiceTokenStore(code);
    if (tokenStore) {
      res.setHeader("Authorization", "Bearer " + tokenStore.token);
      res.send({ status: "success", auth: true });
    } else res.status(401).send({ status: "fail", auth: false });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

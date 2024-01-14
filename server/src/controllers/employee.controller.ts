import { Response } from "express";
import { JwtVerifiedReqInterface } from "../interfaces/JwtVerifiedReqInterface";
import { chefCheckIn, chefCheckOut } from "../utilities/kds.utility";

export const employeeCheckIn = async (req: JwtVerifiedReqInterface, res: Response) => {
  try {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized.' });
    

    // Implement functionality to send checked in user to HR

    // Send checked in user to KDS
    await chefCheckIn(req.user.token);

    res.send({ status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
};


export const employeeCheckOut = async (req: JwtVerifiedReqInterface, res: Response) => {
  try {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized.' });
    

    // Implement functionality to send checked out user to HR

    // Send checked out user to KDS
    await chefCheckOut(req.user.token);

    res.send({ status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
};
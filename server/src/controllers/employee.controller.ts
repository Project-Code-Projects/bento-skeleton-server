import { Response } from "express";
import { chefCheckIn, chefCheckOut } from "../utilities/kds.utility";
import { hrActiveChefs, hrActiveWaiters, sendCheckInInfoToHr, sendCheckOutInfoToHr } from "../utilities/hr.utility";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";

export const employeeCheckIn = async (req: JwtReqInterface, res: Response) => {
  try {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized.' });
    const userData: { employeeId: number, position: string } = req.body
    if (req.user.restaurantId) {
      const hrRes = await sendCheckInInfoToHr(userData.employeeId, req.user.restaurantId)
      if (userData.position.toLowerCase() == 'chef') {
        await chefCheckIn(req.user.token);
      }
      res.status(201).send(hrRes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: (error as Error).message });
  }
};


export const employeeCheckOut = async (req: JwtReqInterface, res: Response) => {
  try {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized.' });
    const userData: { employeeId: number, attendanceId: number, position: string } = req.body
    if (req.user.restaurantId) {
      const hrRes = await sendCheckOutInfoToHr(userData)
      if (userData.position.toLowerCase() == 'chef') {
        await chefCheckOut(req.user.token);
      }
      res.send({ status: "Success", data: hrRes });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: (error as Error).message });
  }
};


export const getActiveChefs = async (req: JwtReqInterface, res: Response) => {
  try {
    if (!req.user || !req.user.restaurantId) return res.status(401).send({ message: 'Unauthorized.' });
    const response = await hrActiveChefs(req.user.restaurantId, req.user.token);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: (error as Error).message });
  }
};


export const getActiveWaiters = async (req: JwtReqInterface, res: Response) => {
  try {
    if (!req.user || !req.user.restaurantId) return res.status(401).send({ message: 'Unauthorized.' });
    const response = await hrActiveWaiters(req.user.restaurantId, req.user.token);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: (error as Error).message });
  }
};


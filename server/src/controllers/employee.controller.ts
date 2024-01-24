import { Response } from "express";
import { chefCheckIn, chefCheckOut } from "../utilities/kds.utility";
import { getIsCheckInDataFromHR, hrActiveChefs, hrActiveWaiters, sendCheckInInfoToHr, sendCheckOutInfoToHr } from "../utilities/hr.utility";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";

export const employeeCheckIn = async (req: JwtReqInterface, res: Response) => {
  try {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized.' });

    const userData: {
      employeeId: number, checkInTime: Date
    } = req.body

    if (req.user.restaurantId) {
      // Implement functionality to send checked in user to HR
      const hrRes = await sendCheckInInfoToHr(userData, req.user.restaurantId)

      // Send checked in user to KDS
      await chefCheckIn(req.user.token);  // WHY IS THIS HAPPENING HERE ????

      res.status(201).send({ status: "Success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
};


export const employeeCheckOut = async (req: JwtReqInterface, res: Response) => {
  try {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized.' });

    // Implement functionality to send checked out user to HR
    const userData: {
      employeeId: number, checkInTime: Date
    } = req.body

    if (req.user.restaurantId) {
      const hrRes = await sendCheckOutInfoToHr(userData, req.user.restaurantId)

      // Send checked out user to KDS
      await chefCheckOut(req.user.token); // WHY IS THIS HAPPENING HERE ????

      res.send({ status: "Success" });

    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
};


export const getActiveChefs = async (req: JwtReqInterface, res: Response) => {
  try {
    if (!req.user || !req.user.restaurantId) return res.status(401).send({ message: 'Unauthorized.' });
    const response = await hrActiveChefs(req.user.restaurantId, req.user.token);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
};


export const getActiveWaiters = async (req: JwtReqInterface, res: Response) => {
  try {
    if (!req.user || !req.user.restaurantId) return res.status(401).send({ message: 'Unauthorized.' });
    const response = await hrActiveWaiters(req.user.restaurantId, req.user.token);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
};

// Get the Data from HR about if an employee is currently checked in or not
export async function checkIfEmployeeCheckedIn(req: JwtReqInterface, res: Response) {
  try {
    if (!req.user) return res.status(501).json({ message: 'Unauthorized' })
    const result = await getIsCheckInDataFromHR(req.user?.id, req.user?.token)
    return res.status(200).send(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message })
  }
}
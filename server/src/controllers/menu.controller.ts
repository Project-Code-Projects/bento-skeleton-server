import { Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { getMenuCatagories, getMenuWithRestaurantId } from "../utilities/menu.utility";
import { Jwt } from "jsonwebtoken";

// POS --> MENU
const getOneRestaurantMenu = async (req: JwtReqInterface, res: Response) => {
    try {
        if (req.user?.restaurantId) {
            console.log('from controller', req.user.restaurantId);
            const menuData = await getMenuWithRestaurantId(req.user?.restaurantId)
            res.status(200).send(menuData)
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error " });

    }
}

const getAllMenuCatagories = async (req: JwtReqInterface, res: Response) => {
    try {
        if (req.user?.restaurantId) {
            const catagoryData = await getMenuCatagories(req.user.restaurantId)
            res.status(200).send(catagoryData);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error " });
    }
}

let menuController = { getOneRestaurantMenu, getAllMenuCatagories }
export default menuController;
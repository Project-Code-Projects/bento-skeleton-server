import { Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { getMenuWithRestaurantId } from "../utilities/menu.utility";

// POS --> MENU
const getOneRestaurantMenu = async (req: JwtReqInterface, res: Response) => {
    try {
        if (req.user?.restaurantId) {
            const menuData = await getMenuWithRestaurantId(req.user?.restaurantId)
            res.status(200).send(menuData)
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error " });

    }
}

let menuController = { getOneRestaurantMenu }
export default menuController;
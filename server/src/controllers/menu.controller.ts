import { Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { getMenuCatagories, getMenuItemDetails, getMenuWithRestaurantId } from "../utilities/menu.utility";
import { Jwt } from "jsonwebtoken";

//  + Marketplace --> MENU 
const getOneRestaurantMenu = async (req: JwtReqInterface, res: Response) => {
    try {
        if (req.user) {
            const restaurantId = parseInt(req.params.restaurantId) // Not using anymore since menu getting the restaurantId from token
            const menuData = await getMenuWithRestaurantId(req.user.token)
            res.status(200).send(menuData)
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error " });

    }
}
































const getAllMenuCatagories = async (req: JwtReqInterface, res: Response) => {
    try {
        if (req.user) {
            const restaurantId = parseInt(req.params.restaurantId)
            const catagoryData = await getMenuCatagories(restaurantId, req.user.token)
            res.status(200).send(catagoryData);
        }
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).json({ error: "Internal Server Error " });
    }
}

// Get one menu-item's details using the item-id
export async function menuItemDetails(req: JwtReqInterface, res: Response) {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" })
        const menuItemId = req.params.itemId;
        const result = await getMenuItemDetails(menuItemId, req.user.token)
        res.status(200).send(result)
    } catch (error) {
        console.log('😭😭😭😭😭😭😭😭😭😭', error);
        res.status(500).json({ message: (error as Error).message })
    }
}


let menuController = { getOneRestaurantMenu, getAllMenuCatagories, menuItemDetails }
export default menuController;
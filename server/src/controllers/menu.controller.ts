import { Response } from "express";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { getMenuCatagories, getMenuItemDetails, getMenuWithRestaurantId, getMenuFromToken } from "../utilities/menu.utility";
import { Jwt } from "jsonwebtoken";

//  + Marketplace --> MENU 
const getOneRestaurantMenu = async (req: JwtReqInterface, res: Response) => {
    try {
        if (req.user) {

            if (req.user.restaurantId === 0) {
                const restaurantId = req.params.restaurantId
                const data = await getMenuWithRestaurantId(restaurantId, req.user.token);
                const filteredMenuData = data.filter((i: any) => i.item.availableInMarketPlace === true || i.item.availableInMarketPlace === undefined)
                res.status(200).send(filteredMenuData)
            } else {
                const menuData = await getMenuFromToken(req.user.token)
                const filteredMenuData = menuData.filter((i: any) => i.item.availableInPos === true || i.item.availableInPos === undefined)
                res.status(200).send(filteredMenuData)
            }
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
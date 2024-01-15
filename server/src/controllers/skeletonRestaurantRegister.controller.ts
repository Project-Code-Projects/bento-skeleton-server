import { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary';
console.log(cloudinary.config().cloud_name);

export const restaurantRegistration = async (req: Request, res: Response) => {
    try {
        let { restaurantRep, restaurantInfo } = req.body
        let imgBase64 = restaurantInfo.restaurantLogo
        cloudinary.uploader.upload(imgBase64)
            .then((result) => {
                let url = result.url

                res.json({ 'url': url })
            })
            .catch((error) => {
                console.error('upload error', error)
                res.status(500).json({ error: 'Internal Server Error' })
            })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}
import { Response } from "express";
import { getOrderInfoUsingOrderId, posGetAllOrders, posUpdateOrderChef, posUpdateOrderStatus } from "../utilities/pos.utility";
import { kdsPostIncomingOrder } from "../utilities/kds.utility";
import { JwtReqInterface } from "../interfaces/JwtReqInterface";
import { IOrder } from "../interfaces/NewOrderInterface";
import { preparePlusRestructureOrderDataForInventory, sendDataToInventoryToReduce } from "../utilities/processOrder.utility";
import { getMarketplaceOrderData, marketplaceUpdateOrderStatus } from "../utilities/marketplace.utility";

import amqp, { Channel, Connection } from "amqplib"

// Get All Orders from POS and Marketplace
export async function getAllOrders(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    if (user.restaurantId) {

      let result: any[] = []

      const posOrders = await posGetAllOrders(user.token);
      result = [...result, ...posOrders]

      // const marketplaceOrders = await getMarketplaceOrderData(user.restaurantId)
      // result = [...result, ...marketplaceOrders]

      res.status(200).send(result)
    }

    // res.send(orders);
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    res.status(500).send({ message: (error as Error).message });
  }
}


export async function updateOrderStatus(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { status, type } = req.body;
    if (typeof status !== 'string' && typeof type !== 'string') return res.status(400).send({ message: 'Invalid data.' });

    // If the order is a POS Order
    if (type.toLowerCase().includes("in-house")) {

      if (status === 'preparing') { // Sending data to Inventory
        const fullOrder: IOrder = await getOrderInfoUsingOrderId(orderId, user.token)
        if (fullOrder.status === 'pending') {
          const restructuredOrderDataForInventory = preparePlusRestructureOrderDataForInventory(fullOrder)
          // console.log('restructuredOrderDataForInventory', restructuredOrderDataForInventory);
          const inventoryResponse = await sendDataToInventoryToReduce(restructuredOrderDataForInventory, user.token);
        }
      }


      await posUpdateOrderStatus(user.token, orderId, status);
      return res.json({ message: 'Successfully updated' });
    }

    // If the order is a Marketplace Order
    else if (type.toLowerCase().includes("pickup") || type.toLowerCase().includes("delivery")) {
      await marketplaceUpdateOrderStatus(user.token, orderId, status)
      return res.json({ message: 'Successfully updated' })
    }


  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    res.status(500).send({ message: (error as Error).message });
  }
}


export async function updateOrderChef(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { chef } = req.body;
    if (typeof orderId !== 'string') return res.status(400).send({ message: 'Invalid data.' });

    const updatedOrder = await posUpdateOrderChef(user.token, orderId, chef);
    res.send(updatedOrder);
  } catch (error) {
    console.log('😭😭😭😭😭😭😭😭😭😭', error);
    res.status(500).send({ message: (error as Error).message });
  }
}




// 1. OLD Send New Order To KDS + Inventory To Process Order
// export async function incomingOrder(req: JwtReqInterface, res: Response) {
//   try {
//     const { user } = req;

//     if (!user) return res.status(401).send({ message: 'Unauthorized.' });

//     const order: IOrder = req.body.order;


//     let result;

//     if (order.type == "in-house") {
//       result = await kdsPostIncomingOrder(user.token, order);
//     }

//     else if (order.type === "pickup" || order.type === "delivery") {

//       result = await kdsPostIncomingOrder(user.token, order);
//       await console.log('Result from KDS');

//       const restructuredOrderDataForInventory = preparePlusRestructureOrderDataForInventory(order)
//       if (result) {
//         let inventoryResult = await sendDataToInventoryToReduce(restructuredOrderDataForInventory, user.token);
//         return res.send(inventoryResult)
//       }

//     }

//     res.status(201).send({ message: 'Successfully sent to KDS', data: result });

//   } catch (error) {
//     // console.log('😭😭😭😭😭😭😭😭😭😭' , error);
//     res.status(500).send({ message: (error as Error).message });
//   }
// }



// With RABBIT MQ
export async function incomingOrder(req: JwtReqInterface, res: Response) {
  try {
    const { user } = req;

    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const order: IOrder = req.body.order;


    let result;

    if (order.type == "in-house") {
      result = await kdsPostIncomingOrder(user.token, order);
    }

    // else if (order.type === "pickup" || order.type === "delivery") {

    //   result = await kdsPostIncomingOrder(user.token, order);
    //   await console.log('Result from KDS');

    // const restructuredOrderDataForInventory = preparePlusRestructureOrderDataForInventory(order)
    //   if (result) {
    //     let inventoryResult = await sendDataToInventoryToReduce(restructuredOrderDataForInventory, user.token);
    //     return res.send(inventoryResult)
    //   }

    // }

    res.status(201).send({ message: 'Successfully sent to KDS', data: result });

  } catch (error) {
    // console.log('😭😭😭😭😭😭😭😭😭😭' , error);
    res.status(500).send({ message: (error as Error).message });
  }
}




const queue = "marketplaceOrder"
let connection: Connection;
let channel: Channel;

// Connect and Create rabbit mq channel and connection
export async function connectAndconsumeMQDataForMarketplaceOrders() {

  try {
    const ampqServer = "amqps://ujuxbuct:HxHHm8XNtbtohKTPHi30fSdILcP9FhGQ@armadillo.rmq.cloudamqp.com/ujuxbuct"
    connection = await amqp.connect(ampqServer)
    channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false })

    await channel.consume(queue, (data) => {
      if (data) {
        console.log('data has come');
        const order = JSON.parse(data.content.toString())
        console.log('Order From Queue', order);

      }
    }, { noAck: true }) // noAck true for now. Make it false when KDS and INVENTORY not giving any more error

  } catch (err) {
    console.log(err);
  } finally {
    // if (channel) await channel.close()
  }

}

// Close rabbitmq connection and channel
export async function closeMQConnection() {
  try {
    if (connection) await connection.close()
    if (channel) await channel.close()

  } catch (error) {
    console.log(error);
  }
}


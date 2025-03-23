import { TOrderData } from "./order.interface";
import { OrderModel } from "./order.modal";

const createOrderDB = async (order: TOrderData) => {

    console.log(order);
    const result = await OrderModel.create(order);
    return result
}
const getAllOrderDB = async () => {
    const result = await OrderModel.find();
    return result
}

export const orderServices = {
    createOrderDB,
    getAllOrderDB
}
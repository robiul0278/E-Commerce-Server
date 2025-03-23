import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { orderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
    const {options} = req.body
    console.log(options);
    const result = await orderServices.createOrderDB(options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order is created Successfully!",
        data: result,
    })
})
const getAllOrder = catchAsync(async (req, res) => {

    const result = await orderServices.getAllOrderDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order is retrieved Successfully!",
        data: result,
    })
})

export const orderController = {
    createOrder,
    getAllOrder,
}
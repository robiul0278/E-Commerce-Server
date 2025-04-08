import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { orderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
    const {options} = req.body
    const result = await orderServices.createOrderDB(options);

    console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order is created Successfully!",
        data: result,
    })
})
const getAllOrder = catchAsync(async (req, res) => {

    const result = await orderServices.getAllOrderDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order is retrieved Successfully!",
        data: result,
    })
})

const changeOrderStatus = catchAsync(async (req, res) => {

    const { id } = req.params;
    const  {status}  = req.body;

    const result = await orderServices.changeOrderStatusDB(id, status);

    // send response npm 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Status Change Successfully!",
        data: result,
    })
})

export const orderController = {
    createOrder,
    getAllOrder,
    changeOrderStatus,
}
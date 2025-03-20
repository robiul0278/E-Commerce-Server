import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { FlashSaleServices } from "./flashSale.service";

const createFlashSale = catchAsync(async (req, res) => {
    const product = req.body;

    const result = await FlashSaleServices.createFlashSaleDB(product);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Flash sale time $ discount added!",
        data: result,
    })
})

const updateFlashSale = catchAsync(async (req, res) => {
    
    const data = req.body;

    const result = await FlashSaleServices.updateFlashSaleDB(data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update Flash sale time $ discount!",
        data: result,
    })
})
const getAllFlashSale = catchAsync(async (req, res) => {
    const query = req.query;

    console.log(query);
    
    const result = await FlashSaleServices.getAllFlashSaleDB(query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Flash sale data retrieved successfully!",
        data: result,
    })
})

const addProductToFlashSale = catchAsync(async (req, res) => {

    console.log(req.body);

    const { productId, userRole } = req.body;

    const result = await FlashSaleServices.addProductFlashSaleDB(productId, userRole);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product added successfully!",
        data: result,
    })
})

export const flashSaleController = {
    createFlashSale,
    updateFlashSale,
    getAllFlashSale,
    addProductToFlashSale,
}
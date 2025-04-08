import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { FlashSaleServices } from "./flashSale.service";

const createFlashSale = catchAsync(async (req, res) => {
    const product = req.body;

    console.log(product);


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

    console.log(req.query);
    
    const result = await FlashSaleServices.getAllFlashSaleDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Flash sale data retrieved successfully!",
        data: result,
    })
})
const getSingleFlashSale = catchAsync(async (req, res) => {

    const { id } = req.params;
    
    const result = await FlashSaleServices.getSingleFlashSaleDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single data retrieved successfully!",
        data: result,
    })
})

const addProductToFlashSale = catchAsync(async (req, res) => {

    const { id } = req.params;
    const {flashId} = req.body;

    const result = await FlashSaleServices.addProductFlashSaleDB(id, flashId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product added successfully!",
        data: result,
    })
})
const removeProductToFlashSale = catchAsync(async (req, res) => {

    const {id} = req.params;
    const result = await FlashSaleServices.removeProductFlashSaleDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product Remove successfully!",
        data: result,
    })
})

export const flashSaleController = {
    createFlashSale,
    updateFlashSale,
    getAllFlashSale,
    getSingleFlashSale,
    addProductToFlashSale,
    removeProductToFlashSale,
}
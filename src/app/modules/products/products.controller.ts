import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { productServices } from "./products.service";
import httpStatus from "http-status";

const createProduct: RequestHandler = catchAsync(async (req, res) => {
    const product = req.body
    const result = await productServices.createProductDB(product);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product is created Successfully!",
        data: result,
    })
})
const getAllProduct: RequestHandler = catchAsync(async (req, res) => {

    const result = await productServices.allProductsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product is retrieved Successfully!",
        data: result,
    })
})


export const productController = {
    createProduct,
    getAllProduct,
}
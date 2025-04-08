import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { productServices } from "./products.service";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req, res) => {
    const product = req.body
    const result = await productServices.createProductDB(product);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product is created Successfully!",
        data: result,
    })
})
const getAllProduct = catchAsync(async (req, res) => {

    const result = await productServices.allProductsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product is retrieved Successfully!",
        data: result,
    })
})

const getSingleProduct = catchAsync(async (req, res) => {

    const {id} = req.params;
    const result = await productServices.singleProductFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single Product is retrieved Successfully!",
        data: result,
    })
});

const deleteProduct = catchAsync(async (req, res) => {

    const {id} = req.params;
    const result = await productServices.deleteProductFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product is deleted Successfully!",
        data: result,
    })
})
const updateProduct = catchAsync(async (req, res) => {

    const {options} = req.body;
    const {id} = req.params;

    const result = await productServices.updateProductFromDB(options, id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product is update Successfully!",
        data: result,
    }) 
})


export const productController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
}
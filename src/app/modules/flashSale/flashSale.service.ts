import AppError from "../../errors/AppError";
import { TFlashData, TUpdateFlashData } from "./flashSale.interface";
import { flashSaleModel } from "./flashSale.model";
import httpStatus from "http-status";
import { ObjectId} from "mongodb";

const createFlashSaleDB = async (product: TFlashData) => {

    console.log(product);


    const existName = product.name;

    const existingFlashSale = await flashSaleModel.findOne({ name: existName });

    if (existingFlashSale) {
        throw new AppError(httpStatus.NOT_FOUND, "Flash Sale already exists, please update!");
    }

    const result = await flashSaleModel.insertOne(product);

    return result;
}

const updateFlashSaleDB = async (payload: TUpdateFlashData) => {

    const { id, discount, endTime, startTime } = payload;

    const existingFlashSale = await flashSaleModel.findOne({ _id: new ObjectId(id) })

    if (!existingFlashSale) {
        throw new AppError(httpStatus.NOT_FOUND, "Please Create Flash Sale!");
    }

    const result = await flashSaleModel.updateOne(
        { _id: new ObjectId(id) },
        { $set: { discount, endTime, startTime } }
    );

    return result
}

const getAllFlashSaleDB = async (query: Record<string, unknown>) => {
    const now = new Date();

    // Find an active flash sale that contains a matching product name
    const result = await flashSaleModel.findOne({
        startTime: { $lte: now.toISOString() },
        endTime: { $gte: now.toISOString() },
    }).populate("products");

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "No active flash sale found!");
    }
    return result;
};


const addProductFlashSaleDB = async (productId: string, userRole: string) => {

    const flashSale = await flashSaleModel.findOne({ role: userRole });

    if (!flashSale) {
        throw new AppError(httpStatus.NOT_FOUND, "Flash Sale Not Found!");
    }

    if (flashSale?.products?.some(id => id.toString() === productId)) {
        throw new AppError(httpStatus.NOT_FOUND, "Product already in flash sale!");
    }

    const result = await flashSaleModel.updateOne(
        { role: userRole },
        { $addToSet: { products: productId} }
    )

    return result;
}

const removeProductFlashSaleDB = async (id: string) => {
    const productId = new ObjectId(id);

    const result = await flashSaleModel.updateOne(
        {$pull: {products: productId}}
    )

    return result;
}




export const FlashSaleServices = {
    createFlashSaleDB,
    updateFlashSaleDB,
    getAllFlashSaleDB,
    addProductFlashSaleDB,
    removeProductFlashSaleDB,
}


import QueryBuilder from "../../../helpers/QueryBuilder";
import AppError from "../../errors/AppError";
import { productModel } from "../products/products.model";
import { TFlashData, TUpdateFlashData } from "./flashSale.interface";
import { flashSaleModel } from "./flashSale.model";
import httpStatus from "http-status";
import { ObjectId } from "mongodb";

const createFlashSaleDB = async (product: TFlashData) => {

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

    // Find an active flash sale
    const flashSale = await flashSaleModel.findOne({
        startTime: { $lte: now.toISOString() },
        endTime: { $gte: now.toISOString() },
    }).populate("products");

    if (!flashSale) {
        throw new AppError(httpStatus.NOT_FOUND, "No active flash sale found!");
    }

    // Apply query builder for filtering, sorting, and pagination
    const productQuery = new QueryBuilder(
        productModel.find({ _id: { $in: flashSale.products.map(p => p._id) } }),
        query
    )
        .search(["name"])
        .filter()
        .sort()
        .paginate()
        .fields();

    let result = await productQuery.modelQuery;
    const meta = await productQuery.countTotal();

    // Extract discount value
    const discount = flashSale.discount || 0;


    // Add originalPrice and discountPrice to each product
    result = result.map((product: any) => ({
        ...product.toObject(),
        originalPrice: product.price,
        price: product.price - (product.price * discount) / 100,
    }));


    // Product Count 
    const totalProducts = await flashSaleModel.aggregate([
        { $unwind: "$products" },
        { $count: "totalProducts" }
    ]).exec();

    const productCount = totalProducts[0]?.totalProducts || 0;


    const flashData = {
        _id: flashSale._id,
        discount,
        productCount,
        startTime: flashSale.startTime,
        endTime: flashSale.endTime,
    }

    return {
        meta,
        flashData,
        result,
    };
};

const getSingleFlashSaleDB = async (id: string) => {
    const now = new Date();

    // Find an active flash sale
    const flashSale = await flashSaleModel.findOne({
        startTime: { $lte: now.toISOString() },
        endTime: { $gte: now.toISOString() },
    }).populate("products");

    if (!flashSale) {
        throw new AppError(httpStatus.NOT_FOUND, "No active flash sale found!");
    }

    // Find the product by ID (assuming `id` is a string of a single product ID)
    const product = await productModel.findById(id);

    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
    }

    // Extract discount value
    const discount = flashSale.discount || 0;

    // Add originalPrice and discountPrice
    const result = {
        ...product.toObject(),
        originalPrice: product.price,
        price: product.price - (product.price * discount) / 100,
    };

    return result
};



const addProductFlashSaleDB = async (productId: string, flashId: string) => {

    const flashSale = await flashSaleModel.findOne({ _id: flashId });

    if (!flashSale) {
        throw new AppError(httpStatus.NOT_FOUND, "Flash Sale Not Found!");
    }

    if (flashSale?.products?.some(id => id.toString() === productId)) {
        throw new AppError(httpStatus.NOT_FOUND, "Product already in flash sale!");
    }

    const result = await flashSaleModel.updateOne(
        { _id: flashId },
        { $addToSet: { products: productId } }
    )

    return result;
}

const removeProductFlashSaleDB = async (id: string) => {
    const productId = new ObjectId(id);

    const result = await flashSaleModel.updateOne(
        { $pull: { products: productId } }
    )

    return result;
}




export const FlashSaleServices = {
    createFlashSaleDB,
    updateFlashSaleDB,
    getAllFlashSaleDB,
    getSingleFlashSaleDB,
    addProductFlashSaleDB,
    removeProductFlashSaleDB,
}


import QueryBuilder from "../../../helpers/QueryBuilder";
import AppError from "../../errors/AppError";
import { productModel } from "./products.model"
import { TProductSchema, TUpdateProductSchema } from "./products.validation";
import { ObjectId} from "mongodb";
import httpStatus from "http-status";


const createProductDB = async (product: TProductSchema) => {
    const result = await productModel.create(product);
    return result
}

const allProductsFromDB = async (query: Record<string, unknown>) => {

    // console.log(query);

    const searchableField = ['name',]
    // console.log(query);

    const productQuery = new QueryBuilder(
        productModel.find(), query)
        .search(searchableField)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await productQuery.modelQuery;
    const meta = await productQuery.countTotal()

    return {
        meta,
        result
    };

};

const deleteProductFromDB = async (id:string) => {
    const objectId = new ObjectId(id);

    const result = await productModel.deleteOne({_id: objectId})
    return result;
}


const updateProductFromDB = async (options: TUpdateProductSchema, id: string) => {

    const {name, price, brand, category, sub_category, stock, image, description} = options;
    const product = await productModel.findOne({_id: id});

    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, "Product Not Found!");
    }

    const result = await productModel.updateOne(
        {_id: id},
        {$set: {name, price, brand, category, sub_category, stock, image, description}}
    )
    return result;
}

export const productServices = {
    createProductDB,
    allProductsFromDB,
    deleteProductFromDB,
    updateProductFromDB
}
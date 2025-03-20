import QueryBuilder from "../../../helpers/QueryBuilder";
import { productModel } from "./products.model"
import { TProductSchema } from "./products.validation";
const {ObjectId} = require("mongodb");


const createProductDB = async (product: TProductSchema) => {
    const result = await productModel.create(product);
    return result
}

const allProductsFromDB = async (query: Record<string, unknown>) => {

    console.log(query);

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
    console.log(objectId);

    const result = await productModel.deleteOne({_id: objectId})
    return result;
}

export const productServices = {
    createProductDB,
    allProductsFromDB,
    deleteProductFromDB,
}
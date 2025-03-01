import { TProducts } from "./products.interface";
import { productModel } from "./products.model"
import { TProductSchema } from "./products.validation";


const createProductDB = async (product: TProductSchema) => {
    const result = await productModel.create(product);
    return result
}

const allProductsFromDB = async () => {
    const result = await productModel.find();
    return result
}

export const productServices = {
    createProductDB,
    allProductsFromDB
}
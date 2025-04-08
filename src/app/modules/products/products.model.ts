import { TProducts } from "./products.interface";
import {Schema, model } from "mongoose";


const ProductSchema = new Schema<TProducts>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        subCategory: { type: String, required: true },
        stock: { type: Number, required: true },
        image: { type: String },
        description: { type: String, required: true },
    },
    { timestamps: true }
)

export const productModel = model<TProducts>('Product', ProductSchema) 
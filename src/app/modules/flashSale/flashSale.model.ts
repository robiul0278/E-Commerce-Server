import { model, Schema } from "mongoose";
import {  TFlashData, TFlashProduct } from "./flashSale.interface";


const ProductSchema = new Schema<TFlashProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    sub_category: { type: String, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  });
  
  const FlashDataSchema = new Schema<TFlashData>({
    name: { type: String, required: true },
    role: { type: String, enum: ["admin"], required: true },
    discount: { type: Number, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], required: true },
  });
  
export const flashSaleModel = model<TFlashData>('flash-sale', FlashDataSchema) 
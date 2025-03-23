import { model, Schema } from "mongoose";
import { TOrderData } from "./order.interface";

const OrderSchema = new Schema<TOrderData>(
    {
        orderNumber: { type: String, required: true, unique: true },
        userName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        division: { type: String, required: true },
        district: { type: String, required: true },
        upazilla: { type: String, required: true },
        postalCode: { type: String, required: true },
        products: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                image: { type: String, required: true },
                quantity: { type: Number, required: true },
                totalPrice: { type: Number, required: true },
            },
        ],
        totalProduct: { type: Number, required: true },
        totalPayment: { type: Number, required: true },
        userId: { type: String, required: true },
        status: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Processing"
        },
        payment: {
            type: String,
            enum: ["Pending", "Success"],
        },
    },
    { timestamps: true }
);

export const OrderModel = model<TOrderData>("Order",OrderSchema)
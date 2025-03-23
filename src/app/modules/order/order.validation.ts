import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.number().min(0, "Price must be a positive number"),
    brand: z.string().min(1, "Brand is required"),
    category: z.string().min(1, "Category is required"),
    sub_category: z.string().min(1, "Sub-category is required"),
    stock: z.number().int().min(0, "Stock must be a non-negative integer"),
    image: z.string().url("Invalid image URL"),
    description: z.string().min(5, "Description must be at least 5 characters"),
});

export const OrderValidationSchema = z.object({
    orderNumber: z.string().min(1, "Order number is required"),
    userName: z.string().min(1, "User name is required"),
    phoneNumber: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    division: z.string().min(1, "Division is required"),
    district: z.string().min(1, "District is required"),
    upazilla: z.string().min(1, "Upazilla is required"),
    postalCode: z.string().min(4, "Postal code must be at least 4 characters"),
    products: z.array(ProductSchema).nonempty("At least one product is required"),
    totalProduct: z.number().int().min(1, "Total product count must be at least 1"),
    totalPayment: z.number().min(0, "Total payment must be a positive number"),
    userId: z.string().min(1, "User ID is required"),
    status: z.enum(["Processing", "Shipped", "Delivered", "Cancelled"]),
    date: z.date(),
});

// Type inference from Zod
export type TOrderData = z.infer<typeof OrderValidationSchema>;

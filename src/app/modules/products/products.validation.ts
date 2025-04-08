import { z } from "zod";

export const productValidationSchema = z.object({
 body: z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().min(0, "Price must be a positive number"),
    brand: z.string().min(1, "Brand is required"),
    category: z.string().min(1, "Category is required"),
    subCategory: z.string().min(1, "Sub-category is required"),
    stock: z.number().int().min(0, "Stock must be a non-negative integer"),
    image: z.string().url().min(1, "Image URL is required"),
    description: z.string().min(1, "Description is required"),
 })
});

export type TProductSchema = z.infer<typeof productValidationSchema>;



export const updateProductValidationSchema = z.object({
     name: z.string().min(1, "Name is required").optional(),
     price: z.number().min(0, "Price must be a positive number").optional(),
     brand: z.string().min(1, "Brand is required").optional(),
     category: z.string().min(1, "Category is required").optional(),
     subCategory: z.string().min(1, "Sub-category is required").optional(),
     stock: z.number().int().min(0, "Stock must be a non-negative integer").optional(),
     image: z.string().url().min(1, "Image URL is required").optional(),
     description: z.string().min(1, "Description is required").optional(),
 });
 
 export type TUpdateProductSchema = z.infer<typeof updateProductValidationSchema>;
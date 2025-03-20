import { z } from "zod";

const productSchema = z.object({
    name: z.string(),
    price: z.number(),
    brand: z.string(),
    category: z.string(),
    sub_category: z.string(),
    stock: z.number(),
    image: z.string().url(),
    description: z.string(),
  });
  
  export const flashSaleValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        role: z.string(),
        discount: z.number(),
        products: z.array(productSchema),
        startTime: z.union([z.string(), z.date()]),
        endTime: z.union([z.string(), z.date()]),
        status: z.enum(["pending", "approved", "rejected"]),
    })
  });


  export const TUpdateFlashValidationSchema = z.object({
    body: z.object({
        discount: z.number().optional(),
        startTime: z.union([z.string(), z.date()]).optional(),
        endTime: z.union([z.string(), z.date()]).optional(),
    })
  })

  export type TFlashSchema = z.infer<typeof flashSaleValidationSchema>;
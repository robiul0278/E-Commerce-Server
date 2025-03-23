import express from "express";
import { productController } from "./products.controller";
import validateRequest from "../../middleware/validateRequest";
import { productValidationSchema, updateProductValidationSchema } from "./products.validation";

const router = express.Router();

router.post('/create',validateRequest(productValidationSchema), productController.createProduct)
router.patch('/update/:id',validateRequest(updateProductValidationSchema), productController.updateProduct)

router.get('/', productController.getAllProduct)

router.delete('/:id', productController.deleteProduct)

export const productRoutes = router;
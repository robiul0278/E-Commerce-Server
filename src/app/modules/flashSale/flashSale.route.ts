import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { flashSaleValidationSchema, TUpdateFlashValidationSchema } from "./flashSale.validation";
import { flashSaleController } from "./flashSale.controller";

const router = express.Router();

router.post('/create',validateRequest(flashSaleValidationSchema), flashSaleController.createFlashSale)

router.patch('/update',validateRequest(TUpdateFlashValidationSchema), flashSaleController.updateFlashSale)

router.get('/', flashSaleController.getAllFlashSale)

router.patch('/add-product', flashSaleController.addProductToFlashSale)
router.delete('/remove/:id', flashSaleController.removeProductToFlashSale)

export const flashSaleRoutes = router;
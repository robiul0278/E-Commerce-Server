import express from "express";
import { orderController } from "./order.controller";
const router = express.Router();

router.post('/create', orderController.createOrder);
router.get('/', orderController.getAllOrder);
router.patch('/status/:id', orderController.changeOrderStatus);

export const orderRoutes = router;
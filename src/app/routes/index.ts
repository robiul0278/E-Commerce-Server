import { Router } from "express";
import { userRoutes } from "../modules/users/users.routes";
import { productRoutes } from "../modules/products/products.routes";
import { flashSaleRoutes } from "../modules/flashSale/flashSale.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/flash-sale',
    route: flashSaleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
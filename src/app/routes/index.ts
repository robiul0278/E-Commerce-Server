import { Router } from "express";
import { userRoutes } from "../modules/users/users.routes";
import { productRoutes } from "../modules/products/products.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
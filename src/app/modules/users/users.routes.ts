import express from "express";
import { userController } from "./users.controller";
import validateRequest from "../../middleware/validateRequest";
import { roleValidationSchema, userValidationSchema } from "./users.validation";
import authGard from "../../middleware/authGard";
import { USER_ROLE } from "./users.constant";

const router = express.Router();

// call controller function 
router.post('/create-user',validateRequest(userValidationSchema), userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:email', authGard(USER_ROLE.admin, USER_ROLE.user), userController.getSingleUser);

router.patch('/role/:userId', validateRequest(roleValidationSchema), userController.changeRole);

router.post('/jsonwebtoken', userController.jsonWebToken);

export const userRoutes = router;
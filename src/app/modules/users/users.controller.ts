import { RequestHandler } from "express";
import { userServices } from "./users.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const createUser: RequestHandler = catchAsync(async (req, res) => {


    const result = await userServices.createUserDB(req.body);
    // const { password, ...other } = result.toObject()

    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is created Successfully!",
        data: result,
    })
})

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {

    const result = await userServices.getAllUsersDB();
    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User are retrieved Successfully!",
        data: result,
    })

})

const getSingleUser: RequestHandler = catchAsync(async (req, res) => {

    const { email } = req.params;

    const result = await userServices.getSingleUserDB(email);
    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User are retrieved Successfully!",
        data: result,
    })
})

const changeRole: RequestHandler = catchAsync(async (req, res) => {

    const { userId } = req.params;
    const { role } = req.body;

    const result = await userServices.changeRoleDB(userId, role);
    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Role Change Successfully!",
        data: result,
    })
})

const jsonWebToken: RequestHandler = catchAsync(async (req, res) => {
    const { email } = req.body;

    const token = await userServices.jsonWebToken(email);

    res.send({ token });
});


export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    changeRole,
    jsonWebToken,
}
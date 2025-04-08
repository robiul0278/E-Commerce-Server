import { userServices } from "./users.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";

const createUser = catchAsync(async (req, res) => {


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

const getAllUsers = catchAsync(async (req, res) => {

    console.log(req.query);

    const result = await userServices.getAllUsersDB(req.query);
    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User are retrieved Successfully!",
        data: result,
    })

})

const getSingleUser = catchAsync(async (req, res) => {

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

const changeRole = catchAsync(async (req, res) => {

    const { id } = req.params;
    const  {role}  = req.body;

    const result = await userServices.changeRoleDB(id, role);

    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Role Change Successfully!",
        data: result,
    })
})

const deleteUser = catchAsync(async (req, res) => {

    const { id } = req.params;
    const result = await userServices.deleteUserFromDB(id);

    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Delete User Successfully!",
        data: result,
    })
})

const jsonWebToken = catchAsync(async (req, res) => {
    const { email } = req.body;

    const result = await userServices.jsonWebToken(email);
    const { accessToken: token ,refreshToken} = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true,
    })

    res.send({ token });
});

const refreshToken = catchAsync(async (req, res) => {

    const {refreshToken} = req.cookies
    const result = await userServices.refreshTokenDB(refreshToken);

    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token is created Successfully!",
        data: result,
    })
})


export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    changeRole,
    deleteUser,
    jsonWebToken,
    refreshToken,
}
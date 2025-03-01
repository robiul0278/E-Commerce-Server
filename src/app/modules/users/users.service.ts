import config from "../../../config";
import { IUser } from "./users.interface";
import { userModel } from "./users.model";
import jwt from "jsonwebtoken";


const createUserDB = async (user: IUser) => {
    const result = await userModel.create(user);
    return result;
}

const getAllUsersDB = async () => {
    const result = await userModel.find()
    return result;
}

const getSingleUserDB = async (email: string) => {
    const result = await userModel.findOne({ email })
    return result;
}

const changeRoleDB = async (userId: string, role: string) => {

    const result = await userModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { role } },
        { new: true }
    )
    return result;
}

const jsonWebToken = async (email: string) => {
    const user = await userModel.findOne({ email })

    if (!user) {
        throw new Error('Invalid credentials')
    }
    // create access token
    const jwtPayload = {
        _id: user?._id.toString(),
        email: user?.email,
        role: user?.role,
    }

    const token = jwt.sign(
        jwtPayload,
        config.jwt_secret_token as string,
        { expiresIn: Number(config.token_expiration) },
    );
    return token;
}


export const userServices = {
    createUserDB,
    getAllUsersDB,
    getSingleUserDB,
    changeRoleDB,
    jsonWebToken,
}
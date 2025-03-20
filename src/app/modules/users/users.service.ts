import config from "../../../config";
import AppError from "../../errors/AppError";
import { IUser } from "./users.interface";
import { userModel } from "./users.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";

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

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_secret_token as string,
        { expiresIn: Number(config.jwt_secret_expiration) },
    );
    const refreshToken = jwt.sign(
        jwtPayload,
        config.jwt_refresh_token as string,
        { expiresIn: Number(config.jwt_refresh_expiration) },
    );

    return {accessToken, refreshToken};
}

const refreshTokenDB = async (token: string) => {
    //! checking if the token is missing
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }
  
      //! checking if the given token is valid
      const decoded = jwt.verify(token, config.jwt_refresh_token as string) as JwtPayload;
  
      const {_id } = decoded;
  
      //! checking if the user is exist
      const user = await userModel.findById(_id);
  
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
      }

          // create access token
    const jwtPayload = {
        _id: user?._id.toString(),
        email: user?.email,
        role: user?.role,
    }

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_secret_token as string,
        { expiresIn: Number(config.jwt_secret_expiration) },
    );

    return {accessToken};
}


export const userServices = {
    createUserDB,
    getAllUsersDB,
    getSingleUserDB,
    changeRoleDB,
    jsonWebToken,
    refreshTokenDB,
}
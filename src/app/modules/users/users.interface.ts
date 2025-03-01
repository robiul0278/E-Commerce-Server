import { USER_ROLE } from "./users.constant";

export type IUser = {
    name: string;
    email: string;
    photoURL?: string;
    role?: "user" | "admin";
    createdAt?: Date;
}



export type TUserRole = keyof typeof USER_ROLE;
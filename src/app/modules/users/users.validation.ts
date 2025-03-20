import { z } from 'zod';

export const userValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        photoURL: z.string().url().optional(),
        role: z.enum(["user", "admin"]).default("user"),
        createdAt: z.date().optional()
    })
});


// Define the validation schema for the role
export const roleValidationSchema = z.object({
    body: z.object({
        role: z.enum(["user", "admin"]).default("user")
    })
});
export const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh token is required!'
        })
    })
});


